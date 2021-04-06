import coinGeckoAPI from './coinGeckoAPI.js';
export default class cryptoView {
	
    constructor(orchestratorClass) {	
		this.tickerCounter = 0;
		this.orchClass = orchestratorClass;

    }

	renderCryptoListDiv(){
		let baseDiv = document.getElementById("pageContent");
		baseDiv.innerHTML = "";		
		
		//add searchlist div
		let searchCoinDiv = document.createElement("div");
		baseDiv.appendChild(searchCoinDiv);
		searchCoinDiv.classList.add("mt-3");
		searchCoinDiv.classList.add("inputs");
		let searchCoinI = document.createElement("i");
		searchCoinDiv.appendChild(searchCoinI);
		searchCoinI.classList.add("fa");
		searchCoinI.classList.add("fa-search");
		let searchCoinInput = document.createElement("input");
		searchCoinDiv.appendChild(searchCoinInput);
		searchCoinInput.id = "filterInput";
		searchCoinInput.type = "text";
		searchCoinInput.classList.add("form-control");
		searchCoinInput.placeholder = "Filter coin by name or ticker...";
		
		//add CoinList Div
		let coinListDiv = document.createElement("div");
		baseDiv.appendChild(coinListDiv);
		coinListDiv.id = "coinList";
		
		//add loading icon
		baseDiv.appendChild(this.renderLoadingIcon(baseDiv));
		
	}
	
	renderLoadingIcon(parentDiv){
		let loadingDiv = document.createElement("div");
		parentDiv.appendChild(loadingDiv);
		loadingDiv.id = "loadingIconDiv";
		loadingDiv.classList.add("spinner-border");
		loadingDiv.classList.add("loadingIcon");
		loadingDiv.role = "status";
		let loadingSpan = document.createElement("span");
		loadingDiv.appendChild(loadingSpan);
		loadingSpan.classList.add("sr-only");
		loadingSpan.innerText = "Loadin...";
		
		return loadingDiv;
	}
	
	clearLoadingIcon(){
		let loadingDiv = document.getElementById("loadingIconDiv");
		loadingDiv.remove();
	}
	
	renderCryptoList(coinList, divCoinList) {
			coinList.forEach(coin => {
			divCoinList.appendChild(this.renderOneCoin(coin));
		});
		
		if(document.getElementById("loadingIconDiv") != null)
			this.clearLoadingIcon();
	}
  
