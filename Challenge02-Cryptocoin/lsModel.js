// Cryptocoin Object Model
export default class ls {
  constructor(id) {
	this.id = id;
	
	if(localStorage.getItem(this.id)){
		console.log("Local Storage Found");
	}else{
		console.log("Local Storage not found! Building it!")
		
		let initialCryptoDB = [];
		
		let btc = {};
		btc.ticker = "BTC";
		btc.name = "Bitcoin";
		btc.lastPrice = "retrieving data...";
		initialCryptoDB.push(btc);
		
		let eth = {};
		eth.ticker = "ETH";
		eth.name = "Ethereum";
		eth.lastPrice = "retrieving data...";
		initialCryptoDB.push(eth);
		
		let bnb = {};
		bnb.ticker = "BNB";
		bnb.name = "Binance Coin";
		bnb.lastPrice = "retrieving data...";
		initialCryptoDB.push(bnb);
		
		let ada = {};
		ada.ticker = "ADA";
		ada.name = "Cardano";
		ada.lastPrice = "retrieving data...";
		initialCryptoDB.push(ada);
		
		let dot = {};
		dot.ticker = "DOT";
		dot.name = "Polkadot";
		dot.lastPrice = "retrieving data...";
		initialCryptoDB.push(dot);
		
		let xrp = {};
		xrp.ticker = "XRP";
		xrp.name = "XRP";
		xrp.lastPrice = "retrieving data...";
		initialCryptoDB.push(xrp);
		
		let uni = {};
		uni.ticker = "UNI";
		uni.name = "Uniswap";
		uni.lastPrice = "retrieving data...";
		initialCryptoDB.push(uni);
		
		let theta = {};
		theta.ticker = "THETA";
		theta.name = "THETA";
		btc.lastPrice = "retrieving data...";
		initialCryptoDB.push(theta);
		
		let ltc = {};
		ltc.ticker = "LTC";
		ltc.name = "Litecoin";
		ltc.lastPrice = "retrieving data...";
		initialCryptoDB.push(ltc);
		
		let link = {};
		link.ticker = "LINK";
		link.name = "Chainlink";
		link.lastPrice = "retrieving data...";
		initialCryptoDB.push(link);
		
		
		let bch = {};
		bch.ticker = "BCH";
		bch.name = "Bitcoin Cash";
		bch.lastPrice = "retrieving data...";
		initialCryptoDB.push(bch);
		
		let xlm = {};
		xlm.ticker = "XLM";
		xlm.name = "Stellar";
		xlm.lastPrice = "retrieving data...";
		initialCryptoDB.push(xlm);
		

		let fil = {};
		fil.ticker = "FIL";
		fil.name = "Filecoin";
		fil.lastPrice = "retrieving data...";
		initialCryptoDB.push(fil);
		
		let luna = {};
		luna.ticker = "LUNA";
		luna.name = "Terra";
		luna.lastPrice = "retrieving data...";
		initialCryptoDB.push(luna);
		
		let doge = {};
		doge.ticker = "DOGE";
		doge.name = "Dogecoin";
		doge.lastPrice = "retrieving data...";
		initialCryptoDB.push(doge);
		
		let vet = {};
		vet.ticker = "VET";
		vet.name = "VeChain";
		vet.lastPrice = "retrieving data...";
		initialCryptoDB.push(vet);
		
		
		let sol = {};
		sol.ticker = "SOL";
		sol.name = "Solana";
		sol.lastPrice = "retrieving data...";
		initialCryptoDB.push(sol);
		
		localStorage.setItem(this.id, JSON.stringify(initialCryptoDB))
		

	}
	
  }
  
  	addNewArrayElement(content) {
		let list = this.getStorage();
		let task = {"id": new Date().getTime(), "content":content, "completed":false};
		list.push(task);
		localStorage.setItem(this.id, JSON.stringify(list));
   		return;
  	}

	getStorage(){		
		return JSON.parse(localStorage.getItem(this.id));
	}
	
	setLastPrice(ticker, lastPrice){
		let myLs = this.getStorage();		
		let coinIndex = myLs.findIndex(element => element.ticker == ticker);
		console.log("coinIndex: " + coinIndex + " -- myLs length: " + myLs.length);
		let selectedCoin;
		if(coinIndex >=0 && coinIndex < myLs.length){
			selectedCoin = myLs[coinIndex];
			console.log("selected coin: " + JSON.stringify(selectedCoin));
			selectedCoin.lastPrice = lastPrice;
			console.log("selected coin after last price: " + JSON.stringify(selectedCoin));
			myLs[coinIndex] = selectedCoin;
			this.comitStorage(myLs);
		}
		
		return;
	
	}		
	
	
	comitStorage(value){
		localStorage.setItem(this.id, JSON.stringify(value));
		return;
	}

	findElementIndexById(id){
		//find in the array, the index of object with the informed id
		return this.getStorage().findIndex(element => element.id == id);
	}

	setCompleteElement(taskId) {
		//find in the array, the index of object with the informed id
		let taskIndex = this.findElementIndexById(taskId);
		let myStorage = this.getStorage();
		
		//Verify actual state and set the oposite state
		(myStorage[taskIndex].completed ? myStorage[taskIndex].completed = false : myStorage[taskIndex].completed  = true);
		
		//Comit data into Storage
		this.comitStorage(myStorage);
    	return;
	}
	
	removeArrayElement(taskId){
		//Get Array stored
		let list = this.getStorage();
		//Find element in array by taskId
		let index = this.findElementIndexById(taskId);
		//Remove the element
		list.splice(index, 1);
		//Save new array in localStorage
		this.comitStorage(list);
	}
}