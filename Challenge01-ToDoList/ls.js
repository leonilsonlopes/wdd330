// ToDo Object Model
export default class ls {
  constructor(id) {
	this.id = id;
	const arr = [];
	localStorage.setItem(this.id, JSON.stringify(arr));
	
  }
  
  	addNewArrayElement(content) {
		let list = this.getStorage();
		let task = {"id": new Date().getTime(), "content":content, "completed":false};
		list.push(task);
		localStorage.setItem(this.id, JSON.stringify(list));
   		return;
  	}

	getStorage(){
		//Get string from storage and parse it
		return JSON.parse(localStorage.getItem(this.id));
	}
	
	comitStorage(value){
		localStorage.setItem(this.id, JSON.stringify(value));
		return;
	}

	findElementIndexById(id){
		//find in the array, the index of object with the informed id
		return this.getStorage().findIndex(element => element.id == id);
	}

	setCompleteElement(taskId) {
		//find in the array, the index of object with the informed id
		let taskIndex = this.findElementIndexById(taskId);
		let myStorage = this.getStorage();
		
		//Verify actual state and set the oposite state
		(myStorage[taskIndex].completed ? myStorage[taskIndex].completed = false : myStorage[taskIndex].completed  = true);
		
		//Comit data into Storage
		this.comitStorage(myStorage);
    	return;
	}
	
	removeArrayElement(taskId){
		//Get Array stored
		let list = this.getStorage();
		//Find element in array by taskId
		let index = this.findElementIndexById(taskId);
		//Remove the element
		list.splice(index, 1);
		//Save new array in localStorage
		this.comitStorage(list);
	}
}