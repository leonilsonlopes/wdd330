import HikesController from './HikesController.js'
const hikes = new HikesController('hikes');
window.addEventListener("load", () => {
    hikes.showHikeList();
  });