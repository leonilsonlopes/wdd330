import orchestratorController from './orchestratorController.js';

window.addEventListener("load", () => {
	const myOrchControl = new orchestratorController("coinList"); 	

	myOrchControl.startPage();
});