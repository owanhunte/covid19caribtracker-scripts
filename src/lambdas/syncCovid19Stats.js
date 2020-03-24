const WorkerFactory = require("../dataWorkers/workerFactory").WorkerFactory;

exports.handler = async () => {
  const fetcher = WorkerFactory.getFetcher();
  const updater = WorkerFactory.getUpdater();

  // Sync global total stats first.
  const globalTotals = await fetcher.fetchGlobalTotals();
  await updater.updateGlobalTotals(globalTotals);

  // Sync country stats now.
  const countryStats = await fetcher.fetchCountryStats();
  await updater.updateCountryStats(countryStats);
};

if (process.env.DEV === "true") {
  exports.handler();
}
