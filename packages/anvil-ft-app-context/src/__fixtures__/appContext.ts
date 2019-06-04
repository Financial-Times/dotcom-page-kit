export const appContext = {
  appName: 'article',
  appVersion: '882797258625531f20d604f6441ef8cfcb2d772b',
  edition: 'uk',
  product: 'next',
  abTestState: 'subscriberCohort:on,premiumCohort:on,nonUSACohort:on',
  contentId: 'c5935758-7730-11e9-bbad-7c18c0ea0201',
  contentType: 'article',
  conceptId: 'c5935738-7730-11e9-bbad-7c18c0ea8201',
  conceptType: 'http://www.ft.com/ontology/Location',
  isProduction: true,
  publishReference: 'tid_17wmwszvk3'
}

// For testing the 'open ended' aspect of the app context
export const appContextWithExtras = {
  ...appContext,
  fooProp: 'foo',
  barProp: 'bar'
}
