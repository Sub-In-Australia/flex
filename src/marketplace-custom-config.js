/*
 * Marketplace specific configuration.
 */

export const yogaStyles = [
  { key: 'ashtanga', label: 'Ashtanga' },
  { key: 'hatha', label: 'Hatha' },
  { key: 'kundalini', label: 'Kundalini' },
  { key: 'restorative', label: 'Restorative' },
  { key: 'vinyasa', label: 'Vinyasa' },
  { key: 'yin', label: 'Yin' },
];

export const certificate = [
  { key: 'none', label: 'None', hideFromFilters: true, hideFromListingInfo: true },
  { key: '200h', label: 'Registered yoga teacher 200h' },
  { key: '500h', label: 'Registered yoga teacher 500h' },
];

// Price filter configuration
// Note: unlike most prices this is not handled in subunits
export const priceFilterConfig = {
  min: 0,
  max: 1000,
  step: 5,
};

// Activate booking dates filter on search page
export const dateRangeFilterConfig = {
  active: true,
};

// Activate keyword filter on search page

// NOTE: If you are ordering search results by distance the keyword search can't be used at the same time.
// You can turn off ordering by distance in config.js file
export const keywordFilterConfig = {
  active: true,
};

export const customerCommission = 0.05;

export const accountTypes = [{
  key: "childCareWorker",
  labelId: "Config.accountType.childcareWorker",
  role: 'provider'
}, {
  key: "medicalWorker",
  labelId: "Config.accountType.medicalWorker",
  role: 'customer'
}];

export const seekingOrProviding = [{
  key: "providingChildcare",
  labelId: "Config.seekingOrProviding.providing"
}, {
  key: "seekingChildcare",
  labelId: "Config.seekingOrProviding.seeking"
}];

export const highRiskWithCovid19 = [{
  key: "yes",
  labelId: "Config.highRiskWithCovid19.yes"
}, {
  key: "no",
  labelId: "Config.highRiskWithCovid19.no"
}, {
  key: "unsure",
  labelId: "Config.highRiskWithCovid19.unsure"
}];

export const yesNoAnswers = [{
  key: "yes",
  labelId: "Config.yesNoAnswers.yes"
}, {
  key: "no",
  labelId: "Config.yesNoAnswers.no"
}]