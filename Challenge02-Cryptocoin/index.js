import orchestratorController from './orchestratorController.js';
import lsModel from './lsModel.js';
window.addEventListener("load", () => {
	const myOrchControl = new orchestratorController("coinList");
	new lsModel();

	myOrchControl.showListOfCoinsPage();
});