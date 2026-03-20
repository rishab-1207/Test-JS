<style>
/* ==========================================================================
   Phase 1: CSS Foundation - Custom Properties & Typography
  ========================================================================== */

/* Font Loading - Lab Grotesque from Sumo CDN */
@font-face {
  font-family: 'Lab Grotesque';
  src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
  
@font-face {
  font-family: 'Lab Grotesque';
  src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lab Grotesque';
  src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Lab Grotesque';
  src: url('https://www.sumologic.com/wp-content/themes/b3rg-theme/dist/fonts/LabGrotesque-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

/* CSS Custom Properties - Yama Design System Tokens */
:root {
  /* Colors - Primary */
  --sumo-color-primary: #2063d6;
  --sumo-color-brand-blue: #000999;
  --sumo-color-black: #000000;
  --sumo-color-white: #ffffff;

  /* Colors - Status */
  --sumo-color-success: #348700;
  --sumo-color-warning: #c95100;
  --sumo-color-critical: #d63a2e;
  --sumo-color-info: #2063d6;
  --sumo-color-maintenance: #6554c0;

  /* Colors - Incident Banner (from screenshot) */
  --sumo-color-incident-yellow: #e8b004;
  --sumo-color-incident-border: #e0a800;

  /* Colors - Backgrounds */
  --sumo-bg-success: #e3f7cd;
  --sumo-bg-warning: #fff3cd;
  --sumo-bg-critical: #ffe7e6;
  --sumo-bg-info: #e3edff;
  --sumo-bg-maintenance: #ede7f6;

  /* Colors - Neutral */
  --sumo-gray-50: #f9fafb;
  --sumo-gray-100: #f1f1f1;
  --sumo-gray-200: #e5e7eb;
  --sumo-gray-300: #d1d5db;
  --sumo-gray-400: #9ca3af;
  --sumo-gray-500: #6b7280;
  --sumo-gray-600: #4b5563;
  --sumo-gray-700: #374151;
  --sumo-gray-800: #1f2937;
  --sumo-gray-900: #111827;

  /* Spacing - 8px grid */
  --sumo-space-1: 4px;
  --sumo-space-2: 8px;
  --sumo-space-3: 12px;
  --sumo-space-4: 16px;
  --sumo-space-5: 20px;
  --sumo-space-6: 24px;
  --sumo-space-8: 32px;
  --sumo-space-10: 40px;
  --sumo-space-12: 48px;
  --sumo-space-16: 64px;

  /* Typography */
  --sumo-font-family: 'Lab Grotesque', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --sumo-font-size-xs: 12px;
  --sumo-font-size-sm: 14px;
  --sumo-font-size-base: 16px;
  --sumo-font-size-lg: 18px;
  --sumo-font-size-xl: 20px;
  --sumo-font-size-2xl: 24px;
  --sumo-font-size-3xl: 30px;

  /* Font Weights */
  --sumo-font-light: 300;
  --sumo-font-regular: 400;
  --sumo-font-medium: 500;
  --sumo-font-bold: 700;

  /* Border Radius - Yama DS uses 0px (sharp corners) */
  --sumo-radius-none: 0px;
  --sumo-radius-sm: 0px;
  --sumo-radius-md: 0px;
  --sumo-radius-lg: 0px;
  --sumo-radius-xl: 0px;

  /* Yama DS Colors */
  --sumo-primary-hover: #6a9ef7;
  --sumo-primary-active: #0944ab;
  --sumo-secondary-bg: #ebeff2;
  --sumo-secondary-hover: #dfe4e8;
  --sumo-secondary-active: #c9d0d6;
  --sumo-tab-color: #517691;
  --sumo-tab-selected: #151e30;
  --sumo-card-border: rgba(0, 41, 112, 0.15);

  /* Shadows */
  --sumo-shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --sumo-shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --sumo-shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);

  /* Layout */
  --sumo-max-width: 1200px;
  --sumo-nav-height: 80px;
}

/* Base Reset for Sumo components */
.sumo-status-page,
.sumo-status-page * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.sumo-status-page {
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-regular);
  color: var(--sumo-gray-900);
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Hide default StatusPage elements */
.component-container,
.components-section > .component-inner-container,
.page-status,
.unresolved-incidents,
.incidents-list,
.text-section,
#about-this-site,
.text-section h2,
.text-section p,
.masthead.no-logo,
.masthead-container {
  display: none !important;
}

/* Fix page footer margin */
.page-footer {
  margin-bottom: 0 !important;
}

/* Remove padding from layout content */
.layout-content.status.status-index.premium,
.layout-content.status.status-history.premium {
  padding-bottom: 0 !important;
}

/* ==========================================================================
   History Page Styling
   ========================================================================== */

/* ==========================================================================
   History Page — Global Font Reset
   Force Lab Grotesque font, size, weight, and style on every element
   ========================================================================== */

body.status-history,
body.status-history *,
body.status-history .page-footer,
body.status-history .page-footer * {
  font-family: var(--sumo-font-family) !important;
  -webkit-font-smoothing: antialiased !important;
  -moz-osx-font-smoothing: grayscale !important;
}

/* Base body text */
body.status-history {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-regular) !important;
  line-height: 1.5 !important;
  color: var(--sumo-gray-900) !important;
  letter-spacing: 0 !important;
  padding-top: 80px !important;
}

/* History page container */
.status-history .incidents-list,
.status-history .months-container {
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: var(--sumo-space-6);
}

/* Add top margin for fixed nav on history page — multiple selectors for reliability */
.status-history .layout-content,
.status-history .container,
.status-history .page-component,
body.status-history .layout-content,
body.status-history .container,
body.status-history > .layout-content,
body.status-history > div > .layout-content {
  padding-top: 160px !important;
  margin-top: 0 !important;
}

/* Ensure filter and date range controls are visible below nav */
.status-history .filter-bar,
.status-history .timeframe-selector,
.status-history .months-filter,
.status-history select,
.status-history .custom-select {
  font-family: var(--sumo-font-family) !important;
  font-size: var(--sumo-font-size-sm) !important;
  margin-top: var(--sumo-space-4) !important;
}

/* ==========================================================================
   History Page — Heading Overrides (h1, h2, h3, month headers)
   ========================================================================== */

.status-history h1,
.status-history .page-title {
  font-size: var(--sumo-font-size-xl) !important;
  font-weight: var(--sumo-font-bold) !important;
  color: var(--sumo-gray-900) !important;
  line-height: 1.3 !important;
  letter-spacing: -0.01em !important;
}

.status-history h2,
.status-history .month,
.status-history .timeframe-header {
  font-size: var(--sumo-font-size-xl) !important;
  font-weight: var(--sumo-font-bold) !important;
  color: var(--sumo-gray-900) !important;
  line-height: 1.3 !important;
  letter-spacing: -0.01em !important;
  margin-bottom: var(--sumo-space-4) !important;
  padding-bottom: var(--sumo-space-2) !important;
  border-bottom: 1px solid var(--sumo-gray-200) !important;
}

.status-history h3 {
  font-size: var(--sumo-font-size-base) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-gray-900) !important;
  line-height: 1.4 !important;
}

