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
  		return fetch(url)
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