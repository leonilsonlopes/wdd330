export default class coinGeckoAPI {
    constructor() {
        this.baseURL = "https://api.coingecko.com/api/v3";
		this.listAllQuery = this.baseURL + "/coins/list";
		this.lastPriceQuery = this.baseURL + "/simple/price?vs_currencies=usd&ids=";		
		
    }

	async callGeckoAPI(apiGet, params) {
		let url = apiGet + params;
		//console.log("Gecko API Call: " + url);
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


	async getLastPriceHistory(numOfDays, coinId){
		let params = "/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + numOfDays + "&interval=daily";
		try{	
			let resultSet = await this.callGeckoAPI(this.baseURL,params);		
			return  resultSet;
		}catch(err){
			console.log("ERROR CALLING: url: " + this.baseURL + " - params: " + params + "\nError: " + err.message);
			return;
		}		
			
	}
	
	async getCoinInfo(coinId){
		let params = "/coins/" + coinId + "?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false";
		try{	
			let resultSet = await this.callGeckoAPI(this.baseURL,params);
			//console.log("GeckoAPI getCoinInfo: " + JSON.stringify(resultSet));		
			return  resultSet;
		}catch(err){			
			console.log("ERROR CALLING: url: " + this.baseURL + " - params: " + params + "\nError: " + err.message);
			return;
		}		
			
	}
	
	async getPrice(coinId){
				
		try{
			let resultSet = await this.callGeckoAPI(this.lastPriceQuery,coinId);
			resultSet.price = resultSet[coinId].usd;
			console.log("resultSet: " + JSON.stringify(resultSet));
			return  resultSet;
		}catch(err){
			console.log("ERROR CALLING: url: " + this.priceQuery + " - params: " + coinId + "\nError: " + err.message);
			return;
		}
		
	
	}
	

}