.status-history h4 {
  margin-top: var(--sumo-space-6) !important;
  margin-bottom: var(--sumo-space-4) !important;
}

/* ==========================================================================
   History Page — Incident Cards
   ========================================================================== */

.status-history .incident-container,
.status-history .status-day {
  padding: var(--sumo-space-4) !important;
  margin-bottom: var(--sumo-space-3) !important;
  background-color: var(--sumo-color-white) !important;
  border: 1px solid var(--sumo-card-border) !important;
  border-radius: var(--sumo-radius-none) !important;
}

.status-history .incident-container:hover,
.status-history .status-day:hover {
  border-color: var(--sumo-color-primary) !important;
}

/* Incident titles */
.status-history .incident-title,
.status-history .actual-title,
.status-history .font-largest {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-gray-900) !important;
  line-height: 1.5 !important;
  text-decoration: none !important;
}

.status-history .incident-title a,
.status-history .actual-title a,
.status-history .font-largest a {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-gray-900) !important;
  text-decoration: none !important;
}

.status-history .incident-title a:hover,
.status-history .actual-title a:hover,
.status-history .font-largest a:hover {
  color: var(--sumo-color-primary) !important;
}

/* ==========================================================================
   History Page — Body Text, Paragraphs, Updates
   ========================================================================== */

.status-history p,
.status-history .update,
.status-history .updates,
.status-history .whitespace-pre-wrap,
.status-history .incident-update-body {
  font-size: var(--sumo-font-size-xs) !important;
  font-weight: var(--sumo-font-regular) !important;
  color: var(--sumo-gray-700) !important;
  line-height: 1.6 !important;
}

.status-history strong,
.status-history b {
  font-weight: var(--sumo-font-medium) !important;
}

/* ==========================================================================
   History Page — Dates, Timestamps, Small Text
   ========================================================================== */

