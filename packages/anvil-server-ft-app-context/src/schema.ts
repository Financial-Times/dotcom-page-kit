export default {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  title: 'FT App Context Schema',
  properties: {
    abTestState: {
      type: 'string',
      description: 'The A/B test flags data as a comma delimited string',
      examples: ['subscriberCohort:on,premiumCohort:on,nonUSACohort:on'],
      pattern: '^([0-9A-Za-z]+:[0-9A-Za-z]+,?)+$'
    },
    appName: {
      type: 'string',
      description: 'The name of the application',
      examples: ['front-page', 'stream-page', 'article-page'],
      pattern: '^.+$'
    },
    appVersion: {
      type: 'string',
      description: 'The running version of the app (usually a Git commit hash)',
      examples: ['882797258625531f20d604f6441ef8cfcb2d772b'],
      pattern: '^.+$'
    },
    conceptId: {
      type: 'string',
      description: 'The UUID of the concept on the current page',
      examples: ['c5935758-7730-11e9-bbad-7c18c0ea0201'],
      pattern: '^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$'
    },
    conceptType: {
      type: 'string',
      description: 'The type of concept on the current page',
      examples: ['http://www.ft.com/ontology/product/Brand', 'http://www.ft.com/ontology/Location'],
      pattern: '^http://www.ft.com/ontology/.+$'
    },
    contentId: {
      type: 'string',
      description: 'The UUID of the content on the current page',
      examples: ['c5935758-7730-11e9-bbad-7c18c0ea0201'],
      pattern: '^[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}$'
    },
    contentType: {
      type: 'string',
      description: 'The type or sub-type of the content on the current page',
      examples: ['article', 'video', 'audio', 'podcast', 'package'],
      pattern: '^(article|video|audio|podcast|package)$'
    },
    edition: {
      type: 'string',
      description: 'The selected FT edition',
      examples: ['uk', 'international'],
      pattern: '^(uk|international)$'
    },
    isProduction: {
      type: 'boolean',
      description: 'If the app is currently running in a production environment',
      default: false
    },
    product: {
      type: 'string',
      description: 'The product name',
      default: 'next',
      pattern: '^.+$'
    },
    publishReference: {
      type: 'string',
      description: 'The publish reference of the content on the current page',
      examples: ['tid_17wmwszvk3'],
      pattern: '^tid_.+$'
    }
  }
}
