import orchestratorController from './orchestratorController.js';

window.addEventListener("load", () => {
	const myOrchControl = new orchestratorController(); 	

	myOrchControl.startPage();
});