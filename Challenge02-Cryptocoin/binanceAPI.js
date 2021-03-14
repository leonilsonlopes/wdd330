import ls from './lsModel.js';
import cryptoView from './cryptoView.js';

export default class binanceAPI {
    constructor() {
        this.baseURL = "https://api.binance.com";
		this.priceQuery = this.baseURL + "/api/v3/ticker/price";
    }

	callBinanceAPI(apiGet, params) {
		let url = apiGet + params;
		console.log("API Call: " + url);
  		return fetch("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02&latitude=0&longitude=0&maxradiuskm=2000")
    	  .then(function(response) {
       	   if (!response.ok) {
       	       throw Error(response.statusText);
       	   } else {
				console.log("response: " + JSON.stringify(response));
        	    return response.json();
         	 }
     	 })
    	  .catch(function(error) {
        	  console.log(error);
     	 });
	}


	async getPrice(cryptoSymbol){
		let params = "?symbol=" + cryptoSymbol + "USDT";
		let resultSet = await this.callBinanceAPI(this.priceQuery,params);
		return  resultSet;
		
	}
	

}