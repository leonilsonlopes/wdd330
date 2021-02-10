import ls from './ls.js';
import ToDos from './ToDos.js';

export default class utilities {
    constructor(domIdTaskList) {
        this.myLS = new ls("myLocalStorage");
		this.myToDos = new ToDos();
		this.taskListId = domIdTaskList;
    }


	addNewTask(content){
		this.myLS.addNewArrayElement(content);
		this.showToDoListAll();	
		document.getElementById("todoContent").value = "";		
	}
	
	removeTask(taskId){
		this.myLS.removeArrayElement(taskId);
		this.showToDoListAll();	
	}
	
	completeTask(taskId){
		this.myLS.setCompleteElement(taskId);
		this.showToDoListAll();		
	}
	
	showToDoList(todoList){
		const toDoListElement = document.getElementById(this.taskListId);
		toDoListElement.innerHTML = "";
		this.myToDos.renderToDoList(todoList, toDoListElement);		
		
		/*
		let verbose = document.getElementById("storage");
		let myStorage = this.myLS.getStorage();
		verbose.innerHTML = "";
		for(let i = 0; i < myStorage.length; i++){
			verbose.innerHTML = verbose.innerHTML + JSON.stringify(myStorage[i]) + "</br>";
		}
		*/
	}
	
	showToDoListAll(){
		let myStorage = this.myLS.getStorage();
		this.showToDoList(myStorage);
		
		//Avoid showing message if the list is empty
		(myStorage.length > 0 ? document.getElementById("filterApplied").innerHTML = "Showing all tasks" : "");

	}
	
	showToDoListActive(){
		let myStorage = this.myLS.getStorage();
		myStorage = myStorage.filter(todo => !todo.completed);
		this.showToDoList(myStorage);
		document.getElementById("filterApplied").innerHTML = "Showing only active tasks";
	}
	
	showToDoListCompleted(){
		let myStorage = this.myLS.getStorage();
		myStorage = myStorage.filter(todo => todo.completed);
		this.showToDoList(myStorage);
		document.getElementById("filterApplied").innerHTML = "Showing only completed tasks";
	}
	
	startPage() {
		
		this.showToDoListAll();	
		
		let upperThis = this;
		
		//Click on Add new Task
		document.getElementById("addButton").addEventListener("click", function(){				
				upperThis.addNewTask(document.getElementById("todoContent").value);		
		});	
		
		// Add listener on list to identify list item and close button
		document.getElementById(this.taskListId).addEventListener('click', function(ev) {
			
			//identity task item
  			if (ev.target.tagName == 'LI') {
				upperThis.completeTask(ev.target.getAttribute("data-id"));			
  			}
	
			//identity close button
			if (ev.target.tagName == 'SPAN') {
				upperThis.removeTask(ev.target.getAttribute("data-id"));			
  			}
	
		}, false);


		//Click filter Active
		document.getElementById("active").addEventListener("click", function(){				
				upperThis.showToDoListActive();						
		});	
		
		//Click filter Completed
		document.getElementById("completed").addEventListener("click", function(){				
				upperThis.showToDoListCompleted();	
					
		});	
		
		//Click filter show All
		document.getElementById("showAll").addEventListener("click", function(){				
				upperThis.showToDoListAll();	
						
		});	
	
	
	}
}