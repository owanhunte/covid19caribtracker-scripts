const CovidAPIFetcher = require("./fetchers/covidAPI/fetcher").CovidAPIFetcher;
const CovidAPIUpdater = require("./updaters/dataUpdater").DataUpdater;

exports.WorkerFactory = class WorkerFactory {
  static getFetcher() {
    return new CovidAPIFetcher();
  }

  static getUpdater() {
    return new CovidAPIUpdater();
  }
};
