import ls from './lsModel.js';
import cryptoView from './cryptoView.js';

export default class binanceAPI {
    constructor() {
        this.baseURL = "https://api.binance.com";
		this.priceQuery = this.baseURL + "/api/v3/ticker/price";
    }

	async callBinanceAPI(apiGet, params) {
		let url = apiGet + params;
		console.log("API Call: " + url);
  		try {
            const response = await fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        } catch (error) {
            console.log(error);
        }
	}


	async getPrice(cryptoSymbol){
		let params = "?symbol=" + cryptoSymbol + "USDT";
		let resultSet = await this.callBinanceAPI(this.priceQuery,params);
		console.log("result set: " + JSON.stringify(resultSet));
		return  resultSet;
		
	}
	

}