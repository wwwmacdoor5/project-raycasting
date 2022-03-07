var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 550;

var max_length = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
var vision_angle =Math.PI/4;
var z = 0;

class Player {
  constructor (x,y,visionAngle) {
    this.x = x;
    this.y = y;
    this.visionAngle = visionAngle;
  }
  setPos (x,y) {
    this.x = x;
    this.y = y;
  }
}

class Field {
  objects = [];
  constructor (width, height) {
    this.width = width;
    this.height = height;
  }

  draw () {
    for obj in this.objects {
      
    }
  }
}

var player = new Player (70,200, vision_angle);



canvas.addEventListener("mousemove", function (e) {
  player.setPos(e.clientX,e.clientY);
  draw(player.x, player.y);
}, false);

document.addEventListener("keydown", function (e) {
 switch (e.keyCode) {
  case 39:
    vision_angle += 0.1;
    z+=0.1;
  break;
  case 37: 
    vision_angle -= 0.1;
    z-=0.1;
  break; 
  case 87: 
  break;
 }

  draw(player.x, player.y);
},false)

 function draw (x,y) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "red"
  context.fillRect(0, 0, 101, 101);
  context.beginPath();
  context.strokeStyle = "black";

  for (var angle = z; angle < vision_angle; angle += 0.03) {
    let length;

    for (length = 0; length < max_length; length++) {
      var length_y = Math.floor(y + Math.sin(angle) * length);
      var length_x = Math.floor(x + Math.cos(angle) * length);
      if ((length_y == 100 && length_x <= 100) || (length_y <= 100 && length_x == 100)) break;
      if ((length_y == canvas.height - 100 && length_x <= 100) || (length_y >= canvas.height - 100 && length_x == 100)) break;
      if ((Math.pow(length_x - 220, 2) + Math.pow(length_y - 180, 2)) <= Math.pow(50, 2)) break;
      if ((length_x <= 450 && length_x >= 320) && (length_y <= (length_x - 100))) break;
    }

    context.moveTo(x, y);
    context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
  }

  context.stroke();
}


