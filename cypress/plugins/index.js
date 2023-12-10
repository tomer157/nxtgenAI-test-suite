// cypress/plugins/index.js
const { mochawesome } = require('mochawesome');

module.exports = (on, config) => {
  on('task', {
    'mocha:setup'(options) {
      const mochawesomeConfig = {
        reportDir: options.reporterOptions.reportDir,
        overwrite: options.reporterOptions.overwrite,
        html: options.reporterOptions.html,
        json: options.reporterOptions.json,
        timestamp: options.reporterOptions.timestamp,
      };

      return mochawesome.create(cy, mochawesomeConfig);
    },

    'mocha:teardown'() {
      return cy.task('mocha:report:generate');
    },
  });
};