.status-history .date,
.status-history .font-large,
.status-history small,
.status-history time,
.status-history .timestamp,
.status-history .relative-timeago {
  font-size: var(--sumo-font-size-xs) !important;
  font-weight: var(--sumo-font-regular) !important;
  color: var(--sumo-gray-500) !important;
  line-height: 1.5 !important;
}

/* ==========================================================================
   History Page — Status Badges & Impact Labels
   ========================================================================== */

.status-history .impact,
.status-history .badge,
.status-history .component-status,
.status-history [class*="impact-"] {
  font-size: var(--sumo-font-size-xs) !important;
  font-weight: var(--sumo-font-medium) !important;
  line-height: 1.4 !important;
  padding: 2px var(--sumo-space-2) !important;
  border-radius: var(--sumo-radius-none) !important;
}

/* ==========================================================================
   History Page — Links
   ========================================================================== */

.status-history a {
  font-size: inherit !important;
  font-weight: inherit !important;
  color: var(--sumo-gray-900) !important;
  text-decoration: none !important;
}

.status-history a:hover {
  color: var(--sumo-color-primary) !important;
}

/* ==========================================================================
   History Page — No Incidents Message
   ========================================================================== */

.status-history .no-incidents,
.status-history .empty-description {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-regular) !important;
  color: var(--sumo-gray-500) !important;
  text-align: center !important;
  padding: var(--sumo-space-8) !important;
}

/* ==========================================================================
   History Page — Footer Override
   ========================================================================== */

.status-history .page-footer,
.status-history .page-footer a,
.status-history .page-footer span,
.status-history .page-footer p {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-regular) !important;
  color: var(--sumo-gray-500) !important;
  line-height: 1.5 !important;
}

/* ==========================================================================
   History Page — Pagination
   ========================================================================== */

.status-history .pagination,
.status-history .pagination a,
.status-history .pagination span {
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-medium) !important;
  line-height: 1.5 !important;
}

/* Remove focus outline on tabs */
.sumo-continent-tab:focus,
.sumo-region-tab:focus,
.sumo-nav__subscribe-btn:focus {
  outline: none;
}

/* ==========================================================================
   Phase 2: Sticky Navigation Bar
   ========================================================================== */

.sumo-nav {
  position: sticky;
  top: 0;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-top: -65px;
  height: var(--sumo-nav-height);
  background-color: var(--sumo-color-white);
  border-bottom: 1px solid var(--sumo-gray-200);
  box-shadow: var(--sumo-shadow-sm);
  z-index: 1000;
  background: #101827;
}

.sumo-nav__container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--sumo-max-width);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--sumo-space-6);
}

.sumo-nav__logo {
  display: flex;
  align-items: center;
  gap: var(--sumo-space-3);
  text-decoration: none;
  color: var(--sumo-color-black);
}

.sumo-nav__logo-img {
  height: 40px;
  width: auto;
}

.sumo-nav__logo-text {
  font-size: var(--sumo-font-size-lg);
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-color-brand-blue);
}

.sumo-nav__actions {
  display: flex;
  align-items: center;
  gap: var(--sumo-space-4);
}

.sumo-nav__link {
  display: inline-flex;
  align-items: center;
  gap: var(--sumo-space-2);
  padding: var(--sumo-space-2) var(--sumo-space-4);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: white;
  text-decoration: none;
  border-radius: var(--sumo-radius-md);
  transition: all 0.2s ease;
}

.sumo-nav__link:hover {
  color: var(--sumo-color-primary);
  background-color: var(--sumo-gray-50);
}

.sumo-nav__subscribe-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sumo-space-2);
  height: 36px;
  min-width: 100px;
  padding: 0 var(--sumo-space-3);
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-regular);
  line-height: 100%;
  color: var(--sumo-color-white);
  background-color: var(--sumo-color-primary);
  border: none;
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.sumo-nav__subscribe-btn:hover {
  background-color: var(--sumo-primary-hover);
  color: var(--sumo-color-white);
}

.sumo-nav__subscribe-btn:active {
  background-color: var(--sumo-primary-active);
}

/* ==========================================================================
   Subscribe Dropdown Positioning Fix
   ========================================================================== */

.sumo-nav .updates-dropdown-container {
  position: relative;
}

.sumo-nav .updates-dropdown {
  position: absolute !important;
  top: 100% !important;
  right: 0 !important;
  left: auto !important;
  margin-top: 8px;
  min-width: 320px;
  max-width: 90vw;
  z-index: 10000;
}

