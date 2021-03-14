import orchestrationController from './orchestrationController.js';

window.addEventListener("load", () => {
	const myOrchControl = new orchestrationController(); 	

	myOrchControl.startPage();
});