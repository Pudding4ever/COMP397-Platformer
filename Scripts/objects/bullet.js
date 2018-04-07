var objects;
(function (objects) {
    class Bullet extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "bullet");
            this.active = false;
            this.timer = 0;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == false;
            console.log(this.active);
        }
        Update() {
            if (this.active == true) {
                console.log("bullet active and travelling");
                this.alpha = 1;
                this.x = this.x + 3;
                this.timer++;
                if (this.timer > 240) {
                    console.log("bullet deactivated!");
                    this.active = false;
                    this.timer = 0;
                    this.alpha = 0;
                }
            }
        }
    }
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map