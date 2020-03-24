const fetch = require("node-fetch");
const caribbeanCountries = require("./countries").caribbeanCountries;

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

  async fetchCountryStats() {
    try {
      const response = await fetch(this.endpoints.countryStats);
      const data = await response.json();
      let filtered = {};

      if (data) {
        const countriesMap = caribbeanCountries.reduce(
          (accumulator, currentValue) => {
            const key =
              currentValue.covidAPIName !== undefined &&
              currentValue.covidAPIName !== null
                ? currentValue.covidAPIName
                : currentValue.name;
            accumulator[key] = { ...currentValue };
            return accumulator;
          },
          {}
        );

        data.forEach(element => {
          if ({}.hasOwnProperty.call(countriesMap, element.country)) {
            filtered[countriesMap[element.country].isoCode.toLowerCase()] = {
              country: countriesMap[element.country].name,
              cases: element.cases,
              todayCases: element.todayCases,
              deaths: element.deaths,
              todayDeaths: element.todayDeaths,
              recovered: element.recovered,
              active: element.active,
              critical: element.critical,
              casesPerOneMillion: element.casesPerOneMillion,
              deathsPerOneMillion: element.deathsPerOneMillion
            };
          }
        });
      }
      return filtered;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};
