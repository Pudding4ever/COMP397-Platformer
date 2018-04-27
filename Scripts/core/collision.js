var managers;
(function (managers) {
    class Collision {
        Check(object1, object2) {
            // create two vec2 objects
            let P1 = new math.Vec2(object1.x, object1.y);
            let P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    object2.isColliding = true;
                }
                else {
                    object2.isColliding = false;
                }
            }
        }
        checkforPowerupCollision(object1, object2) {
            let P1 = new math.Vec2(object1.x, object1.y);
            let P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    switch (object2.name) {
                        case "p_ammobox":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.ammo1 = object1.ammo1 + 5;
                                object1.ammo2 = object1.ammo2 + 25;
                                object1.ammo3 = object1.ammo3 + 1;
                                break;
                            }
                        case "p_grenade":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.grenades = object1.grenades + 2;
                                break;
                            }
                        case "p_health":
                            {
                                createjs.Sound.play("heal");
                                object2.isColliding = true;
                                object1.lives = object1.lives + 2;
                                break;
                            }
                        case "p_shield":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.shield = true;
                                object1.shieldflicker = true;
                                break;
                            }
                        case "p_ewpew":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.rapidtimer = 0;
                                object1.rapidfire = true;
                                break;
                            }
                        case "w_rifle":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.ammo2 = object1.ammo2 + 50;
                                break;
                            }
                        case "w_shotgun":
                            {
                                createjs.Sound.play("powerup");
                                object2.isColliding = true;
                                object1.ammo1 = object1.ammo1 + 10;
                                break;
                            }
                        case "levelexit":
                            {
                                createjs.Sound.play("gameover");
                                object2.isColliding = true;
                                break;
                            }
                    }
                }
            }
        }
        checkJumpingEnemy(object1, object2) {
            let P1 = new math.Vec2(object1.x, object1.y);
            let P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    if (object2.name == "player" && object1.name == "jumpingenemy") {
                        object2.isColliding = true;
                    }
                }
            }
        }
        CheckBullet(object1, object2) {
            // create two vec2 objects
            let P1 = new math.Vec2(object1.x, object1.y);
            let P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    if (object1.name == "ebullet") {
                        switch (object2.name) {
                            case "platform":
                                {
                                    object1.isColliding = true;
                                    break;
                                }
                            case "player":
                                {
                                    object1.isColliding = true;
                                    object2.isColliding = true;
                                }
                            default:
                                break;
                        }
                    }
                    if (object1.name != "ebullet") {
                        switch (object2.name) {
                            case "platform":
                                {
                                    object1.isColliding = true;
                                    break;
                                }
                            case "jumpingenemy":
                                {
                                    object1.isColliding = true;
                                    object2.isColliding = true;
                                    break;
                                }
                            case "shootingenemy":
                                {
                                    //console.log("shootingenemy hit!");
                                    object1.isColliding = true;
                                    object2.isColliding = true;
                                    break;
                                }
                            case "flyingenemy":
                                {
                                    object1.isColliding = true;
                                    object2.isColliding = true;
                                    break;
                                }
                        }
                    }
                }
            }
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
/*           switch (object2.name) {
            case "coin":
              if ((object2.alpha != 0) && (object1.alpha != 0)) {

                createjs.Sound.play("coin");
                managers.Game.scoreBoard.Score += 100;
                object2.alpha = 0;

                // add a life power up
                if(managers.Game.scoreBoard.Score % 1000 == 0) {
                  managers.Game.scoreBoard.Lives += 1;
                  createjs.Sound.play("life");
                }

                if (managers.Game.HighScore <= managers.Game.scoreBoard.Score) {
                  managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                  managers.Game.HighScore = managers.Game.scoreBoard.HighScore;
                }
              }
              break;
            case "cloud":
              if(object1.alpha != 0) {
              createjs.Sound.play("explosion");
              managers.Game.scoreBoard.Lives -= 1;

              let explosion = new objects.Explosion();
              explosion.x = object1.x;
              explosion.y = object1.y;
              managers.Game.currentSceneObject.addChild(explosion);
              object1.alpha = 0; // make the plane object invisible
              managers.Game.plane.planeFlash.alpha = 1;
              managers.Game.plane.planeFlash.gotoAndPlay("planeflash");
              }

              break;
          }
        }
      } */
//# sourceMappingURL=collision.js.map