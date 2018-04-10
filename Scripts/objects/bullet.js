var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "bullet");
            this.active = false;
            this.timer = 0;
            this.bullettype = 0;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == false;
            //console.log (this.active);
        }
        Update() {
            if (this.active == true) {
                switch (this.bullettype) {
                    case this.bullettype = 0:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 1:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.y = this.y + 0.5;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 2:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.y = this.y + 1;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 3:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.y = this.y - 0.5;
                            this.timer++;
                            break;
                        }
                    case this.bullettype = 4:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.y = this.y - 1;
                            this.timer++;
                            break;
                        }
                    default:
                        {
                            this.alpha = 1;
                            this.x = this.x + 8;
                            this.timer++;
                            break;
                        }
                }
                if (this.timer > 240) {
                    //console.log ("bullet deactivated!");
                    this.active = false;
                    this.timer = 0;
                    this.alpha = 0;
                }
                //console.log ("bullet active and travelling");
            }
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map