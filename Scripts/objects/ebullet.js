var objects;
(function (objects) {
    class eBullet extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "ebullet");
            this.active = false;
            this.timer = 0;
            this.bullettype = 0;
            this.bulletDirection = 1;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active = false;
            this.alpha = 0;
            ////console.log (this.active);
        }
        ResetBullet() {
            this.active = false;
            this.isColliding = false;
            this.timer = 0;
            this.alpha = 0;
            this.x = -10000;
            this.y = -10000;
        }
        Update() {
            if (this.active == false) {
                this.alpha = 0;
            }
            if (this.isColliding == true && this.active == true) {
                this.ResetBullet();
            }
            else {
                this.isColliding = false;
            }
            if (this.active == true) {
                this.scaleX = 1;
                this.scaleY = 1;
                switch (this.bullettype) {
                    case this.bullettype = 0:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 1:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.y = this.y + 1;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 2:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.y = this.y - 1;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 3:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.y = this.y - 0.5;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 4:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.y = this.y - 1;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 5:
                        {
                            this.alpha = 1;
                            this.scaleX = 0.5;
                            this.scaleY = 4;
                            this.x = this.x;
                            this.y = this.y + 3;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 6:
                        {
                            this.alpha = 1;
                            this.x = this.x;
                            this.y = this.y + 3;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 7:
                        {
                            this.alpha = 1;
                            this.x = this.x + 1;
                            this.y = this.y + 3;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 8:
                        {
                            this.alpha = 1;
                            this.x = this.x - 1;
                            this.y = this.y + 3;
                            this.timer++;
                            break;
                        }
                    default:
                        {
                            this.alpha = 1;
                            this.x = this.x - 5 * this.bulletDirection;
                            this.timer++;
                            break;
                        }
                }
                if (this.timer > 150) {
                    ////console.log ("bullet deactivated!");
                    this.ResetBullet();
                }
                ////console.log ("bullet active and travelling");
            }
        }
    }
    objects.eBullet = eBullet;
})(objects || (objects = {}));
//# sourceMappingURL=ebullet.js.map