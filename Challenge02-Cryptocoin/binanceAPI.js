import ls from './lsModel.js';
import cryptoView from './cryptoView.js';

export default class binanceAPI {
    constructor() {
        this.baseURL = "https://api.binance.com";
		this.priceQuery = this.baseURL + "/api/v3/ticker/price";
    }

	async callBinanceAPI(apiGet, params) {
		
  		try {
			let url = apiGet + params;
			console.log("API Call: " + url)
            const response = fetch(url);
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                console.log("response: " + JSON.stringify(response));
                return response.json();
            }
        } catch (error) {
            console.log(error);
        }
	}


	getPrice(cryptoSymbol){
		let params = "?symbol=" + cryptoSymbol + "USDT";
		return await this.callBinanceAPI(this.priceQuery,params);
		
	}
	

}