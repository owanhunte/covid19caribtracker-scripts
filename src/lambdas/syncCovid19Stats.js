const WorkerFactory = require("../dataWorkers/workerFactory").WorkerFactory;

exports.handler = async () => {
  const fetcher = WorkerFactory.getFetcher();
  const updater = WorkerFactory.getUpdater();

  // Sync global total stats first.
  const globalTotals = await fetcher.fetchGlobalTotals();
  const res = await updater.updateGlobalTotals(globalTotals);
  console.log(res);
};

if (process.env.DEV === "true") {
  exports.handler();
}
