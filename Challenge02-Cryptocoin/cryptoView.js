export default class cryptoView {
	
    constructor() {	
		this.tickerCounter = 0;

    }

	renderCryptoList(coinList, divCoinList) {
			coinList.forEach(coin => {
			divCoinList.appendChild(this.renderOneCoin(coin));
		});
	}
  
	renderOneCoin(unitaryCoin) {
		
		this.tickerCounter++
		
		
		console.log("unitary coin: " + JSON.stringify(unitaryCoin));		
		let firstLevelDiv = document.createElement("div");
		firstLevelDiv.classList.add("mt-3");
		
		let secondLevelDiv = document.createElement("div");
		firstLevelDiv.appendChild(secondLevelDiv);
		secondLevelDiv.classList.add("d-flex");
		secondLevelDiv.classList.add("justify-content-between");
		secondLevelDiv.classList.add("align-items-center");
		
			
		let thirdLevelDiv = document.createElement("div");
		secondLevelDiv.appendChild(thirdLevelDiv);
		thirdLevelDiv.classList.add("d-flex");
		thirdLevelDiv.classList.add("flex-row");
		thirdLevelDiv.classList.add("align-items-center");
		
		let secondLevelSpanticker = document.createElement("span");
		secondLevelDiv.appendChild(secondLevelSpanticker);
		secondLevelSpanticker.classList.add("content-text-" + this.tickerCounter);
		secondLevelSpanticker.innerText = unitaryCoin.ticker;
		
		let coinIcon = document.createElement("span");
		thirdLevelDiv.appendChild(coinIcon);
		coinIcon.classList.add("star");
		coinIcon.classList.add("wd-50");
		coinIcon.classList.add("avatar");
		let coinIconImg = document.createElement("img");
		coinIcon.appendChild(coinIconImg);
		coinIconImg.src = "img\\coinIcons\\" + unitaryCoin.ticker + ".png";
		
		let coinNameSpan = document.createElement("span");
		thirdLevelDiv.appendChild(coinNameSpan);
		coinNameSpan.classList.add("innercontent-text");
		coinNameSpan.innerText = unitaryCoin.name;
		
		let coinPriceSpan = document.createElement("span");
		thirdLevelDiv.appendChild(coinPriceSpan);
		coinPriceSpan.classList.add("innercontent-text");
		coinPriceSpan.innerText = "$ " + (Number(unitaryCoin.lastPrice).toFixed(2));
		
		/**
		let contentColumnDiv = document.createElement("div");
		thirdLevelDiv.appendChild(contentColumnDiv);
		contentColumnDiv.classList.add("d-flex");
		contentColumnDiv.classList.add("flex-column");
		contentColumnDiv.setAttribute("data-ticker", unitaryCoin.ticker);
		
		let coinNameSpan = document.createElement("span");
		contentColumnDiv.appendChild(coinNameSpan);
		coinNameSpan.innerText = unitaryCoin.name;
		
		let coinPriceSpan = document.createElement("span");
		contentColumnDiv.appendChild(coinPriceSpan);
		coinPriceSpan.innerText = unitaryCoin.price;
		**/
		
		if(this.tickerCounter >= 3)
			this.tickerCounter = 0;
	
		return firstLevelDiv;
	}
	

}

