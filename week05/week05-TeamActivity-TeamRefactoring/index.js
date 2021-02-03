import HikesController from 'HikesController.js';

alert("Index.js is called");

window.addEventListener("load", () => {
  HikesController.showHikeList();
});

