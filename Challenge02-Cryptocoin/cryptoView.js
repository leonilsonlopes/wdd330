export default class cryptoView {
    constructor() {

    }

	renderCryptoList(coinList, divCoinList) {
			coinList.forEach(coin => {
			divCoinList.appendChild(this.renderOneCoin(coin));
		});
	}
  
	renderOneCoin(unitaryCoin) {
				
		const item = document.createElement("li");
		
		//Set task id into this list element	
		item.setAttribute("data-id", unitaryCoin.id);
		
		//Render task content
		item.innerHTML = unitaryCoin.symbol + ": " + unitaryCoin.price;
		
		
		return item;
	}
	

}