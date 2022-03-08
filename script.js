var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

var max_length = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
var vision_angle =Math.PI/4;
var z = 0;


class Player {
  constructor (x,y,visionAngle) {
    this.x = x;
    this.y = y;
    this.visionAngle = visionAngle;
    this.speed = 7;
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

  }
}

var player = new Player (70,200, vision_angle);

var old_mouse_X=0;

canvas.addEventListener("mousemove", function (e) {
  //player.setPos(e.clientX,e.clientY);
  delta_mouse_X = e.clientX - old_mouse_X;
  if (delta_mouse_X >0) {
    vision_angle+=0.001*delta_mouse_X;
    z+=0.001*delta_mouse_X;
  }
  if (delta_mouse_X <0) {
    vision_angle+=0.001*delta_mouse_X;
    z+=0.001*delta_mouse_X;
  }
  old_mouse_X = e.clientX;
  draw(player.x, player.y);
}, false);

document.addEventListener("keydown", function (e) {
 switch (e.keyCode) {
  case 39:
    vision_angle += 0.05;
    z+=0.05;
  break;
  case 37: 
    vision_angle -= 0.05;
    z-=0.05;
  break; 
  case 87:
    player.setPos(player.x+player.speed*Math.cos(vision_angle-(vision_angle-z)/2 ),
                  player.y+player.speed*Math.sin(vision_angle-(vision_angle-z)/2 ));
  break;
  case 83:
    player.setPos(player.x-player.speed*Math.cos(vision_angle-(vision_angle-z)/2 ),
                  player.y-player.speed*Math.sin(vision_angle-(vision_angle-z)/2 ));
  break;
  case 65:
    player.setPos(player.x+player.speed*Math.cos((vision_angle-(vision_angle-z)/2) + Math.PI/2),
                  player.y+player.speed*Math.sin((vision_angle-(vision_angle-z)/2) + Math.PI/2 ));
  break;
  case 68:
    player.setPos(player.x+player.speed*Math.cos((vision_angle-(vision_angle-z)/2) - Math.PI/2),
                  player.y+player.speed*Math.sin((vision_angle-(vision_angle-z)/2) - Math.PI/2 ));
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

document.addEventListener("load", function () {
  draw(player.x, player.y);
});
