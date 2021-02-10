export default class ToDos {
    constructor() {

    }

	renderToDoList(todoList, divToDoList) {
			todoList.forEach(todo => {
			divToDoList.appendChild(this.renderOneTask(todo));
		});
	}
  
	renderOneTask(todoElement) {
		const item = document.createElement("li");
		
		//Render checked item
		(todoElement.completed ? item.className = 'checked' : "");
		//Set task id into this list element	
		item.setAttribute("data-id", todoElement.id);
		//Render task content
		item.innerHTML = todoElement.content;
		
		//Render close button
		item.appendChild(this.createCloseButton(todoElement.id));
		
		return item;
	}
	
	createCloseButton(id){
		const closeBt = document.createElement("span");
		closeBt.className = "close";
		closeBt.innerHTML = "X";
		closeBt.setAttribute("data-id", id);
		return closeBt;
	}
}