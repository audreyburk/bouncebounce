function Canvas(){
  let canvas = document.getElementById("myCanvas")
  this.ctx = canvas.getContext("2d");
  this.ctx.globalAlpha = 0.7;
  this.width = canvas.width;
  this.height = canvas.height;
}
