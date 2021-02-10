import utilities from './utilities.js';

window.addEventListener("load", () => {
	const listDOMid = "taskList";
	const utils = new utilities(listDOMid); 	

	utils.startPage();
});