/* Style the subscribe button inside dropdown */
#subscribe-btn-email,
#subscribe-btn-slack,
.sumo-nav .updates-dropdown .flat-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  padding: var(--sumo-space-2) var(--sumo-space-4);
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-color-white);
  background-color: var(--sumo-color-primary);
  border: none;
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.15s ease;
  margin-bottom: var(--sumo-space-3);
}

#subscribe-btn-email:hover,
#subscribe-btn-slack:hover,
.sumo-nav .updates-dropdown .flat-button:hover {
  background-color: var(--sumo-primary-hover);
}

/* Selected state for subscribe dropdown tab buttons */
.updates-dropdown-nav a[role="tab"].active {
  background-color: var(--sumo-color-primary) !important;
}

/* SMS icon - replace mobile phone with SMS/chat bubble icon */
.updates-dropdown-nav .icon-container.sms {
  display: none !important;
}

.updates-dropdown-nav a[href="#updates-dropdown-sms"]::before {
  content: '';
  display: inline-block;
  width: 16px;
  height: 16px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
  background-size: contain;
  background-repeat: no-repeat;
  vertical-align: middle;
  position: relative;
  top: 50%;
  transform: translateY(-80%);
}

/* SMS icon turns white when active */
.updates-dropdown-nav a[href="#updates-dropdown-sms"].active::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");
}

/* ==========================================================================
   Phase 3: Tab Navigation (Continent & Region)
   ========================================================================== */

/* Continent Tabs - Yama DS Style */
.sumo-continent-tabs {
  width: 100%;
  background-color: var(--sumo-color-white);
  border-bottom: 1px solid var(--sumo-gray-200);
}

.sumo-continent-tabs__nav {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: 0 var(--sumo-space-6);
}

.sumo-continent-tab {
  position: relative;
  height: 36px;
  min-width: 90px;
  padding: var(--sumo-space-2) var(--sumo-space-3);
  padding-left: 28px;
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-regular);
  line-height: 100%;
  text-align: center;
  color: var(--sumo-tab-color);
  background-color: transparent;
  border: none;
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  transition: all 0.15s ease;
}

/* Status indicator dot on continent tabs */
.sumo-continent-tab::before {
  content: '';
  position: absolute;
  left: var(--sumo-space-2);
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--sumo-color-success);
}

.sumo-continent-tab.status-degraded::before {
  background-color: var(--sumo-color-warning);
}

.sumo-continent-tab.status-critical::before {
  background-color: var(--sumo-color-critical);
}

.sumo-continent-tab.status-maintenance::before {
  background-color: var(--sumo-color-maintenance);
}

/* Hide status dot on subscription page tabs */
.sumo-continent-tab.sumo-continent-tab--no-status::before {
  display: none;
}

.sumo-continent-tab.sumo-continent-tab--no-status {
  padding-left: var(--sumo-space-3);
}

.sumo-region-tab.sumo-region-tab--no-status::before {
  display: none;
}

.sumo-region-tab.sumo-region-tab--no-status {
  padding-left: var(--sumo-space-3);
}

.sumo-continent-tab:hover {
  color: var(--sumo-tab-color);
  background-color: var(--sumo-secondary-bg);
}

.sumo-continent-tab:active {
  background-color: var(--sumo-secondary-active);
}

.sumo-continent-tab.active {
  color: var(--sumo-tab-selected);
  background-color: transparent;
  font-weight: var(--sumo-font-medium);
}

/* Active tab indicator - 3px blue underline */
.sumo-continent-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--sumo-color-primary);
}

/* Region Tabs - Yama DS Style */
.sumo-region-tabs {
  width: 100%;
  background-color: var(--sumo-gray-50);
  border-bottom: 1px solid var(--sumo-gray-200);
  display: none;
}

.sumo-region-tabs.visible {
  display: block;
}

.sumo-region-tabs__nav {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 0;
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: 0 var(--sumo-space-6);
}

.sumo-region-tab {
  position: relative;
  height: 36px;
  min-width: 90px;
  padding: var(--sumo-space-2) var(--sumo-space-3);
  padding-left: 28px;
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-regular);
  line-height: 100%;
  text-align: center;
  color: var(--sumo-tab-color);
  background-color: transparent;
  border: none;
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.sumo-region-tab:hover {
  background-color: var(--sumo-secondary-bg);
}

.sumo-region-tab:active {
  background-color: var(--sumo-secondary-active);
}

.sumo-region-tab.active {
  color: var(--sumo-tab-selected);
  background-color: transparent;
  font-weight: var(--sumo-font-medium);
}

/* Active region tab indicator */
.sumo-region-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--sumo-color-primary);
}

