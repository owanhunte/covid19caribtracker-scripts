const WorkerFactory = require("../dataWorkers/workerFactory").WorkerFactory;

exports.handler = async () => {
  const fetcher = WorkerFactory.getFetcher();
  const updater = WorkerFactory.getUpdater();

  // Sync global total stats first.
  const globalTotals = await fetcher.fetchGlobalTotals();
  await updater.updateGlobalTotals(globalTotals);
};

if (process.env.DEV === "true") {
  exports.handler();
}
