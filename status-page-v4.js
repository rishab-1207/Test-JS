(function() {
  'use strict';

  // SVG Icons as base64
  const ICONS = {
    operational: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#348700"/><path d="M8 12l3 3 5-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    degraded: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#c95100"/><path d="M12 8v4m0 4h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    critical: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#d63a2e"/><path d="M15 9l-6 6m0-6l6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
    maintenance: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#6554c0"/><path d="M12 8v4l2 2" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    info: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 16v-4m0-4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`
  };

  // Configuration - easy to update
  const CONFIG = {
    geography: {
      Americas: {
        displayName: 'Americas',
        urlCode: 'AMER',
        regions: [
          { code: 'US1', name: 'North America 1 (US1)', urlCode: 'US1' },
          { code: 'US2', name: 'North America 2 (US2)', urlCode: 'US2' },
          { code: 'CA', name: 'Canada (CA)', urlCode: 'CA' },
          { code: 'FED', name: 'Federal (FED)', urlCode: 'FED' }
        ]
      },
      EU: {
        displayName: 'Europe',
        urlCode: 'EUR',
        regions: [
          { code: 'EU', name: 'Europe 1 (EU)', urlCode: 'EU' },
          { code: 'DE', name: 'Europe 2 (DE)', urlCode: 'DE' }
        ]
      },
      APAC: {
        displayName: 'Asia Pacific',
        urlCode: 'APAC',
        regions: [
          { code: 'AU', name: 'Australia (AU)', urlCode: 'AU' },
          { code: 'JP', name: 'Japan (JP)', urlCode: 'JP' },
          { code: 'IN', name: 'India (IN)', urlCode: 'IN' },
          { code: 'KR', name: 'Korea (KR)', urlCode: 'KR' }
        ]
      }
    },
    // Configurable tooltip text for each region
    regionInfo: {
      'US1': 'service.sumologic.com',
      'US2': 'service.us2.sumologic.com',
      'CA': 'service.ca.sumologic.com',
      'FED': 'service.fed.sumologic.com',
      'EU': 'service.eu.sumologic.com',
      'DE': 'service.de.sumologic.com',
      'AU': 'service.au.sumologic.com',
      'JP': 'service.jp.sumologic.com',
      'IN': 'service.in.sumologic.com',
      'KR': 'service.kr.sumologic.com',
      'CH': 'service.ch.sumologic.com'
    },
    branding: {
      companyName: 'Sumo Logic',
      mainAppUrl: 'https://service.sumologic.com',
      logoPlaceholder: 'SL'
    },
    api: {
      baseUrl: 'https://sumostatuspage.statuspage.io/api/v2',
      endpoints: {
        components: '/components.json',
        summary: '/summary.json',
        incidents: '/incidents.json',
        unresolvedIncidents: '/incidents/unresolved.json'
      }
    }
  };

  // State
  let allComponents = {};
  let continentMapping = {};
  let allIncidents = [];

  // URL code mapping helpers
  function getContinentUrlCode(continentKey) {
    return CONFIG.geography[continentKey]?.urlCode || continentKey;
  }

  function getContinentKeyFromUrlCode(urlCode) {
    for (const key in CONFIG.geography) {
      if (CONFIG.geography[key].urlCode === urlCode) {
        return key;
      }
    }
    return urlCode;
  }

  function getRegionUrlCode(continentKey, regionName) {
    const continent = CONFIG.geography[continentKey];
    if (!continent) return regionName;
    const region = continent.regions.find(r => r.name === regionName || regionName.includes(r.code));
    return region?.urlCode || regionName;
  }

  function getRegionNameFromUrlCode(continentKey, urlCode) {
    const continent = CONFIG.geography[continentKey];
    if (!continent) return urlCode;
    const region = continent.regions.find(r => r.urlCode === urlCode);
    return region?.name || urlCode;
  }

  function getRegionCodeFromName(regionName) {
    // Extract region code from name like "North America 1 (US1)" -> "US1"
    const match = regionName.match(/\(([^)]+)\)/);
    return match ? match[1] : regionName;
  }

  function getRegionInfo(regionName) {
    const code = getRegionCodeFromName(regionName);
    return CONFIG.regionInfo[code] || null;
  }

  // URL helpers
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const continentUrlCode = params.get('continent');
    const regionUrlCode = params.get('region');

    // Convert URL codes back to internal keys/names
    const continentKey = continentUrlCode ? getContinentKeyFromUrlCode(continentUrlCode) : null;
    const regionName = (continentKey && regionUrlCode) ? getRegionNameFromUrlCode(continentKey, regionUrlCode) : null;

    return {
      continent: continentKey,
      region: regionName
    };
  }

  function setUrlParams(continent, region) {
    const url = new URL(window.location.href);

    // Convert internal keys/names to short URL codes
    const continentUrlCode = getContinentUrlCode(continent);
    url.searchParams.set('continent', continentUrlCode);

    if (region) {
      const regionUrlCode = getRegionUrlCode(continent, region);
      url.searchParams.set('region', regionUrlCode);
    }

    window.history.replaceState({}, '', url);
  }

  // API Status Mapping - converts API status values to UI status values
  function mapApiStatusToUiStatus(apiStatus) {
    const statusMap = {
      'operational': 'operational',
      'degraded_performance': 'degraded',
      'partial_outage': 'degraded',
      'major_outage': 'critical',
      'under_maintenance': 'maintenance'
    };
    return statusMap[apiStatus] || 'operational';
  }

  // API Fetching Functions
  async function fetchFromApi(endpoint) {
    const url = CONFIG.api.baseUrl + endpoint;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return response.json();
  }

  // Fetch components from API and transform to internal structure
  async function fetchComponents() {
    const data = await fetchFromApi(CONFIG.api.endpoints.components);
    const groups = {};

    // Create a map of component ID to component for quick lookup
    const componentMap = {};
    data.components.forEach(comp => {
      componentMap[comp.id] = comp;
    });

    // Find all group components (regions) and their children
    data.components.forEach(comp => {
      if (comp.group === true) {
        // This is a region/group
        const groupName = comp.name;
        groups[groupName] = [];

        // Find all child components that belong to this group
        data.components.forEach(childComp => {
          if (childComp.group_id === comp.id) {
            groups[groupName].push({
              name: childComp.name,
              status: mapApiStatusToUiStatus(childComp.status)
            });
          }
        });
      }
    });

    return groups;
  }

  // Fetch incidents from API and transform to internal structure
  async function fetchIncidents() {
    const [unresolvedData, allIncidentsData] = await Promise.all([
      fetchFromApi(CONFIG.api.endpoints.unresolvedIncidents),
      fetchFromApi(CONFIG.api.endpoints.incidents)
    ]);

    const incidents = [];

    // Process unresolved (active) incidents
    unresolvedData.incidents.forEach(incident => {
      incidents.push(transformIncident(incident, true));
    });

    // Process all incidents (for past/resolved ones)
    // Filter out unresolved incidents to avoid duplicates
    const unresolvedIds = new Set(unresolvedData.incidents.map(i => i.id));
    allIncidentsData.incidents.forEach(incident => {
      if (!unresolvedIds.has(incident.id)) {
        incidents.push(transformIncident(incident, false));
      }
    });

    return incidents;
  }

  // Transform API incident to internal structure
  function transformIncident(apiIncident, isUnresolved) {
    // Extract regions from affected components
    // Component names are in format "Region Name - Service Name" or just region name
    const regions = [];
    if (apiIncident.components && apiIncident.components.length > 0) {
      apiIncident.components.forEach(comp => {
        // Try to find which region this component belongs to by checking group_id
        // The component might have a group_id pointing to a region
        // For now, we'll extract region from the affected_components in incident_updates
        // which have format "North America 1 (US1) - Data Indexing"
      });
    }

    // Get regions from incident_updates affected_components (more reliable)
    if (apiIncident.incident_updates && apiIncident.incident_updates.length > 0) {
      apiIncident.incident_updates.forEach(update => {
        if (update.affected_components) {
          update.affected_components.forEach(affComp => {
            // Extract region from "Region Name - Service Name" format
            const regionMatch = affComp.name.match(/^(.+?)\s*-\s*.+$/);
            if (regionMatch) {
              const regionName = regionMatch[1].trim();
              if (!regions.includes(regionName)) {
                regions.push(regionName);
              }
            }
          });
        }
      });
    }

    // Fallback: check full text for region codes
    if (regions.length === 0) {
      const fullText = apiIncident.name + ' ' + (apiIncident.incident_updates?.[0]?.body || '');
      Object.keys(CONFIG.geography).forEach(continent => {
        CONFIG.geography[continent].regions.forEach(region => {
          if (fullText.includes(region.code) || fullText.includes(region.name)) {
            if (!regions.includes(region.name)) {
              regions.push(region.name);
            }
          }
        });
      });
    }

    // Get the latest update
    const latestUpdate = apiIncident.incident_updates?.[0];
    const updateMessage = latestUpdate?.body || '';

    // Format date
    const dateObj = new Date(latestUpdate?.display_at || apiIncident.created_at);
    const date = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    }).replace(',', ' -');

    return {
      title: apiIncident.name,
      date: date,
      status: apiIncident.status,
      impact: apiIncident.impact,
      regions: regions,
      link: `/incidents/${apiIncident.id}`,
      updateMessage: updateMessage,
      isUnresolved: isUnresolved
    };
  }

  // Show error message when API fails
  function showApiError(error) {
    console.error('[Sumo Status] API Error:', error);
    const target = document.querySelector('.components-section') || document.querySelector('.container');
    if (!target) return;

    const errorWrapper = document.createElement('div');
    errorWrapper.className = 'sumo-status-page';
    errorWrapper.innerHTML = `
      <div class="sumo-api-error" style="padding: 40px 20px; text-align: center; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; margin: 20px;">
        <div style="color: #dc2626; font-size: 18px; font-weight: 600; margin-bottom: 8px;">Unable to load status data</div>
        <div style="color: #7f1d1d; font-size: 14px;">Please try refreshing the page. If the problem persists, check back later.</div>
      </div>
    `;
    target.parentNode.insertBefore(errorWrapper, target);
  }

  // Initialize
  function init() {
    // Check if on subscription component-selection page or subscription edit page
    const isComponentSelectionPage = window.location.href.includes('/subscriptions/component-selection');
    const isSubscriptionEditPage = /\/subscriptions\/[^/]+\/edit/.test(window.location.href);

    if (isComponentSelectionPage || isSubscriptionEditPage) {
      console.log('[Sumo Status] Subscription page detected:', isComponentSelectionPage ? 'component-selection' : 'edit');
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSubscriptionPage);
      } else {
        initSubscriptionPage();
      }
      return;
    }

    // Skip other subscription pages
    if (window.location.href.includes('/subscriptions')) {
      console.log('[Sumo Status] Skipping - subscription page');
      return;
    }

    console.log('[Sumo Status] Initializing...');
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }


  function hoistIncidentSubscriptionModals() {
    const modals = document.querySelectorAll('[data-js-hook="incident-subscription-modal"]');
    
    modals.forEach(modal => {
      // Move modal to <body> so it’s not affected by hidden ancestors
      if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
      }
    });
  }

  async function setup() {
    try {
      // Fetch data from API
      console.log('[Sumo Status] Fetching data from API...');
      const [componentsData, incidentsData] = await Promise.all([
        fetchComponents(),
        fetchIncidents()
      ]);

      allComponents = componentsData;
      allIncidents = incidentsData;

      if (Object.keys(allComponents).length === 0) {
        console.warn('[Sumo Status] No components found from API');
      }

      continentMapping = mapToContinents(Object.keys(allComponents));
      hoistIncidentSubscriptionModals();
      renderUI();
      console.log('[Sumo Status] Ready');
      console.log('[Sumo Status] Found components:', Object.keys(allComponents).length);
      console.log('[Sumo Status] Found incidents:', allIncidents.length);
    } catch (error) {
      showApiError(error);
    }
  }

  // DOM-based discovery functions removed - now using API-based fetching
  // See fetchComponents() and fetchIncidents() above

  function mapToContinents(groupNames) {
    const mapping = {};
    Object.keys(CONFIG.geography).forEach(c => mapping[c] = []);

    groupNames.forEach(name => {
      for (const continent in CONFIG.geography) {
        const regions = CONFIG.geography[continent].regions;
        if (regions.some(r => name.includes(r.code) || name.includes(r.name) || r.name.includes(name))) {
          mapping[continent].push(name);
          break;
        }
      }
    });
    return mapping;
  }

  function getGroupStatus(groupName) {
    const comps = allComponents[groupName] || [];
    if (comps.some(c => c.status === 'critical')) return 'critical';
    if (comps.some(c => c.status === 'degraded')) return 'degraded';
    if (comps.some(c => c.status === 'maintenance')) return 'maintenance';
    return 'operational';
  }

  function getContinentStatus(continent) {
    const regions = continentMapping[continent] || [];
    const statuses = regions.map(r => getGroupStatus(r));
    if (statuses.includes('critical')) return 'critical';
    if (statuses.includes('degraded')) return 'degraded';
    if (statuses.includes('maintenance')) return 'maintenance';
    return 'operational';
  }

  // Check if on history page
  function isHistoryPage() {
    return window.location.pathname.includes('/history');
  }

  // Check if on incident detail page
  function isIncidentPage() {
    return window.location.pathname.includes('/incidents/');
  }

  // Render UI
  function renderUI() {
    const isHistory = isHistoryPage();
    const isIncident = isIncidentPage();
    const target = document.querySelector('.components-section') || document.querySelector('.container');
    if (!target) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'sumo-status-page';

    if (isHistory || isIncident) {
      // On history/incident page: only render nav (no status banner, tabs, services, or incidents)
      wrapper.innerHTML = renderNav();
    } else {
      // On main page: render full UI with custom status banner
      // Active incidents appear right after the status banner (before tabs)
      wrapper.innerHTML = renderNav() + renderStatusBanner() + renderActiveIncidents() + renderScheduledMaintenance() + renderContinentTabs() + renderRegionTabs() + renderServices() + renderPastIncidents();
    }

    target.parentNode.insertBefore(wrapper, target);

    // Move the original StatusPage subscribe dropdown into our nav
    setupSubscribeDropdown();

    // Insert About section and Footer after the page-footer
    const pageFooter = document.querySelector('.page-footer');
    if (pageFooter) {
      const aboutFooterWrapper = document.createElement('div');
      aboutFooterWrapper.className = 'sumo-status-page';
      aboutFooterWrapper.innerHTML = renderAbout() + renderFooter();
      pageFooter.parentNode.insertBefore(aboutFooterWrapper, pageFooter.nextSibling);
    }

    if (!isHistory && !isIncident) {
      attachEvents();

      // Populate active incidents immediately (they show for all regions)
      populateActiveIncidents();

      const params = getUrlParams();
      const availableContinents = Object.keys(continentMapping).filter(c => continentMapping[c].length > 0);
      const defaultContinent = (params.continent && continentMapping[params.continent]?.length > 0) ? params.continent : availableContinents[0];
      selectContinent(defaultContinent, params.region);
    }

    // Force top spacing on history/incident page via JS (CSS selectors may not match StatusPage DOM)
    if (isHistory || isIncident) {
      fixHistoryPageSpacing();
    }
  }

  // Populate active incidents (shown globally, not filtered by region)
  // Note: Scheduled maintenance is filtered by region in filterScheduledMaintenance()
  function populateActiveIncidents() {
    const unresolvedContainer = document.getElementById('sumo-unresolved-incidents');
    const unresolvedList = document.getElementById('sumo-unresolved-list');

    // Filter incidents: only non-maintenance active incidents (maintenance is region-filtered)
    const unresolvedIncidents = allIncidents.filter(i => i.isUnresolved && i.impact !== 'maintenance');

    // Helper function to render incident cards
    function renderIncidentCard(incident) {
      const statusLabel = formatIncidentStatus(incident.status);
      const updateText = incident.updateMessage
        ? `<strong>${statusLabel}</strong> - ${incident.updateMessage}`
        : `<strong>${statusLabel}</strong>`;

      const impactClass = (incident.impact === 'critical' || incident.impact === 'major')
        ? ` impact-${incident.impact}`
        : '';

      const incidentCode = incident.link ? incident.link.split('/').pop() : '';

      return `
        <div class="sumo-incident-card${impactClass}">
          <div class="sumo-incident-card__header">
            <div class="sumo-incident-card__title">
              ${incident.link ? `<a href="${incident.link}">${incident.title}</a>` : incident.title}
            </div>
            <a data-toggle="modal" role="button" class="subscribe sumo-incident-card__subscribe" id="btn-subscribe-modal-${incidentCode}" href="#subscribe-modal-${incidentCode}">Subscribe</a>
          </div>
          <div class="sumo-incident-card__body">
            <div class="sumo-incident-card__update">${updateText}</div>
            <div class="sumo-incident-card__date">${incident.date}</div>
          </div>
        </div>
      `;
    }

    // Populate active incidents (excluding maintenance)
    if (unresolvedContainer && unresolvedList) {
      if (unresolvedIncidents.length > 0) {
        unresolvedContainer.style.display = 'block';
        unresolvedList.innerHTML = unresolvedIncidents.map(renderIncidentCard).join('');
      } else {
        unresolvedContainer.style.display = 'none';
      }
    }
  }

  function renderNav() {
    return `
      <nav class="sumo-nav">
        <div class="sumo-nav__container">
          <a href="/" class="sumo-nav__logo">
            <img src="https://www.sumologic.com/wp-content/uploads/Sumo-Logic-Logo-1.svg" alt="Sumo Logic" class="sumo-nav__logo-img">
          </a>
          <div class="sumo-nav__actions">
            <a href="${CONFIG.branding.mainAppUrl}" class="sumo-nav__link" target="_blank">Go to App</a>
            <div id="sumo-nav-subscribe-placeholder"></div>
          </div>
        </div>
      </nav>`;
  }

  // Move the original StatusPage subscribe dropdown into our nav
  function setupSubscribeDropdown() {
    const placeholder = document.getElementById('sumo-nav-subscribe-placeholder');
    if (!placeholder) return;

    // Find the existing StatusPage dropdown container (with the full dropdown inside)
    const existingDropdown = document.querySelector('.updates-dropdown-container[data-js-hook="updates-dropdown-container"]');
    if (existingDropdown) {
      // Move the entire dropdown container into our nav
      placeholder.parentNode.replaceChild(existingDropdown, placeholder);

      // Style the toggle button to match our design
      const toggleBtn = existingDropdown.querySelector('.show-updates-dropdown');
      if (toggleBtn) {
        toggleBtn.classList.add('sumo-nav__subscribe-btn');
      }
    } else {
      // Fallback: create a simple subscribe link if dropdown not found
      const fallbackLink = document.createElement('a');
      fallbackLink.href = '/subscriptions/new';
      fallbackLink.className = 'sumo-nav__subscribe-btn';
      fallbackLink.textContent = 'Subscribe to Updates';
      placeholder.parentNode.replaceChild(fallbackLink, placeholder);
    }
  }

  function renderStatusBanner() {
    // Get status from API data (via allComponents)
    const overallStatus = getOverallStatus();

    // Only display banner when all systems are operational
    if (overallStatus !== 'operational') {
      return '';
    }

    const statusText = 'All Systems Operational';

    return `
      <div class="sumo-status-banner ${overallStatus}">
        <div class="sumo-status-banner__icon">${ICONS[overallStatus]}</div>
        <span class="sumo-status-banner__text">${statusText}</span>
      </div>`;
  }

  function getOverallStatus() {
    const allStatuses = [];
    Object.values(allComponents).forEach(components => {
      components.forEach(c => allStatuses.push(c.status));
    });

    if (allStatuses.includes('critical')) return 'critical';
    if (allStatuses.includes('degraded')) return 'degraded';
    if (allStatuses.includes('maintenance')) return 'maintenance';
    return 'operational';
  }

  function renderContinentTabs() {
    let tabs = '';
    Object.keys(continentMapping).forEach(continent => {
      if (continentMapping[continent].length > 0) {
        const display = CONFIG.geography[continent]?.displayName || continent;
        const status = getContinentStatus(continent);
        tabs += `<button class="sumo-continent-tab status-${status}" data-continent="${continent}">${display}</button>`;
      }
    });
    return `<div class="sumo-continent-tabs"><div class="sumo-continent-tabs__nav">${tabs}</div></div>`;
  }

  function renderRegionTabs() {
    return `<div class="sumo-region-tabs"><div class="sumo-region-tabs__nav" id="sumo-region-nav"></div></div>`;
  }

  function renderServices() {
    return `<div class="sumo-services"><div class="sumo-services__grid" id="sumo-services-grid"></div></div>`;
  }

  function renderActiveIncidents() {
    // Check if there are any unresolved incidents (excluding maintenance) to show
    const hasUnresolved = allIncidents.some(i => i.isUnresolved && i.impact !== 'maintenance');
    return `
      <div class="sumo-unresolved-incidents" id="sumo-unresolved-incidents" style="display:${hasUnresolved ? 'block' : 'none'};">
        <div class="sumo-incidents__header">
          <h2 class="sumo-incidents__title sumo-incidents__title--active">Active Incidents</h2>
        </div>
        <div id="sumo-unresolved-list"></div>
      </div>`;
  }

  function renderScheduledMaintenance() {
    // Check if there are any scheduled maintenance items to show
    const hasMaintenance = allIncidents.some(i => i.isUnresolved && i.impact === 'maintenance');
    return `
      <div class="sumo-scheduled-maintenance" id="sumo-scheduled-maintenance" style="display:${hasMaintenance ? 'block' : 'none'};">
        <div class="sumo-incidents__header">
          <h2 class="sumo-incidents__title">Scheduled Maintenance</h2>
        </div>
        <div id="sumo-maintenance-list"></div>
      </div>`;
  }

  function renderPastIncidents() {
    return `
      <div class="sumo-incidents">
        <div class="sumo-incidents__header">
          <h2 class="sumo-incidents__title">Past Incidents</h2>
          <a href="/history" class="sumo-incidents__link">View Incident History →</a>
        </div>
        <div class="sumo-incidents__list" id="sumo-incidents-list">
          <p style="padding:20px;text-align:center;color:#6b7280;">No incidents reported this quarter.</p>
        </div>
      </div>`;
  }

  function renderAbout() {
    return `
      <div class="sumo-about">
        <h2 class="sumo-about__title">About This Site</h2>
        <p class="sumo-about__text">This page provides real-time status information for ${CONFIG.branding.companyName} services. Subscribe to receive updates when incidents occur.</p>
      </div>`;
  }

  function renderFooter() {
    return `
      <footer class="sumo-footer">
        <div class="sumo-footer__container">
          <span class="sumo-footer__copyright">&copy; ${new Date().getFullYear()} ${CONFIG.branding.companyName}</span>
          <div class="sumo-footer__links">
            <a href="${CONFIG.branding.mainAppUrl}" class="sumo-footer__link">Main Site</a>
          </div>
        </div>
      </footer>`;
  }

  function attachEvents() {
    document.querySelectorAll('.sumo-continent-tab').forEach(btn => {
      btn.addEventListener('click', function() {
        selectContinent(this.dataset.continent);
      });
    });
  }

  function selectContinent(continent, initialRegion) {
    document.querySelectorAll('.sumo-continent-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === continent);
    });

    const regionNav = document.getElementById('sumo-region-nav');
    const regionContainer = document.querySelector('.sumo-region-tabs');
    const regions = continentMapping[continent] || [];

    regionNav.innerHTML = regions.map(name => {
      const status = getGroupStatus(name);
      const infoText = getRegionInfo(name);
      const infoIcon = infoText ? `<span class="sumo-region-tab__info">${ICONS.info}<span class="sumo-region-tab__tooltip">${infoText}</span></span>` : '';
      return `<button class="sumo-region-tab status-${status}" data-region="${name}">${name}${infoIcon}</button>`;
    }).join('');

    regionContainer.classList.toggle('visible', regions.length > 0);

    regionNav.querySelectorAll('.sumo-region-tab').forEach(btn => {
      btn.addEventListener('click', function() {
        selectRegion(this.dataset.region);
        setUrlParams(continent, this.dataset.region);
      });
    });

    if (regions.length > 0) {
      const defaultRegion = (initialRegion && regions.includes(initialRegion)) ? initialRegion : regions[0];
      selectRegion(defaultRegion);
      setUrlParams(continent, defaultRegion);
    }
  }

  function selectRegion(regionName) {
    document.querySelectorAll('.sumo-region-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.region === regionName);
    });

    const grid = document.getElementById('sumo-services-grid');
    const components = allComponents[regionName] || [];

    grid.innerHTML = components.map(c => `
      <div class="sumo-card">
        <div class="sumo-card__info">
          <span class="sumo-card__name">${c.name}</span>
          <span class="sumo-card__status-text ${c.status}">${formatStatus(c.status)}</span>
        </div>
        <div class="sumo-card__icon">${ICONS[c.status] || ICONS.operational}</div>
      </div>
    `).join('') || '<p style="padding:20px;text-align:center;color:#6b7280;">No components found.</p>';

    // Filter and display incidents for this region
    filterIncidents(regionName);
  }

  function filterIncidents(regionName) {
    const incidentsList = document.getElementById('sumo-incidents-list');
    if (!incidentsList) return;

    // Extract region code from name like "North America 1 (US1)" -> "US1"
    const regionCodeMatch = regionName.match(/\(([^)]+)\)/);
    const regionCode = regionCodeMatch ? regionCodeMatch[1] : regionName;

    // Helper to check if incident matches region
    const matchesRegion = (incident) => {
      // If no specific regions detected, show for ALL regions (global incident)
      if (incident.regions.length === 0) {
        return true;
      }
      return incident.regions.some(r => r.includes(regionCode) || r === regionName);
    };

    // Filter scheduled maintenance for this region
    filterScheduledMaintenance(regionCode, regionName, matchesRegion);

    // Filter past incidents only (active incidents are shown globally above)
    const pastIncidents = allIncidents.filter(i => !i.isUnresolved && matchesRegion(i));

    // Render past incidents
    if (pastIncidents.length === 0) {
      incidentsList.innerHTML = '<p style="padding:20px;text-align:center;color:#6b7280;">No incidents reported for this region.</p>';
      return;
    }

    incidentsList.innerHTML = pastIncidents.map(incident => `
      <div class="sumo-incident">
        <div class="sumo-incident__date">${incident.date}</div>
        <div class="sumo-incident__title">${incident.link ? `<a href="${incident.link}">${incident.title}</a>` : incident.title}</div>
        <span class="sumo-incident__status ${incident.status}">${formatIncidentStatus(incident.status)}</span>
      </div>
    `).join('');
  }

  // Filter scheduled maintenance by region
  function filterScheduledMaintenance(regionCode, regionName, matchesRegion) {
    const maintenanceContainer = document.getElementById('sumo-scheduled-maintenance');
    const maintenanceList = document.getElementById('sumo-maintenance-list');
    if (!maintenanceContainer || !maintenanceList) return;

    const maintenanceIncidents = allIncidents.filter(i => i.isUnresolved && i.impact === 'maintenance' && matchesRegion(i));

    if (maintenanceIncidents.length > 0) {
      maintenanceContainer.style.display = 'block';
      maintenanceList.innerHTML = maintenanceIncidents.map(incident => {
        const statusLabel = formatIncidentStatus(incident.status);
        const updateText = incident.updateMessage
          ? `<strong>${statusLabel}</strong> - ${incident.updateMessage}`
          : `<strong>${statusLabel}</strong>`;
        const incidentCode = incident.link ? incident.link.split('/').pop() : '';

        return `
          <div class="sumo-incident-card impact-maintenance">
            <div class="sumo-incident-card__header">
              <div class="sumo-incident-card__title">
                ${incident.link ? `<a href="${incident.link}">${incident.title}</a>` : incident.title}
              </div>
              <a data-toggle="modal" role="button" class="subscribe sumo-incident-card__subscribe" id="btn-subscribe-modal-${incidentCode}" href="#subscribe-modal-${incidentCode}">Subscribe</a>
            </div>
            <div class="sumo-incident-card__body">
              <div class="sumo-incident-card__update">${updateText}</div>
              <div class="sumo-incident-card__date">${incident.date}</div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      maintenanceContainer.style.display = 'none';
    }
  }

  function formatIncidentStatus(status) {
    const map = {
      investigating: 'Investigating',
      identified: 'Identified',
      monitoring: 'Monitoring',
      resolved: 'Resolved'
    };
    return map[status] || status.charAt(0).toUpperCase() + status.slice(1);
  }

  function formatStatus(s) {
    const map = { operational: 'Operational', degraded: 'Degraded Performance', critical: 'Major Outage', maintenance: 'Under Maintenance' };
    return map[s] || 'Unknown';
  }

  function fixHistoryPageSpacing() {
    // Brute-force: find every direct child of body and the first content containers,
    // and apply margin-top to push them below the fixed nav
    const navHeight = 64;
    const extraSpace = -20;
    const totalOffset = navHeight + extraSpace;

    // Apply negative margin to sumo-nav
    const sumoNav = document.querySelector('.sumo-nav');
    if (sumoNav) {
      sumoNav.style.setProperty('margin-top', '0px', 'important');
    }

    // Style h4 "Incident History" heading
    const h4 = document.querySelector('h4');
    
    if (h4.textContent.trim() === 'Incident History') {
        h4.style.setProperty('margin-top', '24px', 'important');
        h4.style.setProperty('margin-bottom', '16px', 'important');
      }

    // Force font family and sizing on all history page elements via JS
    fixHistoryPageFonts();
  }

  function fixHistoryPageFonts() {
    const fontFamily = "'Lab Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

    // Step 1: Inject @font-face into <head> first child
    const fontFace = document.createElement('style');
    fontFace.textContent = `
      @font-face { font-family: 'Lab Grotesque'; src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Regular.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Lab Grotesque'; src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Medium.woff2') format('woff2'); font-weight: 500; font-style: normal; font-display: swap; }
      @font-face { font-family: 'Lab Grotesque'; src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Bold.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
    `;
    document.head.insertBefore(fontFace, document.head.firstChild);

    // Step 2: Inject a <style> at the END of <body> (loads last = highest cascade priority)
    // Use html body prefix + repeated class for extreme specificity
    const overrideStyle = document.createElement('style');
    overrideStyle.textContent = `
      html body.status-history,
      html body.status-history *:not(.sumo-status-page):not(.sumo-status-page *) {
        font-family: ${fontFamily} !important;
        -webkit-font-smoothing: antialiased !important;
      }
    `;
    document.body.appendChild(overrideStyle);


  }

  // ==========================================================================
  //   Subscription Component Selection Page Module
  // ==========================================================================

  let subscriptionComponentMapping = {};
  let currentSubscriptionContinent = 'Americas';
  let currentSubscriptionRegion = null;
  let subscriptionInitialized = false; // Track if we've done initial setup
  let checkedComponentIds = new Set(); // Track checked component IDs ourselves

  function initSubscriptionPage(attempt = 0) {
    console.log(`[Sumo Subscription] Waiting for form to render... (attempt ${attempt + 1})`);

    // Wait for StatusPage's React form to render
    const form = document.querySelector('form.component-form');
    const groupedItems = document.querySelector('.grouped-items');

    if (!form && !groupedItems && attempt < 20) {
      setTimeout(() => initSubscriptionPage(attempt + 1), 500);
      return;
    }

    if (!form && !groupedItems) {
      console.error('[Sumo Subscription] Form not found after 20 attempts');
      return;
    }

    console.log('[Sumo Subscription] Form detected! Setting up custom UI...');
    console.log('[Sumo Subscription] Found form:', !!form, 'Found groupedItems:', !!groupedItems);
    document.body.classList.add('subscription-component-selection');

    // Add edit-page specific class if on edit page
    const isEditPage = /\/subscriptions\/[^/]+\/edit/.test(window.location.href);
    if (isEditPage) {
      document.body.classList.add('subscription-edit-page');
    }

    setupSubscriptionUI(isEditPage);
  }

  function setupSubscriptionUI(isEditPage = false) {
    // Map components to regions first
    mapSubscriptionComponents();

    // Find the target to insert before (similar to home page pattern)
    const target = document.querySelector('.layout-content') ||
                   document.querySelector('.container') ||
                   document.querySelector('form.component-form')?.parentElement ||
                   document.body.firstElementChild;

    if (!target) {
      console.error('[Sumo Subscription] No target found for UI insertion');
      return;
    }

    // Create wrapper for nav + heading + tabs (like home page)
    const wrapper = document.createElement('div');
    wrapper.className = 'sumo-status-page';

    // Get the original heading element and move it into our UI
    const originalHeading = document.querySelector('.heading');
    const headingHTML = originalHeading ? originalHeading.outerHTML : '';

    // Get subscriber-heading block for edit page only
    const subscriberHeading = document.querySelector('.subscriber-heading');
    const subscriberHeadingHTML = (isEditPage && subscriberHeading) ? subscriberHeading.outerHTML : '';

    wrapper.innerHTML = renderNav() + headingHTML + subscriberHeadingHTML + renderSubscriptionTabs() + renderSubscriptionBody();

    // Insert at the beginning of target's parent or before target
    if (target.parentNode) {
      target.parentNode.insertBefore(wrapper, target);
    }

    // Hide the original heading (we moved it)
    if (originalHeading) {
      originalHeading.style.display = 'none';
    }

    // Hide the original subscriber-heading (we moved it into our UI)
    if (subscriberHeading) {
      subscriberHeading.style.display = 'none';
    }

    // Hide the original form UI
    const groupedItems = document.querySelector('.grouped-items');
    if (groupedItems) {
      groupedItems.style.display = 'none';
    }

    // Hide original form actions (we'll use our own)
    const originalFormActions = document.querySelector('.form-actions');
    if (originalFormActions) {
      originalFormActions.style.display = 'none';
    }

    // Attach event handlers
    attachSubscriptionEvents();

    // Clear all original checkboxes on page load (start fresh)
    clearAllOriginalCheckboxes();

    // Get URL params for initial continent/region selection
    const params = getUrlParams();
    const initialContinent = params.continent && CONFIG.geography[params.continent] ? params.continent : 'Americas';
    selectSubscriptionContinent(initialContinent);

    // Mark initialization complete
    subscriptionInitialized = true;

    console.log('[Sumo Subscription] Setup complete!');
  }

  function clearAllOriginalCheckboxes() {
    // Clear our internal state
    checkedComponentIds.clear();

    // Clear all checkboxes in the original form on page load
    // This ensures we start with a fresh/empty state
    const allCheckboxes = document.querySelectorAll(
      '.grouped-items input[type="checkbox"], ' +
      'form.component-form input[type="checkbox"]'
    );
    allCheckboxes.forEach(cb => {
      cb.checked = false;
    });
    console.log('[Sumo Subscription] Cleared', allCheckboxes.length, 'checkboxes on page load');
  }

  function mapSubscriptionComponents() {
    // Reset mapping - structure: { continent: [{ regionName, element, components }] }
    subscriptionComponentMapping = {};

    // Initialize all continents with empty arrays (same as home page mapToContinents)
    Object.keys(CONFIG.geography).forEach(c => {
      subscriptionComponentMapping[c] = [];
    });

    // Try to find components from grouped-items structure
    const groupedItems = document.querySelector('.grouped-items');

    if (groupedItems) {
      // Find all region divs
      const regionEls = groupedItems.querySelectorAll('.region');
      console.log('[Sumo Subscription] Found regions in DOM:', regionEls.length);

      regionEls.forEach(regionEl => {
        const headerEl = regionEl.querySelector('.region-header');
        if (!headerEl) return;

        const regionName = headerEl.textContent.trim();

        // Extract region code from parentheses: "North America 1 (US1)" -> "US1"
        const regionCodeMatch = regionName.match(/\(([^)]+)\)/);
        const regionCode = regionCodeMatch ? regionCodeMatch[1] : null;

        if (!regionCode) {
          console.log('[Sumo Subscription] Skipping region without code:', regionName);
          return;
        }

        // Find which continent this region belongs to using exact code match
        let matchedContinent = null;
        for (const continent in CONFIG.geography) {
          const continentRegions = CONFIG.geography[continent].regions;
          const matchingRegion = continentRegions.find(r => r.code === regionCode);
          if (matchingRegion) {
            matchedContinent = continent;
            break;
          }
        }

        if (!matchedContinent) {
          console.log('[Sumo Subscription] No continent match for region code:', regionCode);
          return;
        }

        console.log('[Sumo Subscription] Region', regionName, '(code:', regionCode, ') -> continent:', matchedContinent);

        // Get components - select direct child .component divs with data-id attribute
        // Use > to ensure we only get direct children, not nested elements
        const componentEls = regionEl.querySelectorAll(':scope > .component[data-id]');

        // Also try alternative selectors to find checkboxes
        const checkboxesInRegion = regionEl.querySelectorAll('input[type="checkbox"]');

        // If we found checkboxes directly in region, use those instead of componentEls
        let components = [];
        if (checkboxesInRegion.length > 0) {
          // Build components from checkboxes found in this region
          components = Array.from(checkboxesInRegion).map((cb, idx) => {
            // Try multiple ways to get a unique ID
            const compDiv = cb.closest('.component');
            const id = cb.value || cb.name || cb.id || cb.dataset.componentId ||
                       compDiv?.dataset?.id || compDiv?.dataset?.componentId ||
                       `${regionCode}-${idx}`; // Fallback: generate unique ID per region
            const label = cb.closest('label') || cb.parentElement;
            const name = compDiv?.textContent?.trim() || label?.textContent?.trim() || id;
            return { id, name, checkbox: cb };
          }).filter(c => c.id && c.name); // Filter out empty IDs
        } else {
          // Fallback to componentEls approach
          components = Array.from(componentEls).map(comp => {
            const id = comp.getAttribute('data-id');
            const name = comp.textContent.trim();
            const checkbox = document.querySelector(`input[type="checkbox"][value="${id}"]`) ||
                           document.querySelector(`input[type="checkbox"][name*="${id}"]`);
            return { id, name, element: comp, checkbox };
          }).filter(c => c.id && c.name);
        }

        // Add to the continent's region list
        subscriptionComponentMapping[matchedContinent].push({
          regionName: regionName,
          element: regionEl,
          components: components
        });
      });
    }

    // Fallback: Try form.component-form structure if no regions found
    const totalRegions = Object.values(subscriptionComponentMapping).reduce((sum, arr) => sum + arr.length, 0);
    if (totalRegions === 0) {
      const form = document.querySelector('form.component-form');
      if (form) {
        discoverComponentsFromForm(form);
      }
    }
  }

  function discoverComponentsFromForm(form) {
    // Walk through text nodes to find region headers
    const walker = document.createTreeWalker(form, NodeFilter.SHOW_TEXT, null, false);
    const foundRegions = [];

    let node;
    while (node = walker.nextNode()) {
      const text = node.textContent.trim();

      // Check if this text matches any region name pattern like "North America 1 (US1)"
      const regionCodeMatch = text.match(/\(([A-Z]{2,3}\d?)\)/);
      if (!regionCodeMatch) continue;

      const regionCode = regionCodeMatch[1];

      // Find which continent this region belongs to using exact code match
      for (const continent in CONFIG.geography) {
        const regions = CONFIG.geography[continent].regions;
        const matchingRegion = regions.find(r => r.code === regionCode);
        if (matchingRegion) {
          foundRegions.push({
            continent,
            regionCode,
            regionName: text,
            element: node.parentElement
          });
          break;
        }
      }
    }

    // Sort by DOM position to ensure we can find checkboxes between regions
    foundRegions.sort((a, b) => {
      const pos = a.element.compareDocumentPosition(b.element);
      return pos & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });

    // Get all checkboxes in order
    const allCheckboxes = Array.from(form.querySelectorAll('input[type="checkbox"]'));

    // For each found region, find checkboxes that belong to it
    // by looking at checkboxes between this region header and the next
    foundRegions.forEach((regionInfo, idx) => {
      if (!subscriptionComponentMapping[regionInfo.continent]) {
        subscriptionComponentMapping[regionInfo.continent] = [];
      }

      const nextRegion = foundRegions[idx + 1];
      const components = [];

      // Find checkboxes that appear after this region header and before the next
      allCheckboxes.forEach(cb => {
        const cbPosition = regionInfo.element.compareDocumentPosition(cb);
        const isAfterCurrentHeader = cbPosition & Node.DOCUMENT_POSITION_FOLLOWING;

        let isBeforeNextHeader = true;
        if (nextRegion) {
          const nextPosition = nextRegion.element.compareDocumentPosition(cb);
          isBeforeNextHeader = nextPosition & Node.DOCUMENT_POSITION_PRECEDING;
        }

        if (isAfterCurrentHeader && isBeforeNextHeader) {
          const label = cb.closest('label') || cb.parentElement;
          const name = label?.textContent?.trim() || cb.value;
          if (name) {
            components.push({
              id: cb.value || cb.name,
              name: name,
              checkbox: cb
            });
          }
        }
      });

      subscriptionComponentMapping[regionInfo.continent].push({
        regionName: regionInfo.regionName,
        element: regionInfo.element,
        components: components
      });
    });
  }

  function renderSubscriptionTabs() {
    // Build continent tabs (same style as home page but without status dots)
    let continentTabs = '';
    Object.keys(CONFIG.geography).forEach(continent => {
      const display = CONFIG.geography[continent].displayName;
      // Add no-status class to hide the status dot on subscription page
      continentTabs += `<button class="sumo-continent-tab sumo-continent-tab--no-status" data-continent="${continent}">${display}</button>`;
    });

    return `
      <div class="sumo-continent-tabs">
        <div class="sumo-continent-tabs__nav">${continentTabs}</div>
      </div>
      <div class="sumo-region-tabs visible">
        <div class="sumo-region-tabs__nav" id="sumo-subscription-region-nav"></div>
      </div>`;
  }

  function renderSubscriptionBody() {
    return `
      <div class="sumo-subscription-page">
        <div class="sumo-subscription__groups" id="sumo-subscription-groups"></div>
        <div class="sumo-subscription__actions">
          <a href="/" class="sumo-subscription__cancel-btn">Cancel</a>
          <button type="button" class="sumo-subscription__save-btn" id="sumo-subscription-save">Save</button>
        </div>
      </div>`;
  }

  function attachSubscriptionEvents() {
    // Continent tab clicks
    document.querySelectorAll('.sumo-continent-tab').forEach(btn => {
      btn.addEventListener('click', function() {
        selectSubscriptionContinent(this.dataset.continent);
      });
    });

    // Save button - trigger the original form submit
    document.getElementById('sumo-subscription-save')?.addEventListener('click', () => {
      const originalForm = document.querySelector('form.component-form');
      const originalSubmit = document.querySelector('.form-actions button[type="submit"], .form-actions .flat-button');
      if (originalSubmit) {
        originalSubmit.click();
      } else if (originalForm) {
        originalForm.submit();
      }
    });
  }

  function selectSubscriptionContinent(continent) {
    currentSubscriptionContinent = continent;

    // Update continent tab styling
    document.querySelectorAll('.sumo-continent-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.continent === continent);
    });

    // Build region tabs for this continent
    const regionNav = document.getElementById('sumo-subscription-region-nav');
    const regionContainer = document.querySelector('.sumo-region-tabs');
    const groupsContainer = document.getElementById('sumo-subscription-groups');
    const regions = subscriptionComponentMapping[continent] || [];

    console.log('[Sumo Subscription] Selecting continent:', continent, 'Regions:', regions.length);

    if (regionNav) {
      if (regions.length === 0) {
        regionNav.innerHTML = `<span style="padding: 8px 16px; color: var(--sumo-gray-500);">No regions available for this continent</span>`;
      } else {
        regionNav.innerHTML = regions.map(r => {
          const infoText = getRegionInfo(r.regionName);
          const infoIcon = infoText ? `<span class="sumo-region-tab__info">${ICONS.info}<span class="sumo-region-tab__tooltip">${infoText}</span></span>` : '';
          // Add no-status class to hide the status dot on subscription page
          return `<button class="sumo-region-tab sumo-region-tab--no-status" data-region="${r.regionName}">${r.regionName}${infoIcon}</button>`;
        }).join('');

        // Attach region tab event listeners
        regionNav.querySelectorAll('.sumo-region-tab').forEach(btn => {
          btn.addEventListener('click', function() {
            selectSubscriptionRegion(this.dataset.region);
          });
        });
      }
    }

    if (regionContainer) {
      regionContainer.classList.toggle('visible', true); // Always show region tabs bar
    }

    // Select first region by default or show empty state
    if (regions.length > 0) {
      selectSubscriptionRegion(regions[0].regionName);
    } else if (groupsContainer) {
      groupsContainer.innerHTML = `
        <div style="padding: 40px; text-align: center; color: var(--sumo-gray-500);">
          <p>No components found for ${CONFIG.geography[continent]?.displayName || continent}.</p>
          <p style="margin-top: 8px; font-size: 12px;">This may indicate an issue with component discovery.</p>
        </div>
      `;
    }

    // Update URL
    const url = new URL(window.location.href);
    url.searchParams.set('continent', getContinentUrlCode(continent));
    window.history.replaceState({}, '', url);
  }

  function selectSubscriptionRegion(regionName) {
    currentSubscriptionRegion = regionName;

    // Update region tab styling
    document.querySelectorAll('.sumo-region-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.region === regionName);
    });

    // Find the region data
    const regions = subscriptionComponentMapping[currentSubscriptionContinent] || [];
    const regionData = regions.find(r => r.regionName === regionName);

    // Render the components for this region
    const groupsContainer = document.getElementById('sumo-subscription-groups');
    if (!groupsContainer) return;

    if (!regionData || regionData.components.length === 0) {
      groupsContainer.innerHTML = `
        <div class="sumo-subscription__region">
          <div class="sumo-subscription__region-header">
            <span class="sumo-subscription__region-name">${regionName}</span>
          </div>
          <div class="sumo-subscription__components">
            <p style="padding: 20px; text-align: center; color: var(--sumo-gray-500); grid-column: 1 / -1;">
              No components found for this region.
            </p>
          </div>
        </div>
      `;
      return;
    }

    // Build checkbox UI from the original components
    // Extract region code for generating unique IDs
    const regionCodeMatch = regionName.match(/\(([^)]+)\)/);
    const regionCode = regionCodeMatch ? regionCodeMatch[1] : regionName.replace(/\s+/g, '-');

    const componentsHTML = regionData.components.map((comp, idx) => {
      // Generate unique ID if the component doesn't have one
      // Use regionCode + index to ensure uniqueness across regions
      const compId = (comp.id && comp.id.trim()) ? comp.id : `${regionCode}-comp-${idx}`;

      // Also update the component object so syncing works
      if (!comp.id || !comp.id.trim()) {
        comp.id = compId;
      }

      const isChecked = checkedComponentIds.has(compId);
      return `
        <div class="sumo-subscription__component">
          <label class="sumo-subscription__checkbox">
            <input type="checkbox" data-component-id="${compId}"${isChecked ? ' checked' : ''}>
            <span class="sumo-subscription__checkbox-visual"></span>
          </label>
          <span class="sumo-subscription__component-name" data-component-id="${compId}">${comp.name}</span>
        </div>
      `;
    }).join('');

    groupsContainer.innerHTML = `
      <div class="sumo-subscription__region">
        <div class="sumo-subscription__region-header">
          <span class="sumo-subscription__region-name">${regionName}</span>
          <button type="button" class="sumo-subscription__region-toggle" data-region="${regionName}">Toggle All</button>
        </div>
        <div class="sumo-subscription__components">${componentsHTML}</div>
      </div>
    `;

    // Attach checkbox event handlers scoped to the groups container
    attachCheckboxHandlers(groupsContainer);
  }

  function attachCheckboxHandlers(container) {
    // Handle checkbox changes - sync with original form
    container.querySelectorAll('.sumo-subscription__checkbox input').forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const componentId = this.dataset.componentId;
        syncCheckboxWithOriginal(componentId, this.checked);
      });
    });

    // Handle label clicks - find the sibling checkbox within the same component div
    container.querySelectorAll('.sumo-subscription__component-name').forEach(label => {
      label.addEventListener('click', function() {
        const componentDiv = this.closest('.sumo-subscription__component');
        const checkbox = componentDiv?.querySelector('.sumo-subscription__checkbox input');
        if (checkbox) {
          checkbox.checked = !checkbox.checked;
          checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
      });
    });

    // Handle toggle all button
    container.querySelectorAll('.sumo-subscription__region-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const region = this.closest('.sumo-subscription__region');
        const checkboxes = region.querySelectorAll('.sumo-subscription__checkbox input');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        checkboxes.forEach(cb => {
          cb.checked = !allChecked;
          cb.dispatchEvent(new Event('change', { bubbles: true }));
        });
      });
    });
  }

  function syncCheckboxWithOriginal(componentId, isChecked) {
    // Update our own state tracking Set
    if (isChecked) {
      checkedComponentIds.add(componentId);
    } else {
      checkedComponentIds.delete(componentId);
    }

    // Also sync with original form checkbox if found
    const originalCheckbox = document.querySelector(
      `.grouped-items input[value="${componentId}"], ` +
      `.grouped-items input[data-component-id="${componentId}"], ` +
      `form.component-form input[value="${componentId}"]`
    );

    if (originalCheckbox) {
      originalCheckbox.checked = isChecked;
      originalCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }

  window.SumoStatus = { CONFIG, ICONS, refresh: setup };
  window.SumoSubscription = { refresh: initSubscriptionPage, selectContinent: selectSubscriptionContinent };
  init();
})();