/* Status indicator dot on region tabs */
.sumo-region-tab::before {
  content: '';
  position: absolute;
  left: var(--sumo-space-2);
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--sumo-color-success);
}

.sumo-region-tab.status-degraded::before {
  background-color: var(--sumo-color-warning);
}

.sumo-region-tab.status-critical::before {
  background-color: var(--sumo-color-critical);
}

.sumo-region-tab.status-maintenance::before {
  background-color: var(--sumo-color-maintenance);
}

/* Info icon for region tabs */
.sumo-region-tab__info {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: var(--sumo-space-2);
  width: 16px;
  height: 16px;
  color: var(--sumo-gray-400);
  cursor: pointer;
  position: relative;
}

.sumo-region-tab__info:hover {
  color: var(--sumo-color-primary);
}

.sumo-region-tab__info svg {
  width: 14px;
  height: 14px;
}

/* Tooltip for info icon */
.sumo-region-tab__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--sumo-gray-800);
  color: var(--sumo-color-white);
  font-size: var(--sumo-font-size-xs);
  font-weight: var(--sumo-font-regular);
  padding: var(--sumo-space-2) var(--sumo-space-3);
  border-radius: 4px;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.15s ease, visibility 0.15s ease;
  z-index: 1001;
  pointer-events: none;
}

/* Tooltip arrow */
.sumo-region-tab__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: var(--sumo-gray-800);
}

.sumo-region-tab__info:hover .sumo-region-tab__tooltip {
  opacity: 1;
  visibility: visible;
}

/* ==========================================================================
   Phase 4: Service Cards Grid
   ========================================================================== */

.sumo-services {
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: var(--sumo-space-6);
}

.sumo-services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--sumo-space-4);
}

/* Service Card - Yama DS Style */
.sumo-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--sumo-space-3);
  background-color: var(--sumo-color-white);
  border: 1px solid var(--sumo-card-border);
  border-radius: var(--sumo-radius-none);
  transition: border-color 0.15s ease;
}

.sumo-card:hover {
  border-color: var(--sumo-color-primary);
}

/* Card Info (Left side) */
.sumo-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--sumo-space-1);
}

.sumo-card__name {
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-gray-900);
}

.sumo-card__status-text {
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-500);
}

.sumo-card__status-text.operational {
  color: var(--sumo-color-success);
}

.sumo-card__status-text.degraded {
  color: var(--sumo-color-warning);
}

.sumo-card__status-text.critical {
  color: var(--sumo-color-critical);
}

.sumo-card__status-text.maintenance {
  color: var(--sumo-color-maintenance);
}

/* Card Icon (Right side) */
.sumo-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.sumo-card__icon img,
.sumo-card__icon svg {
  width: 24px;
  height: 24px;
}

/* Responsive Grid */
@media screen and (max-width: 1024px) {
  .sumo-services__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 640px) {
  .sumo-services__grid {
    grid-template-columns: 1fr;
  }

  /* Keep tabs horizontal with scroll on mobile */
  .sumo-continent-tabs,
  .sumo-region-tabs {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .sumo-continent-tabs__nav,
  .sumo-region-tabs__nav {
    justify-content: flex-start;
    flex-wrap: nowrap;
    min-width: max-content;
  }
}

/* ==========================================================================
   Phase 5: Past Incidents Section
   ========================================================================== */

.sumo-incidents {
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: var(--sumo-space-6);
}

.sumo-incidents__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--sumo-space-4);
}

.sumo-incidents__title {
  font-size: var(--sumo-font-size-xl);
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-gray-900);
}

.sumo-incidents__link {
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-color-primary);
  text-decoration: none;
}

.sumo-incidents__link:hover {
  text-decoration: underline;
}

.sumo-incidents__list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid var(--sumo-card-border);
  border-radius: var(--sumo-radius-none);
  background-color: var(--sumo-color-white);
}

.sumo-incident {
  padding: var(--sumo-space-4);
  border-bottom: 1px solid var(--sumo-gray-100);
}

.sumo-incident:last-child {
  border-bottom: none;
}

.sumo-incident__date {
  font-size: var(--sumo-font-size-xs);
  color: var(--sumo-gray-500);
  margin-bottom: var(--sumo-space-1);
}

.sumo-incident__title {
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-gray-900);
  margin-bottom: var(--sumo-space-1);
}

.sumo-incident__status {
  display: inline-block;
  padding: 2px var(--sumo-space-2);
  font-size: var(--sumo-font-size-xs);
  font-weight: var(--sumo-font-medium);
  border-radius: var(--sumo-radius-none);
}

