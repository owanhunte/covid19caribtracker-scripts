const fetch = require("node-fetch");

exports.CovidAPIFetcher = class CovidAPIFetcher {
  constructor() {
    this.endpoints = {
      globalStats: "https://coronavirus-19-api.herokuapp.com/all",
      countryStats: "https://coronavirus-19-api.herokuapp.com/countries"
    };
  }

  async fetchGlobalTotals() {
    try {
      const response = await fetch(this.endpoints.globalStats);
      return response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async fetchCountryStats() {}
};
