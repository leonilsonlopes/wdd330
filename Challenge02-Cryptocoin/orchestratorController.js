import binanceAPI from './binanceAPI.js';
import cryptoView from './cryptoView.js';
import lsModel from './lsModel.js';

export default class orchestratorController {
	
    constructor(domIdCoinList) {
		this.myCryptoView = new cryptoView();
		this.myLsModel = new lsModel(this);
		this.coinListId = domIdCoinList;
		
		this.intervalUpdatePriceDB;
		this.intervalUpdatePriceOnPage;
		this.intervalShowListOfCoins;
			
    }


	showListOfCoins(){
				
		if(this.myLsModel.isDataBaseReady() && document.getElementById("filterInput") != null){					
			let acceptedCoins = this.myLsModel.getStorage(document.getElementById("filterInput").value);		
			const coinListElement = document.getElementById("coinList");
			coinListElement.innerHTML = "";
			new cryptoView(this).renderCryptoList(acceptedCoins, coinListElement);			
		}
	}
	
	
	async updatePriceDB(){
		
		let myMyLocalStorage = new lsModel();
		
		
		if(myMyLocalStorage.isDataBaseReady()){
		
			let acceptedCoins = myMyLocalStorage.getStorage();
			let myMyBinanceAPI = new binanceAPI();
	
	
		
				for(let i=0; i < acceptedCoins.length; i++){
					
					//console.log("accepted coin: " + acceptedCoins[i.ticker]);
					let queryResult = await myMyBinanceAPI.getPrice(acceptedCoins[i].ticker);
					
					//console.log("queryResult: " + JSON.stringify(queryResult));
					
					if(!queryResult)
						continue;
					
					myMyLocalStorage.setLastPrice(acceptedCoins[i].ticker, queryResult.price);
		
					
				}
			
			}
	
	}
	

	async updatePricesOnPage(){
		
		let myLsModel = new lsModel();
		if(myLsModel.isDataBaseReady() && document.getElementById("filterInput") != null){
			let acceptedCoins = myLsModel.getStorage(document.getElementById("filterInput").value);
		
			for(let i=0; i < acceptedCoins.length; i++){				
					await new cryptoView().updatePriceUnitaryCoin(acceptedCoins[i].ticker, acceptedCoins[i].lastPrice);				
			}
		}
	}
	
	
	
	showListOfCoinsPage() {
		
		//Render CryptoList Page
		this.myCryptoView.renderCryptoListDiv();
		
		//Enable "this" inside addEventListener functions
		let upperThis = this;
		
		//Enable filter
		document.getElementById("filterInput").addEventListener("keyup", function(){				
				//console.log("filter: " + document.getElementById("filterInput").value);		
				upperThis.showListOfCoins();
		});
		
				
		
		//Updates or creates prices info on DB
		this.updatePriceDB();
		//Independently updates price info on DB each 3 seconds
		this.intervalUpdatePriceDB = setInterval(this.updatePriceDB, 3000);			
		
		
		//Render prices on page
		this.showListOfCoins();
		
				
		//Independently render new prices updates on page		
		this.intervalUpdatePriceOnPage = setInterval(this.updatePricesOnPage, 3000);
		
				
	
	}
	


}