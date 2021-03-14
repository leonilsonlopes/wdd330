import binanceAPI from './binanceAPI.js';

window.addEventListener("load", () => {
	const myBinanceAPI = new binanceAPI(); 	

	myBinanceAPI.getPrice("BTC");
});