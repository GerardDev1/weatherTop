import { stationStore } from "../models/station-store.js";
import { reportStore } from "../models/report-store.js";

export const stationController = {

  async index(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const viewData = {
      title: "Station",
      station: station,
    };
    response.render("station-view", viewData);
  },

  async addReport(request, response) {
    const station = await stationStore.getStationById(request.params.id);
    const newReport = {
      code: request.body.code,
      temp: request.body.temp,
      windspeed: request.body.windspeed,
      winddirection: request.body.winddirection,
      pressure: request.body.pressure,
    };
    console.log(`adding report ${newReport.code}`);
    await reportStore.addReport(station._id, newReport);
    response.redirect("/station/" + station._id);
  },

  async deleteReport(request, response) {
    const stationId = request.params.stationid;
    const reportId = request.params.reportid;
    console.log(`Deleting Report ${reportId} from Station ${stationId}`);
    await reportStore.deleteReport(request.params.reportId);
    response.redirect("/station/" + stationId);
  },
};
