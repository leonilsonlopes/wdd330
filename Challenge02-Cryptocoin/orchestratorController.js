import lsModel from './lsModel.js';
import binanceAPI from './binanceAPI.js';
import cryptoView from './cryptoView.js';

export default class utilities {
    constructor(domIdCoinList) {
        this.myBinanceAPI = new binanceAPI();
		this.myCryptoView = new cryptoView();
		this.coinListId = domIdCoinList;
    }


	showListOfCoins(){
		let myStorage = this.myBinanceAPI.getPrice("BTC");

		const coinListElement = document.getElementById(this.coinListId);
		coinListElement.innerHTML = "";
		this.myCryptoView.renderCryptoList(myStorage, coinListElement);	
	}
	
	
	startPage() {
		
		this.showListOfCoins();	
		
	
	}
}