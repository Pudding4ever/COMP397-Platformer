var objects;
(function (objects) {
    class Enemy extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "badguy");
            this.active = true;
            this.timer = 0;
            this.Start();
        }
        Start() {
            let deltaMeasurer = new core.TimeDeltaMeasurer();
            deltaMeasurer.maxDelta = 40;
            deltaMeasurer.start();
            this.active == true;
            this.x = 530;
            this.y = 460;
            console.log(this.active);
        }
        Update() {
            if (this.active == true) {
                this.alpha = 1;
                //run any AI here
            }
            if (this.isColliding == true) {
                console.log("enemy deactivated!");
                this.active = false;
                this.isColliding = false;
                this.alpha = 0;
            }
        }
        Move() {
            if (objects.Game.keyboardManager.moveLeft) {
                this.x += 5;
            }
            if (objects.Game.keyboardManager.moveRight) {
                this.x -= 5;
            }
        }
    }
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map