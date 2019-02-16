let canvas;
let particlesNum;
let particles = [];
let maxOpacity;

function setup() {
	canvas = createCanvas(window.innerWidth,window.innerHeight);
  canvas.class("canvas");
  //frameRate(30);
  //background(20,20,20);
  particlesNum = window.innerWidth * window.innerHeight / 30000;


  for(var i = 0; i < particlesNum;i++){
    particles.push(new Particle());
  }

  maxOpacity = 200;
  

}


function draw(){

  background(20,20,20);

  for(var i = 0; i < particles.length;i++){
    
    // if(mouseDist(particles[i]) < 200){
    //   ellipse(mouseX,mouseY,1.5,1.5);
    //   line(particles[i].x,particles[i].y,mouseX,mouseY);
    // }
    
    particles[i].draw();
  }


  for(var i=0 ;i < particles.length;i++){
    for(var j=0 ;j < particles.length;j++){
      if(distance(particles[i],particles[j]) < 200) {
        drawLine(particles[i],particles[j],maxOpacity  - (maxOpacity /200)*distance(particles[i],particles[j]));
      }
    }
  }
}

function Particle(){
  this.x = random(window.innerWidth);
  this.y = random(window.innerHeight);

  this.dx = (1 / random(40,128) * (random(2) -1));
  this.dy = (1 / random(40,128) * (random(2) -1));

  this.draw = function(){
    this.x += this.dx * frameRate();
    this.y += this.dy * frameRate();

    if(this.x >= window.innerWidth || this.x <= 0) this.dx = -this.dx;
    if(this.y >= window.innerHeight || this.y <= 0) this.dy = -this.dy;

    stroke(255,maxOpacity);
    ellipse(this.x,this.y,1.5,1.5);
  }
} 


function distance(p1,p2){
  return sqrt( pow(p1.x-p2.x,2) + pow(p1.y-p2.y,2)); 
}

function drawLine(p1,p2,op) {
  strokeWeight(0.3);
  stroke(255,op);
  line(p1.x,p1.y,p2.x,p2.y);
}

function mouseDist(p1){
  return sqrt( pow(p1.x-mouseX,2) + pow(p1.y-mouseY,2)); 
}