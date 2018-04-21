module scenes {
    export class Play3Scene extends objects.Scene {
    // Private Instance Variables
    //TODO: Game object private variables
    private _sonic: objects.Hero;
    private _platform: objects.Platform;
    //private _badguy: objects.ShootingEnemy;

    private _healthLabel: objects.Label;
    private _weaponLabel: objects.Label;
    private _grenadeLabel: objects.Label;

    private _background: objects.GameObject;

    private _rx: number;
    private _ry: number;

    private EXIT: objects.GameObject;
    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {

      super(assetManager);

this.plan = `
..................................................................................
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###...........................................................###.........
........###.....@.....................................................###.........
........###...........................................................###.........
........#################################################################.........
........#################################################################.........
........#################################################################.........
..................................................................................
..................................................................................`;

      
console.log(this.plan);
this._healthLabel = new objects.Label("Health: x", "18px", "Consolas", "#FF0000", 10, 10, true);
this._weaponLabel = new objects.Label("Pistol", "18px", "Consolas", "#FF0000", 10, 30, true);
this._grenadeLabel = new objects.Label("Grenades", "18px", "Consolas", "#FF0000", 10, 50, true);
this._background = new objects.GameObject(this.assetManager, "backgroundlv3");
this._background.x = 1000;
this._background.y = -10;
this.addChild(this._background);
this.addChild(this._healthLabel);
this.addChild(this._weaponLabel);
this.addChild(this._grenadeLabel);
this.rows = new Array<Array<String>>();
this.rows = this.plan.trim().split("\n").map(l => [...l]); //Splits up the "plan" string into an array of single rows, broken at each new line.
console.log(this.rows);
this.height = this.rows.length;
this.width = this.rows[0].length;
this.stageActors = [];
this.stagePowerups =[];
this.levelPlatforms = new Array<objects.Platform>();

const scale = 25; //size of basic platform block (must be square)

/* const levelChars = {
  ".": "empty", "#": objects.Platform,
  "@": objects.Hero, "e": objects.Enemy//, "E": objects.BigEnemy, "W": objects.Weapon, "P": objects.Powerup
}; //Didn't actually end up using this as originally planned.
*/
this.y = 0;
this.x = 0;

//The below loop breaks up the array of rows into an array of individual characters, then checks the individual characters to create and place objects in the world.
for (let str of this.rows)
{
  this.x = 0;
  if (this.y > 0)
  {
      this.prevrow = this.row;
  }
  this.row = new Array<String>();
  this.row = [...str];
  for (let chr of this.row)
  {
    switch (chr)
    {
      case chr = '.':
      {
          //empty space
      break;
      }

      case chr = '#':
      {
      //place a platform
      //console.log(chr);
      let newplat = new objects.Platform(this.assetManager, this.x*scale, this.y*scale);
          //check adjacency to other platforms
          if (this.prevrow != null && this.prevrow[this.x] == this.row[this.x])
          {
              newplat.blockAbove = true;
              //console.log("blockabove");
          }
          if (this.x > 0 && this.row[this.x] == this.row[this.x-1])
          {
              newplat.blockLeft = true;
              //console.log("blockleft");
          }
          if (this.x < this.row.length && this.row[this.x] == this.row[this.x+1])
          {
              newplat.blockRight = true;
              //console.log("blockright");
          }
          if (newplat.blockAbove&&newplat.blockLeft&&newplat.blockRight)
            {
                //if platform is completely blocked in, don't check it for collisions cause nothing can reach it
                this.addChild(newplat);
            }
            else
            {
                this.levelPlatforms.push(newplat);
                this.addChild(newplat);
            }
    //console.log("Platform placed!");
    break;
      }

      case chr = '@':
      {
          //place the player LAST
          this._rx = this.x*scale;
          this._ry = this.y*scale;
          break;
      }

      case chr = 'X':
      {
          //place the level EXIT
                      let newenemy = new objects.LevelExit(this.assetManager)
                      newenemy.x = this.x*scale;
                      newenemy.y = this.y*scale;
                      this.addChild(newenemy);
                      this.stagePowerups.push(newenemy);
                      this.EXIT = newenemy;
                      console.log("level exit placed!");
          break;
      }

      case chr = 'e':
      {
          //place minor enemy
          let newenemy = new objects.ShootingEnemy(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          newenemy.myScene = this;
          this.addChild(newenemy);
          this.stageActors.push(newenemy);
          console.log("shooting enemy placed!");
          break;
      }

      case chr = 'j':
      {
          let newenemy = new objects.JumpingEnemy(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          newenemy.myScene = this;
          this.addChild(newenemy);
          this.stageActors.push(newenemy);
          console.log("jumping enemy placed!");
          break;
      }

      case chr = 'f':
      {
          //place flying enemy
          let newenemy = new objects.FlyingEnemy(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          newenemy.myScene = this;
          this.addChild(newenemy);
          this.stageActors.push(newenemy);
          console.log("flying enemy placed!");
          break;
      }

      case chr = 'B':
      {
          //place ammobox powerup
                          let newenemy = new objects.PowerupAmmo(this.assetManager)
                          newenemy.x = this.x*scale;
                          newenemy.y = this.y*scale;
                          this.addChild(newenemy);
                          this.stagePowerups.push(newenemy);
                          console.log("ammo powerup placed!");
                          break;
      }

      case chr = '+':
      {
          //place health powerup
          let newenemy = new objects.PowerupHealth(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("health powerup placed!");
          break;
      }

      case chr = 'G':
      {
          let newenemy = new objects.PowerupGrenade(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("grenade powerup placed!");
          break;
      }

      case chr = 'R':
      {
          //place rapid fire powerup
          let newenemy = new objects.PowerupRapidFire(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("rapidfire powerup placed!");
          break;
      }
      
      case chr = 'S':
      {
          //place shield powerup
          let newenemy = new objects.PowerupShield(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("shield powerup placed!");
          break;
      }

      case chr = '2':
      {
          //place rifle powerup
          let newenemy = new objects.WeaponRifle(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("rifle powerup placed!");
          break;
      }

      case chr = '1':
      {
          //place shotgun powerup
          let newenemy = new objects.WeaponShotgun(this.assetManager)
          newenemy.x = this.x*scale;
          newenemy.y = this.y*scale;
          this.addChild(newenemy);
          this.stagePowerups.push(newenemy);
          console.log("shotgun powerup placed!");
          break;
      }

      case chr = '3':
      {
          //place rocket launcher powerup
          break;
      }


      default:
      {
        //empty space
        //If our editor doesn't understand the character it's looking at (not listed above) then it just doesn't put anything there.
        break;
      }

    }
    this.x++;
  }
  this.y++;
}

console.log(this.levelPlatforms);

this.Start();
}

// Private Mathods



// Public Methods
public UpdateLabels()
{
  this._healthLabel.x = this.stage.regX - 200;
  this._healthLabel.y = this.stage.regY + 0;
  this._weaponLabel.x = this.stage.regX - 200;
  this._weaponLabel.y = this.stage.regY + 15;
  this._grenadeLabel.x = this.stage.regX - 200;
  this._grenadeLabel.y = this.stage.regY + 30;

  this._healthLabel.text = "Health: " + this._sonic.lives;
  this._grenadeLabel.text = "Grenades: " + this._sonic.grenades;
  switch(this._sonic.weapontype)
  {
      case this._sonic.weapontype = 0:
      {
          this._weaponLabel.text = "Pistol: ∞";
          break;
      }
      case this._sonic.weapontype = 1:
      {
          this._weaponLabel.text = "Shotgun: " + this._sonic.ammo1;
          break;
      }
      case this._sonic.weapontype = 2:
      {
          this._weaponLabel.text = "Machine Gun: " + this._sonic.ammo2;
          break;
      }
      default:
      {
       break;
      }
  }

}

public UpdateCamera()
{
  this.stage.regX = this._sonic.x - 50;
  this.stage.regY = this._sonic.y - 350;
}


// TODO: Initialize Game Variables and objects
public Start(): void {
  this.Main();
}

//TODO: Call update of game objects
public Update(): void {
  this._sonic.Update();
  this.checkBullets();
  this.checkEnemyBullets();
  //this._badguy.Update();
  this.CheckPlatformCollisions();
  this.CheckEnemyPlatformCollisions();
  this.checkEnemyImpact();
  this.UpdateLabels();
  this.UpdateCamera();
  this.UpdateActors();

  if (this.EXIT.isColliding == true)
  {
      objects.Game.currentScene = config.Scene.PLAY2;
  }

  }

public UpdateActors()
{
for (var a in this.stageActors)
{
  this.stageActors[a].Update();
}
}


public checkBullets()
{
  var b: any;
  var i: number;
  i = 0;
  for (b in this.bulletobjectpool)
  {
      if (this.bulletobjectpool[b].active == true)
      {
      this.bulletobjectpool[b].Update();
      for (var a in this.stageActors)
      {
      this.collisionmanager.CheckBullet(this.bulletobjectpool[b], this.stageActors[a]); //checks bullet collision with all stage actors. collision script will handle determining if a bullet will actually DO anything to the thing it hit
  }
  for (var p in this.levelPlatforms)
  {
      this.collisionmanager.CheckBullet(this.bulletobjectpool[b], this.levelPlatforms[p]);
  }

}
}
}

public checkEnemyBullets()
{
var b: any;
var i: number;
i = 0;
for (b in this.enemybulletobjectpool)
{
  if (this.enemybulletobjectpool[b].active == true)
  {
  this.enemybulletobjectpool[b].Update();
  this.collisionmanager.CheckBullet(this.enemybulletobjectpool[b], this._sonic); //enemy bullets only care if they hit the player
  
  for (var p in this.levelPlatforms)
  {
      this.collisionmanager.CheckBullet(this.enemybulletobjectpool[b], this.levelPlatforms[p]); //or a wall I guess
  }
}
}

}

public checkEnemyImpact()
{
for (let a in this.stageActors)
{
this.collisionmanager.checkJumpingEnemy(this.stageActors[a], this._sonic);
}

for (let p in this.stagePowerups)
{
  this.collisionmanager.checkforPowerupCollision(this._sonic, this.stagePowerups[p]);
  this.stagePowerups[p].Update();
  for (var i = 0; i < this.levelPlatforms.length; i++)
  {
      //console.log("checking enemy " + this.stageActors[a] + "on " + this.levelPlatforms[i]);
      if (this.enemyisOn(this.levelPlatforms[i], this.stagePowerups[p])) 
      {
          this.enemyplaceOn(this.levelPlatforms[i], this.stagePowerups[p]);
          this.stagePowerups[p].currentplatform = this.levelPlatforms[i];
      }
}
}
}

//TODO: Add Game objects to the scene
public Main(): void {

this.addChild(this._platform);
//this.addChild(this._badguy);
this._sonic = new objects.Hero(this.assetManager, 1 * 18);
this.player = this._sonic;
this.addChild(this._sonic);
this._sonic.myScene = this;

this._sonic.x = this._rx;
this._sonic.y = this._ry;
this.collisionmanager = new managers.Collision();
//this._platform = new objects.Platform(this.assetManager);
//this._badguy = new objects.Enemy(this.assetManager);
this.bulletobjectpool = new Array<objects.Bullet>();
for (var i = 0; i < 150; i++)
{
    var b: objects.Bullet;
    b = new objects.Bullet(this.assetManager);
    this.bulletobjectpool.push(b);
    this.addChild(b);
    console.log ("created bullet");
}

this.enemybulletobjectpool = new Array<objects.eBullet>();
for (var i = 0; i < 150; i++)
{
    var eb: objects.eBullet;
      eb = new objects.eBullet(this.assetManager);
    this.enemybulletobjectpool.push(eb);
    this.addChild(eb);
    console.log ("created ebullet");
}

}

public CheckPlatformCollisions()
{
//Checks all platforms in levelPlatforms array for collisions with hero.
//Probably a slow way to do this but I had to find a way to support multiple platforms in the world at once.
  for (var i = 0; i < this.levelPlatforms.length; i++)
  {
      if (this.isOn(this.levelPlatforms[i])) {
          //console.log("isOn:" + this.isOn(this.levelPlatforms[i]));
          //console.log("isFalling:" + this._sonic.isFalling());
          this._sonic.stopHero();
          this.placeOn(this.levelPlatforms[i], this._sonic);
          return;
      }
  }
  if (!this._sonic.isOnGround()) {
      this._sonic.jumpDown();
  }
}

private isOn(platform: objects.Platform):boolean {
  if (!platform.blockAbove) {
      let x = this._sonic.x;
      let y = this._sonic.y;
      let isIn: boolean = x + this._sonic.width / 2 >= platform.x - platform.width / 2 &&
          x - this._sonic.width / 2 <= platform.x + platform.width / 2 &&
          y + this._sonic.height / 2 >= platform.y - platform.height / 2 &&
          y - this._sonic.height / 2 <= platform.y + platform.height / 2;
      return isIn && this._sonic.isFalling();
  }
  return false;
}

private placeOn(platform: objects.Platform, hero: objects.Hero) {
  hero.y = platform.y - platform.height/2 - hero.height/2;
}


//duplicate code for checking enemy collisions cause we're DOING IT THE LAZY WAY
//checkenemyplatformcollisions and enemyison are reversed compared to their player versions cause 

public CheckEnemyPlatformCollisions()
{
  for (var a = 0; a < this.stageActors.length; a++)
  {
     // console.log("checking enemy " + this.stageActors[a]);
  for (var i = 0; i < this.levelPlatforms.length; i++)
  {
      //console.log("checking enemy " + this.stageActors[a] + "on " + this.levelPlatforms[i]);
      if (this.enemyisOn(this.levelPlatforms[i], this.stageActors[a])) {
          this.stageActors[a].stopHero();
          this.enemyplaceOn(this.levelPlatforms[i], this.stageActors[a]);
          this.stageActors[a].currentplatform = this.levelPlatforms[i];
          //console.log(this.stageActors[a]);
          //console.log(this.stageActors[a].currentplatform);
          break;
      }
  }
}
}


private enemyisOn(platform: objects.Platform, enemy: objects.GameObject):boolean
{
  let x = enemy.x;
  let y = enemy.y;
  let isIn: boolean =  x + enemy.width/2 >= platform.x - platform.width/2 &&
      x - enemy.width/2 <= platform.x + platform.width/2 &&
      y + enemy.height/2 >= platform.y - platform.height/2 &&
      y - enemy.height/2 <= platform.y + platform.height/2;
  return isIn; //&& this._sonic.isFalling();
}

private enemyplaceOn(platform: objects.Platform, gameObject: objects.GameObject) {
  gameObject.y = platform.y - platform.height/2 - gameObject.height/2;
}

}
}