.sumo-incident__status.resolved {
  background-color: var(--sumo-bg-success);
  color: var(--sumo-color-success);
}

.sumo-incident__status.investigating {
  background-color: var(--sumo-bg-warning);
  color: var(--sumo-color-warning);
}

.sumo-incident__status.identified {
  background-color: var(--sumo-bg-info);
  color: var(--sumo-color-info);
}

/* ==========================================================================
   Unresolved (Active) Incidents Section — Yellow Card Style (Screenshot)
   ========================================================================== */

.sumo-unresolved-incidents {
  max-width: var(--sumo-max-width);
  margin: 30px auto;
  margin-top: 80px;
}

.cookie-consent-banner {
  margin-top: 64px;
  margin-bottom: -60px;
}

/* .sumo-incidents__title--active {
  color: var(--sumo-color-critical);
} */

/* Each incident card: outer wrapper with yellow border */
.sumo-incident-card {
  border: 1px solid var(--sumo-color-incident-yellow);
  border-radius: var(--sumo-radius-none);
  overflow: hidden;
  margin-bottom: var(--sumo-space-4);
}

.sumo-incident-card:last-child {
  margin-bottom: 0;
}

/* Yellow header bar */
.sumo-incident-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sumo-space-3) var(--sumo-space-4);
  background-color: var(--sumo-color-incident-yellow);
}

.sumo-incident-card__title {
  font-size: var(--sumo-font-size-lg);
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-color-white);
  line-height: 1.3;
}

.sumo-incident-card__title a {
  color: var(--sumo-color-white);
  text-decoration: none;
}

.sumo-incident-card__title a:hover {
  text-decoration: underline;
}

.sumo-incident-card__subscribe {
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-color-white);
  text-decoration: none;
  flex-shrink: 0;
  margin-left: var(--sumo-space-4);
}

.sumo-incident-card__subscribe:hover {
  text-decoration: underline;
  color: var(--sumo-color-white);
}

/* White body area with left yellow accent border */
.sumo-incident-card__body {
  padding: var(--sumo-space-4);
  background-color: var(--sumo-color-white);

}

.sumo-incident-card__update {
  font-size: var(--sumo-font-size-base);
  color: var(--sumo-gray-700);
  line-height: 1.5;
  margin-bottom: var(--sumo-space-2);
}

.sumo-incident-card__update strong {
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-gray-900);
}

.sumo-incident-card__date {
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-400);
}

/* Impact-based header color variants */
.sumo-incident-card.impact-critical .sumo-incident-card__header {
  background-color: var(--sumo-color-critical);
}
.sumo-incident-card.impact-critical {
  border-color: var(--sumo-color-critical);
}

.sumo-incident-card.impact-maintenance .sumo-incident-card__header {
  background-color: var(--sumo-color-maintenance);
}
.sumo-incident-card.impact-maintenance {
  border-color: var(--sumo-color-maintenance);
}

/* ==========================================================================
   Scheduled Maintenance Section
   ========================================================================== */

.sumo-scheduled-maintenance {
  max-width: var(--sumo-max-width);
  margin: 30px auto;
}

.sumo-scheduled-maintenance .sumo-incidents__title {
  color: var(--sumo-gray-900);
}

/* ==========================================================================
   Phase 6: About Section & Footer
   ========================================================================== */

.sumo-about {
  max-width: var(--sumo-max-width);
  margin: var(--sumo-space-8) auto 0;
  padding: var(--sumo-space-6) var(--sumo-space-6);
  background-color: var(--sumo-gray-50);
}

.sumo-about__title {
  font-size: var(--sumo-font-size-lg);
  font-weight: var(--sumo-font-bold);
  color: var(--sumo-gray-900);
  margin-bottom: var(--sumo-space-3);
}

.sumo-about__text {
  font-size: var(--sumo-font-size-base);
  color: var(--sumo-gray-600);
  line-height: 1.6;
}

.sumo-footer {
  background-color: var(--sumo-gray-50);
  border-top: 1px solid var(--sumo-gray-200);
  padding: var(--sumo-space-6) 0;
}

.sumo-footer__container {
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  padding: 0 var(--sumo-space-6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sumo-footer__copyright {
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-500);
}

.sumo-footer__links {
  display: flex;
  gap: var(--sumo-space-4);
}

.sumo-footer__link {
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-600);
  text-decoration: none;
}

.sumo-footer__link:hover {
  color: var(--sumo-color-primary);
}

/* ==========================================================================
   Status Banner - Simple flex container with status-based background
   ========================================================================== */

