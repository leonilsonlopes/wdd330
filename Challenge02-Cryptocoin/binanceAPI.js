import ls from './lsModel.js';
import cryptoView from './cryptoView.js';

export default class binanceAPI {
    constructor() {
        this.baseURL = "https://api.binance.com/api/v3/ticker/price";
		this.priceQuery = this.baseURL + "/api/v3/ticker/price";
    }

	callBinanceAPI(query, params) {
		
  		return fetch(query + params)
      		.then(function(response) {
          if (!response.ok) {
              throw Error(response.statusText);
          } else {
				alert(response);
              return response.json();
          }
      })
      .catch(function(error) {
          console.log(error);
      });
	}


	getPrice(cryptoSymbol){
		let params = "?symbol=" + cryptoSymbol + "USDT";
		this.callBinanceAPI(this.priceQuery,params)	;
		
	}
	

}