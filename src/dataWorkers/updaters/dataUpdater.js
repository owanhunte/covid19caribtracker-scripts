const fetch = require("node-fetch");

exports.DataUpdater = class DataUpdater {
  constructor() {
    this.globalTotalsContentType = "summary_statistics";
    this.globalTotalsEntityId = "01a5698e-186d-4487-aece-1c91b0e48959";
    this.endpoints = {
      globalTotals: `https://engine.covid19caribtracker.com/api/${this.globalTotalsContentType}/${this.globalTotalsEntityId}`
    };
  }

  async updateGlobalTotals(totals) {
    if (totals) {
      const body = {
        data: {
          type: this.globalTotalsContentType,
          id: this.globalTotalsEntityId,
          attributes: {
            cases: totals.cases,
            deaths: totals.deaths,
            recovered: totals.recovered
          }
        }
      };

      try {
        const response = await fetch(this.endpoints.globalTotals, {
          method: "patch",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Authorization: `Basic ${process.env.AUTH_KEY}`
          }
        });

        return response.json();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async fetchCountryStats() {}
};
