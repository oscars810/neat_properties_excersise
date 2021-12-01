import { simulateData } from "./utils";
import Analitycs from "./analitycs";

const analitycsSystem = new Analitycs();
var date1 = new Date("March 13, 2020");
var date2 = new Date("November 28, 2020");
var data = simulateData();
const portfolio1 = data[0];

analitycsSystem.Profit(portfolio1, date1, date2);
var date1 = new Date("March 13, 2020");
var date2 = new Date("November 28, 2020");
analitycsSystem.IdealProfit(portfolio1, date1, date2);
