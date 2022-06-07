import Bullet from "./Bullet.js"


class BulletControl {
  /* resposbile for shooting */
  bullets = [];

  waitTime = 0;
  //console.log(this.waitTime);
  // constructor
  constructor(canvas) {
    // the minute bulletControl is called it should be constructed on the canvas it was given  
    this.canvas = canvas;

    this.shoot = this.shoot.bind(this);
    this.isOffScreen = this.isOffScreen.bind(this);
    this.draw = this.draw.bind(this);
    this.getBulletInfo = this.getBulletInfo.bind(this);
    this.destroyBullet = this.destroyBullet.bind(this);
  }

  // x coordinate 
  // y coordinate 
  // speed speed of bullet 
  // hit 
  // delay

  shoot(x, y, speed, hit, delay) {
    //console.log("shooting");
    //console.log(this.waitTime);
    //console.log(this.bullets);
    // will make an array to push bullets inside
    if (this.waitTime <= 0) {
      this.bullets.push(new Bullet(x, y, speed, hit));
      this.waitTime = delay;
    }

    this.waitTime--;

    
  }


  //function to check if bullet is off screen
  isOffScreen(Bullet) { // takes in the bullet in question

    /*Bullet y should be about where the player is when they shot 
      Bullet height should be 15 according to bullet.js 
      if the y-axis is ever less than the bullet height its off screen */

    if (Bullet.y <= -this.canvas.height) { 
      return true;
    }
    else {
        return false;
      }

    
    
  }
  //Making each bullet that is in the array Look the same
  draw(ctx) {
    //console.log(this.bullets.length);
    this.bullets.forEach((Bullet) => {

  //find the specaifc bullet for each bullet created on screen
      if(this.isOffScreen(Bullet)){      
        
        const index = this.bullets.indexOf(Bullet);// the exact bullet that came off the screen
        this.bullets.splice(index,1); //destroying that bullet
      }
      Bullet.draw(ctx)
    });

  }

  getBulletInfo(){ // getter function for collison 
    return this.bullets;
  }
  
  destroyBullet(bulletToDestroy) {
    const bulletIndex = this.bullets.indexOf(bulletToDestroy);
    if (bulletIndex > -1) {
      this.bullets.splice(bulletIndex, 1);
    }
  }





}
export default BulletControl;