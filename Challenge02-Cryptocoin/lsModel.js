// Cryptocoin Object Model
import coinGeckoAPI from './coinGeckoAPI.js';
import orchestratorController from './orchestratorController.js';

export default class lsModel {
  constructor() {
	this.id = "cryptoWatcher";
	
	if(this.isDataBaseReady()){
		//console.log("Local Storage Found");
	}else{
		console.log("Local Storage not found! Building it!")
		
		let initialCryptoDB = [];
		
		let upperThis = this;
		
		let buildDB = async function(){
		
			//the numbers of coins is huge, for this reason I'm selecting the most important ones to work with, instead all available'
			let coinGeckoIdsAcceptedCoins =
			[
				"bitcoin",
				"ethereum",
				"binancecoin",
				"cardano",
				"polkadot",
				"ripple",
				"uniswap",
				"theta-token",
				"litecoin",
				"chainlink",
				"bitcoin-cash",
				"stellar",
				"filecoin",
				"terra-luna",
				"solana"			
			];
			
			let mycoinGeckoAPI = new coinGeckoAPI();
			for(let i=0; coinGeckoIdsAcceptedCoins.length > i; i++){
				
	
				let coinInfoObj = {};
				let apiResult = await mycoinGeckoAPI.getCoinInfo(coinGeckoIdsAcceptedCoins[i]);
				
				coinInfoObj.id = coinGeckoIdsAcceptedCoins[i];
				coinInfoObj.name = apiResult.name;
				coinInfoObj.ticker = (apiResult.symbol).toUpperCase();
				coinInfoObj.lastPrice = "Retrieving...";
				coinInfoObj.description = apiResult.description.en;
				coinInfoObj.homepage = apiResult.links.homepage[0];
				coinInfoObj.image = apiResult.image.small;
				
				initialCryptoDB.push(coinInfoObj);
			}
			
			localStorage.setItem(upperThis.id, JSON.stringify(initialCryptoDB));
			new orchestratorController().showListOfCoins();
			
		}
		
		buildDB();
		

	}
	
  }
  

	getStorage(filter){
		let coinsArray = JSON.parse(localStorage.getItem(this.id));
		//console.log("getStorage - filter: " + filter);
		if(filter != "" && filter != undefined)
			coinsArray = coinsArray.filter(coinObject => ((coinObject.name).toLowerCase()).includes(filter.toLowerCase()) || coinObject.ticker.includes(filter.toUpperCase()));
				
		return coinsArray;
	}
	
	setLastPrice(ticker, lastPrice){
		let myLs = this.getStorage("");		
		let coinIndex = myLs.findIndex(element => element.ticker == ticker);
		//console.log("coinIndex: " + coinIndex + " -- myLs length: " + myLs.length);
		let selectedCoin;
		if(coinIndex >=0 && coinIndex < myLs.length){
			selectedCoin = myLs[coinIndex];
			//console.log("selected coin: " + JSON.stringify(selectedCoin));
			selectedCoin.lastPrice = (Number(lastPrice).toFixed(4))
			//console.log("selected coin after last price: " + JSON.stringify(selectedCoin));
			myLs[coinIndex] = selectedCoin;
			this.comitStorage(myLs);
		}
		
		return;
	
	}		
	
	
	comitStorage(value){
		localStorage.setItem(this.id, JSON.stringify(value));
		return;
	}
	
	getCoinInfo(ticker){
		let myLs = this.getStorage("");		
		let coinIndex = myLs.findIndex(element => element.ticker == ticker);		
		
		if(coinIndex >=0 && coinIndex < myLs.length){
			return myLs[coinIndex];
		}else{
			let notFoundObj = {};
			notFoundObj.ticker = "--";
			notFoundObj.name = "Coin Not Found";
			notFoundObj.lastPrice = 0;
			return notFoundObj;	
		}
		
	}

	isDataBaseReady(){
		if(localStorage.getItem(this.id))
			return true;
		else
			return false;
			
		 
	}


}