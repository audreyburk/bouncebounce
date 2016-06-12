function Canvas(){
  let canvas = document.getElementById("myCanvas")
  this.ctx = canvas.getContext("2d");
  this.width = canvas.width;
  this.height = canvas.height;
}
