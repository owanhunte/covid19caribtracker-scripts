const fetch = require("node-fetch");

exports.DataUpdater = class DataUpdater {
  constructor() {
    this.globalTotalsContentType = "summary_statistics";
    this.globalTotalsEntityId = "01a5698e-186d-4487-aece-1c91b0e48959";
    this.endpoints = {
      globalTotals: `https://engine.covid19caribtracker.com/api/${this.globalTotalsContentType}/${this.globalTotalsEntityId}`,
      countryStats:
        "https://engine.covid19caribtracker.com/api/node/case_statistic"
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

  async updateCountryStats(stats) {
    if (stats) {
      try {
        const response = await fetch(this.endpoints.countryStats);
        const result = await response.json();

        return Promise.all(
          result.data.map(async item =>
            this.updateSingleCountryStats(item, stats[item.attributes.country])
          )
        );
      } catch (error) {
        console.error(error);
      }
    }
  }

  async updateSingleCountryStats(entity, newStats) {
    const body = {
      data: {
        type: "node--case_statistic",
        id: entity.id,
        attributes: {
          cases: newStats.cases,
          deaths: newStats.deaths,
          recovered: newStats.recovered,
          today_cases: newStats.todayCases,
          today_deaths: newStats.todayDeaths,
          critical: newStats.critical,
          active_cases: newStats.active,
          total_cases_1m_pop: newStats.casesPerOneMillion,
          total_deaths_1m_pop: newStats.deathsPerOneMillion
        }
      }
    };

    try {
      const response = await fetch(
        `${this.endpoints.countryStats}/${entity.id}`,
        {
          method: "patch",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            Authorization: `Basic ${process.env.AUTH_KEY}`
          }
        }
      );

      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
};
