var objects;
(function (objects) {
    class PowerupRapidFire extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "p_ewpew");
            this.Start();
        }
        Start() {
            this.alpha = 1;
        }
        Update() {
            if (this.isColliding == true) {
                this.Reset();
            }
        }
        Reset() {
            console.log("powerup reset");
            this.alpha = 0;
            this.x = -10000;
            this.y = -10000;
            this.isColliding = false;
        }
    }
    objects.PowerupRapidFire = PowerupRapidFire;
})(objects || (objects = {}));
//# sourceMappingURL=PowerupRapidFire.js.map