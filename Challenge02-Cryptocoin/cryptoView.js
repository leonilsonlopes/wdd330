export default class cryptoView {
    constructor() {

    }

	renderCryptoList(coinList, divCoinList) {
			coinList.forEach(coin => {
			divCoinList.appendChild(this.renderOneCoin(coin));
		});
	}
  
	renderOneCoin(unitaryCoin) {
		console.log("unitary coin: " + JSON.stringify(unitaryCoin));		
		const item = document.createElement("li");
		
		//Set task id into this list element	
		item.setAttribute("data-id", unitaryCoin.id);
		
		console.log("coin attributes: " + unitaryCoin.symbol + ": " + unitaryCoin.price);
		//Render task content
		item.innerHTML = unitaryCoin.symbol + ": " + unitaryCoin.price;
		
		
		return item;
	}
	

}