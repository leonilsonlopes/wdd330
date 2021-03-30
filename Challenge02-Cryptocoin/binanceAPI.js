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
		resultSet.ticker = cryptoSymbol;
		console.log("result set: " + JSON.stringify(resultSet));
		return  resultSet;
		
		/**
		var start = new Date().getTime();
		while (true) {
    		if ((new Date().getTime() - start) > 100){
    		 	break;
    		}
		}
		
		let resultSet;
		
		if(cryptoSymbol == "BTC")
			resultSet = {"symbol":"BTCUSDT","price":"57894.71000000","ticker":"BTC"};
	
		else if(cryptoSymbol == "LINK")
			resultSet =  {"symbol":"LINKUSDT","price":"27.67920000","ticker":"LINK"};
			
		else if(cryptoSymbol == "ETH")
			resultSet =  {"symbol":"ETHUSDT","price":"1762.61000000","ticker":"ETH"};
			
		else if(cryptoSymbol == "BCH")
			resultSet =  {"symbol":"BCHUSDT","price":"518.33000000","ticker":"BCH"};
			
		else if(cryptoSymbol == "UNI")
			resultSet =  {"symbol":"UNIUSDT","price":"28.90000000","ticker":"UNI"};
			
		else if(cryptoSymbol == "LTC")
			resultSet =  {"symbol":"LTCUSDT","price":"194.96000000","ticker":"LTC"};
			
		else if(cryptoSymbol == "SOL")
			resultSet =  {"symbol":"SOLUSDT","price":"18.26280000","ticker":"SOL"};
			
		else if(cryptoSymbol == "DOGE")
			resultSet =  {"symbol":"DOGEUSDT","price":"0.05427040","ticker":"DOGE"};
			
		else if(cryptoSymbol == "VET")
			resultSet =  {"symbol":"VETUSDT","price":"0.09150000","ticker":"VET"};
			
		else if(cryptoSymbol == "TRX")
			resultSet =  {"symbol":"TRXUSDT","price":"0.06507000","ticker":"TRX"};
			
		else if(cryptoSymbol == "EOS")
			resultSet =  {"symbol":"EOSUSDT","price":"4.26800000","ticker":"EOS"};
			
		else if(cryptoSymbol == "DOT")
			resultSet =  {"symbol":"DOTUSDT","price":"34.38360000","ticker":"DOT"};
			
		else if(cryptoSymbol == "XLM")
			resultSet =  {"symbol":"XLMUSDT","price":"0.40453000","ticker":"XLM"};
			
		else if(cryptoSymbol == "LUNA")
			resultSet =  {"symbol":"LUNAUSDT","price":"18.96400000","ticker":"LUNA"};
			
		else if(cryptoSymbol == "ADA")
			resultSet =  {"symbol":"ADAUSDT","price":"1.21236000","ticker":"ADA"};
			
		else if(cryptoSymbol == "XMR")
			resultSet =  {"symbol":"XMRUSDT","price":"237.73000000","ticker":"XMR"};
			
		else if(cryptoSymbol == "ATOM")
			resultSet =  {"symbol":"ATOMUSDT","price":"19.80000000","ticker":"ATOM"};
			
		else if(cryptoSymbol == "XRP")
			resultSet =  {"symbol":"XRPUSDT","price":"0.56529000","ticker":"XRP"};
			
		else if(cryptoSymbol == "FTT")
			resultSet =  {"symbol":"FTTUSDT","price":"38.23300000","ticker":"FTT"};
			
		else if(cryptoSymbol == "AVAX")
			resultSet =  {"symbol":"AVAXUSDT","price":"29.82600000","ticker":"AVAX"};
			
		else if(cryptoSymbol == "CHZ")
			resultSet =  {"symbol":"CHZUSDT","price":"0.52986000","ticker":"CHZ"};
			
		else if(cryptoSymbol == "XEM")
			resultSet =  {"symbol":"XEMUSDT","price":"0.36310000","ticker":"XEM"};
			
		else if(cryptoSymbol == "THETA")
			resultSet =  {"symbol":"THETAUSDT","price":"13.59480000","ticker":"THETA"};
			
		else if(cryptoSymbol == "BNB")
			resultSet =  {"symbol":"BNBUSDT","price":"272.23170000","ticker":"BNB"};
			
		else if(cryptoSymbol == "AAVE")
			resultSet =  {"symbol":"AAVEUSDT","price":"357.02100000","ticker":"AAVE"};
			
			
		return resultSet;
				
		**/
		
	}
	

}