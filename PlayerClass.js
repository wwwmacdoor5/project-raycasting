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