	renderOneCoin(unitaryCoin) {
		
		this.tickerCounter++
		
		
		//console.log("unitary coin: " + JSON.stringify(unitaryCoin));		
		let firstLevelDiv = document.createElement("div");
		firstLevelDiv.classList.add("mt-3");
		
		let secondLevelDiv = document.createElement("div");
		firstLevelDiv.appendChild(secondLevelDiv);
		secondLevelDiv.classList.add("d-flex");
		secondLevelDiv.classList.add("justify-content-between");
		secondLevelDiv.classList.add("align-items-center");
		let upperThis = this;
		secondLevelDiv.addEventListener("click", function(){
		    upperThis.renderTickerDetail(unitaryCoin);
		}, false);
		
			
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
		//coinIconImg.src = "img\\coinIcons\\" + unitaryCoin.ticker + ".png";
		coinIconImg.src = unitaryCoin.image;
		
		let coinNameSpan = document.createElement("span");
		thirdLevelDiv.appendChild(coinNameSpan);
		coinNameSpan.classList.add("innercontent-text");
		coinNameSpan.innerText = unitaryCoin.name;
		
		let coinPriceSpan = document.createElement("span");
		thirdLevelDiv.appendChild(coinPriceSpan);
		coinPriceSpan.classList.add("innercontent-text");
		coinPriceSpan.id = "lastPrice-" + unitaryCoin.ticker;
		coinPriceSpan.innerText = "$ " + unitaryCoin.lastPrice;
		
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
	
	async updatePriceUnitaryCoin(coinTicker, lastPrice){
		//console.log("update Price - CoinTicker: " + coinTicker + " -- Price: " + lastPrice);
		let priceSpan = document.getElementById("lastPrice-" + coinTicker);
		priceSpan.innerHTML = "$ " + lastPrice;
	}
	
	
	async renderTickerDetail(unitaryCoin){
		let baseDiv = document.getElementById("pageContent");
		baseDiv.innerHTML = ""; 
		
		let containerDiv = document.createElement("div");
		baseDiv.appendChild(containerDiv);
		containerDiv.classList.add("container");
		containerDiv.classList.add("my-4");
		
		
		////////////////////////////////add return button
		let buttonReturn = document.createElement("button");
		containerDiv.appendChild(buttonReturn);
		buttonReturn.classList.add("btn");
		buttonReturn.classList.add("btn-primary");
		buttonReturn.type = "button";
		buttonReturn.innerText = "Return to Crypto list";
		let upperThis = this;
		buttonReturn.addEventListener("click", function(){			
			upperThis.orchClass.showListOfCoinsPage();			
		}, false);
		//////////////////////////////////////////
		
		//add loading icon
		baseDiv.appendChild(this.renderLoadingIcon(baseDiv));
		

		//Price Variation History Chart Rendering - Title
		let historyChartP = document.createElement("p");
		containerDiv.appendChild(historyChartP);
		historyChartP.innerText = unitaryCoin.name + " price variation in the last 30 days.";
		historyChartP.classList.add("font-weight-bold");
		historyChartP.classList.add("chartTitle");
				
		//call Prices history from coinGecko
		let resultSet = await new coinGeckoAPI().getLastPriceHistory("30", unitaryCoin.id);
		
		//prepare data
		let prices = [];
		let dates = [];	
		let volumes = [];	
		for(let i=0; i< resultSet.prices.length; i++){
			dates.push((new Date(resultSet.prices[i][0]).toDateString()));
			prices.push(resultSet.prices[i][1]);
		}
		
		for(let i=0; i< resultSet.total_volumes.length; i++){			
			volumes.push(resultSet.total_volumes[i][1]);
		}

		//Price variation History Chart building
		let graphDiv = document.createElement("div");
		containerDiv.appendChild(graphDiv);
		let graphCanvas = document.createElement("canvas");
		graphDiv.appendChild(graphCanvas);
		graphCanvas.id = "priceHistoryChart";
		
		
		let ctxL = document.getElementById("priceHistoryChart").getContext('2d');
		let myLineChart = new Chart(ctxL, {
			type: 'line',
		    data: {
				labels: dates,
		      	datasets: [{
		          	label: "Price in USD",
		          	data: prices,
		          	backgroundColor: [
		            	'rgba(105, 0, 132, .2)',
		          	],
		          	borderColor: [
		            	'rgba(200, 99, 132, .7)',
		          	],
		          	borderWidth: 2
		        	},
		      /**  {
		          label: "My Second dataset",
		          data: [28, 48, 40, 19, 86, 27, 90],
		          backgroundColor: [
		            'rgba(0, 137, 132, .2)',
		          ],
		          borderColor: [
		            'rgba(0, 10, 130, .7)',
		          ],
		          borderWidth: 2
		        } **/
		      ]
		    },
		    options: {
		      responsive: true
		    }
		  });


		//Render Volume Chart Title
		let volumeChartP = document.createElement("p");
		containerDiv.appendChild(volumeChartP);
		volumeChartP.innerText = unitaryCoin.name + " total volume variation in the last 30 days.";
		volumeChartP.classList.add("font-weight-bold");
		volumeChartP.classList.add("chartTitle");
		
		//Volume variation Chart building
		let graphVolume = document.createElement("div");
		containerDiv.appendChild(graphVolume);
		let graphCanvasVolume = document.createElement("canvas");
		graphVolume.appendChild(graphCanvasVolume);
		graphCanvasVolume.id = "volumeChart";
		
		let volumeElement = document.getElementById("volumeChart").getContext('2d');
		let myVolumeChart = new Chart(volumeElement, {
			type: 'bar',
		    data: {
			  labels: dates,
			  datasets: [{
			    label: 'Total Volume in USD',
			    data: volumes,
			    backgroundColor: [
			      'rgba(255, 99, 132, 0.2)',
			      'rgba(255, 159, 64, 0.2)',
			      'rgba(255, 205, 86, 0.2)',
			      'rgba(75, 192, 192, 0.2)',
			      'rgba(54, 162, 235, 0.2)',
			      'rgba(153, 102, 255, 0.2)',
			      'rgba(201, 203, 207, 0.2)'
			    ],
			    borderColor: [
			      'rgb(255, 99, 132)',
			      'rgb(255, 159, 64)',
			      'rgb(255, 205, 86)',
			      'rgb(75, 192, 192)',
			      'rgb(54, 162, 235)',
			      'rgb(153, 102, 255)',
			      'rgb(201, 203, 207)'
			    ],
			    borderWidth: 1
			  }]
			 },
		    options: {
		      scales: {
			      y: {
			        beginAtZero: true
			      }
			    }
		    }
		  });
		
		//Render Description Title
		let descTitleP = document.createElement("p");
		containerDiv.appendChild(descTitleP);
		descTitleP.innerText = unitaryCoin.name + " description:";
		descTitleP.classList.add("font-weight-bold");
		descTitleP.classList.add("chartTitle");
		
		//Render Description body
		let descContentP = document.createElement("p");
		containerDiv.appendChild(descContentP);
		descContentP.innerHTML = (unitaryCoin.description).replaceAll("\r\n","<br/>");
		descContentP.classList.add("chartTitle");
		
		//remove loading Icon
		if(document.getElementById("loadingIconDiv") != null)
			this.clearLoadingIcon();
		
	}
	

	

}

