var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 550;
var max_length = Math.sqrt(Math.pow(canvas.width, 2) + Math.pow(canvas.height, 2));
var vision_angle = 2*Math.PI;

canvas.addEventListener("mousemove", function(e) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "red"
  context.fillRect(0, 0, 101, 101);
  context.beginPath();
  context.strokeStyle = "black";
  for (var angle = 0.01; angle < vision_angle; angle += 0.03) {
    let length;
    for (length = 0; length < max_length; length++) {
      var length_y = Math.floor(e.clientY + Math.sin(angle) * length);
      var length_x = Math.floor(e.clientX + Math.cos(angle) * length);
      if ((length_y == 100 && length_x <= 100) || (length_y <= 100 && length_x == 100)) break;
      if ((length_y == canvas.height - 100 && length_x <= 100) || (length_y >= canvas.height - 100 && length_x == 100)) break;


      if ((Math.pow(length_x - 220, 2) + Math.pow(length_y - 180, 2)) <= Math.pow(50, 2)) break;

      if ((length_x <= 450 && length_x >= 320) && (length_y <= (length_x - 100))) break;

    }


    context.moveTo(e.clientX, e.clientY);
    context.lineTo(e.clientX + Math.cos(angle) * length, e.clientY + Math.sin(angle) * length);


  }
  context.stroke();

}, false);