.sumo-status-banner {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: var(--sumo-space-3);
  max-width: var(--sumo-max-width);
  margin: 100px auto var(--sumo-space-8);
  padding: var(--sumo-space-4) var(--sumo-space-6);
}

.sumo-status-banner.operational {
  background-color: var(--sumo-bg-success);
}

.sumo-status-banner.degraded {
  background-color: var(--sumo-bg-warning);
}

.sumo-status-banner.critical {
  background-color: var(--sumo-bg-critical);
}

.sumo-status-banner.maintenance {
  background-color: var(--sumo-bg-maintenance);
}

.sumo-status-banner__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.sumo-status-banner__icon svg {
  width: 24px;
  height: 24px;
}

.sumo-status-banner__text {
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-medium);
}

.sumo-status-banner.operational .sumo-status-banner__text {
  color: var(--sumo-color-success);
}

.sumo-status-banner.degraded .sumo-status-banner__text {
  color: var(--sumo-color-warning);
}

.sumo-status-banner.critical .sumo-status-banner__text {
  color: var(--sumo-color-critical);
}

.sumo-status-banner.maintenance .sumo-status-banner__text {
  color: var(--sumo-color-maintenance);
}

/* ==========================================================================
   Subscription Component Selection Page Styles
   ========================================================================== */

/* Hide default StatusPage elements on subscription page */
body.subscription-component-selection .grouped-items {
  display: none !important;
}

/* Constrain tabs to match subscription page container width */
body.subscription-component-selection .sumo-continent-tabs,
body.subscription-component-selection .sumo-region-tabs {
  width: 850px;
  max-width: 90%;
  margin: 0 auto;
}

/* Hide the layout-content container on subscription page - it adds unnecessary height */
body.subscription-component-selection .layout-content.manage-subscriptions,
body.subscription-component-selection .layout-content.status.manage-subscriptions {
  display: none !important;
}

/* Style the original heading element */
.sumo-status-page .heading {
  max-width: var(--sumo-max-width);
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: var(--sumo-space-6);
  padding: var(--sumo-space-6);
  text-align: center;
}

.sumo-status-page .heading .title {
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-lg);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-gray-900);
  margin: 0 0 var(--sumo-space-2) 0;
}

.sumo-status-page .heading .subscriber {
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-color-primary);
  margin-bottom: var(--sumo-space-2);
}

.sumo-status-page .heading .instructions {
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-500);
}

/* ==========================================================================
   Subscription Edit Page - Subscriber Heading Block
   ========================================================================== */

/* Ensure subscriber-heading is visible on edit page */
body.subscription-edit-page .subscriber-heading {
  display: block !important;
}

/* Style the subscriber-heading block (only on edit page) */
.sumo-status-page .subscriber-heading {
  max-width: 850px;
  width: 90%;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: var(--sumo-space-6);
  text-align: center;
}

/* Hide the "Subscriber" label outside the box */
.sumo-status-page .subscriber-heading h6 {
  display: none !important;
}

.sumo-status-page .subscriber-heading .border {
  background-color: var(--sumo-color-white);
  border: 1px solid var(--sumo-card-border) !important;
  border-radius: var(--sumo-radius-none);
  padding: var(--sumo-space-4) var(--sumo-space-6);
}

.sumo-status-page .subscriber-heading .mode {
  font-family: var(--sumo-font-family) !important;
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-gray-500) !important;
  margin: 0 0 var(--sumo-space-1) 0 !important;
}

.sumo-status-page .subscriber-heading .identifier {
  font-family: var(--sumo-font-family) !important;
  font-size: var(--sumo-font-size-base) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-gray-900) !important;
  margin: 0 0 var(--sumo-space-3) 0 !important;
}

.sumo-status-page .subscriber-heading .unsubscribe-button {
  font-family: var(--sumo-font-family) !important;
  font-size: var(--sumo-font-size-sm) !important;
  font-weight: var(--sumo-font-medium) !important;
  color: var(--sumo-color-critical) !important;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.15s ease;
}

.sumo-status-page .subscriber-heading .unsubscribe-button:hover {
  opacity: 0.8;
  text-decoration: underline;
}

/* Subscription page container */
.sumo-subscription-page {
  font-family: var(--sumo-font-family);
  width: 90%;
  max-width: 850px;
  margin: 0 auto;
  padding: var(--sumo-space-6);
}

/* Component groups container */
.sumo-subscription__groups {
  display: flex;
  flex-direction: column;
  gap: var(--sumo-space-6);
}

/* Region group */
.sumo-subscription__region {
  background-color: var(--sumo-color-white);
  border: 1px solid var(--sumo-card-border);
  border-radius: var(--sumo-radius-none);
  overflow: hidden;
}

