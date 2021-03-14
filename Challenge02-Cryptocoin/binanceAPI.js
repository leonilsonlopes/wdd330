import ls from './lsModel.js';
import cryptoView from './cryptoView.js';

export default class binanceAPI {
    constructor() {
        this.baseURL = "https://api.binance.com";
		this.priceQuery = this.baseURL + "/api/v3/ticker/price";
    }

	async callBinanceAPI(apiGet, params) {
		
  		try {
            const response = await fetch(this.baseURL + apiGet + params);
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                alert(JSON.stringify(response));
                return response.json();
            }
        } catch (error) {
            console.log(error);
        }
	}


	getPrice(cryptoSymbol){
		let params = "?symbol=" + cryptoSymbol + "USDT";
		return this.callBinanceAPI(this.priceQuery,params);
		
	}
	

}