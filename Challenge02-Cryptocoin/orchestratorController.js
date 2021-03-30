import binanceAPI from './binanceAPI.js';
import cryptoView from './cryptoView.js';
import lsModel from './lsModel.js';

export default class orchestratorController {
    constructor(domIdCoinList) {
        this.myBinanceAPI = new binanceAPI();
		this.myCryptoView = new cryptoView();
		this.coinListId = domIdCoinList;
		this.myLocalStorage = new lsModel("cryptoWatcher");
		
    }


	async showListOfCoins(){
		
		let acceptedCoins = this.myLocalStorage.getStorage();

		const coinListElement = document.getElementById(this.coinListId);
			this.myCryptoView.renderCryptoList(acceptedCoins, coinListElement);
			
	}
	
	
	async updatePrice(){
		
		//let myMyLocalStorage = this.myLocalStorage;
		let myMyLocalStorage = new lsModel("cryptoWatcher");
		console.log("this.myLocalStorage: " + this.myLocalStorage);
		console.log("myMyLocalStorage: " + JSON.stringify(myMyLocalStorage));
		let acceptedCoins = myMyLocalStorage.getStorage();
		let myMyBinanceAPI = new binanceAPI();
		

	
			for(let i=0; i < acceptedCoins.length; i++){
				
				//console.log("accepted coin: " + acceptedCoins[i.ticker]);
				let queryResult = await myMyBinanceAPI.getPrice(acceptedCoins[i].ticker);
				
				console.log("queryResult: " + JSON.stringify(queryResult));
				
				if(!queryResult)
					continue;
				
				myMyLocalStorage.setLastPrice(acceptedCoins[i].ticker, queryResult.price);
	
				
			}
	
	}

	
	
	startPage() {
		
		this.showListOfCoins();
		
		//setInterval(this.updatePrice, 1000);
		
		this.updatePrice();
	
	}


}