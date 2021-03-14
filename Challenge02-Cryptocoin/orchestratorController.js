import binanceAPI from './binanceAPI.js';
import cryptoView from './cryptoView.js';

export default class orchestratorController {
    constructor(domIdCoinList) {
        this.myBinanceAPI = new binanceAPI();
		this.myCryptoView = new cryptoView();
		this.coinListId = domIdCoinList;
		
    }


	showListOfCoins(){
		
		let acceptedCoins = [
			"BTC", 
			"ETH", 
			"BNB", 
			"ADA", 
			"DOT", 
			"XRP", 
			"UNI", 
			"LTC", 
			"LINK", 
			"BCH", 
			"XLM", 
			"DOGE", 
			"THETA", 
			"LUNA", 
			"AAVE", 
			"VET", 
			"XMR", 
			"ATOM",
			"EOS",
			"SOL",
			"AVAX",
			"FTT",
			"TRX",
			"CHZ",
			"XEM",			
			];
		
		for(let i=0; i < acceptedCoins.length; i++){
			
			let queryResult = this.myBinanceAPI.getPrice(acceptedCoins[1]);

			const coinListElement = document.getElementById(this.coinListId);
			coinListElement.innerHTML = "";
			this.myCryptoView.renderCryptoList([queryResult], coinListElement);
		}
			
	}
	
	
	startPage() {
		
		this.showListOfCoins();	
		
	
	}
}