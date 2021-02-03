import HikeModel from './HikeModel.js';
import HikesView from './HikesView.js';


alert("HikesController.js is called");

// Hike controller
export default class HikesController {
  constructor(parentId) {
    this.parentElement = document.getElementById(parentId); 
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.hikeModel = new HikeModel();
    this.hikesView = new HikesView(parentId);
  }
  
  showHikeList() {
	const hikeListElement = document.getElementById("hikes");
	hikeListElement.innerHTML = "";
	renderHikeList(this.hikeModel, hikeListElement);
  }

  showOneHike(hikeName) {
    // use this when you need to show just one hike...with full details
    
  }
  addHikeListener() {
    // for the stretch you will need to attach a listener to each of the listed hikes to watch for a touchend. 
   
  }
}