.sumo-subscription__region.hidden-region {
  display: none !important;
}

.sumo-subscription__region-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--sumo-space-3) var(--sumo-space-4);
  background-color: var(--sumo-gray-50);
  border-bottom: 1px solid var(--sumo-gray-200);
}

.sumo-subscription__region-name {
  font-size: var(--sumo-font-size-base);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-gray-900);
}

.sumo-subscription__region-toggle {
  font-size: var(--sumo-font-size-xs);
  color: var(--sumo-color-primary);
  background: none;
  border: none;
  cursor: pointer;
  font-family: var(--sumo-font-family);
  font-weight: var(--sumo-font-medium);
}

.sumo-subscription__region-toggle:hover {
  text-decoration: underline;
}

/* Components list within region */
.sumo-subscription__components {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
}

/* Component checkbox item */
.sumo-subscription__component {
  display: flex;
  align-items: center;
  gap: var(--sumo-space-3);
  padding: var(--sumo-space-3) var(--sumo-space-4);
  border-bottom: 1px solid var(--sumo-gray-100);
  border-right: 1px solid var(--sumo-gray-100);
  transition: background-color 0.15s ease;
}

.sumo-subscription__component:hover {
  background-color: var(--sumo-gray-50);
}

.sumo-subscription__component:nth-child(3n) {
  border-right: none;
}

/* Custom checkbox styling */
.sumo-subscription__checkbox {
  position: relative;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.sumo-subscription__checkbox input {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  margin: 0;
}

.sumo-subscription__checkbox-visual {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background-color: var(--sumo-color-white);
  border: 2px solid var(--sumo-gray-300);
  border-radius: 2px;
  transition: all 0.15s ease;
}

.sumo-subscription__checkbox input:checked + .sumo-subscription__checkbox-visual {
  background-color: var(--sumo-color-primary);
  border-color: var(--sumo-color-primary);
}

.sumo-subscription__checkbox input:checked + .sumo-subscription__checkbox-visual::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid var(--sumo-color-white);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.sumo-subscription__checkbox input:focus + .sumo-subscription__checkbox-visual {
  box-shadow: 0 0 0 2px rgba(32, 99, 214, 0.2);
}

.sumo-subscription__component-name {
  font-size: var(--sumo-font-size-sm);
  color: var(--sumo-gray-700);
  cursor: pointer;
}

/* Form actions */
.sumo-subscription__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--sumo-space-3);
  margin-top: var(--sumo-space-6);
  padding-top: var(--sumo-space-4);
  border-top: 1px solid var(--sumo-gray-200);
}

.sumo-subscription__cancel-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 var(--sumo-space-4);
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-gray-700);
  background-color: var(--sumo-color-white);
  border: 1px solid var(--sumo-gray-300);
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.sumo-subscription__cancel-btn:hover {
  background-color: var(--sumo-gray-50);
  border-color: var(--sumo-gray-400);
}

.sumo-subscription__save-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 var(--sumo-space-4);
  font-family: var(--sumo-font-family);
  font-size: var(--sumo-font-size-sm);
  font-weight: var(--sumo-font-medium);
  color: var(--sumo-color-white);
  background-color: var(--sumo-color-primary);
  border: 1px solid var(--sumo-color-primary);
  border-radius: var(--sumo-radius-none);
  cursor: pointer;
  transition: all 0.15s ease;
}

.sumo-subscription__save-btn:hover {
  background-color: var(--sumo-primary-hover);
  border-color: var(--sumo-primary-hover);
}

.sumo-subscription__save-btn:active {
  background-color: var(--sumo-primary-active);
  border-color: var(--sumo-primary-active);
}

/* Responsive */
@media screen and (max-width: 1024px) {
  .sumo-subscription__components {
    grid-template-columns: repeat(2, 1fr);
  }

  .sumo-subscription__component:nth-child(3n) {
    border-right: 1px solid var(--sumo-gray-100);
  }

  .sumo-subscription__component:nth-child(2n) {
    border-right: none;
  }
}

@media screen and (max-width: 640px) {
  .sumo-subscription__components {
    grid-template-columns: 1fr;
  }

  .sumo-subscription__component {
    border-right: none;
  }

  .sumo-subscription__controls {
    flex-direction: column;
    align-items: stretch;
  }

  .sumo-subscription__actions {
    flex-direction: column;
  }

  .sumo-subscription__cancel-btn,
  .sumo-subscription__save-btn {
    width: 100%;
  }
}
</style>

<script>
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
</script>
