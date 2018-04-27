var objects;
(function (objects) {
    class PowerupHealth extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "p_health");
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
            //console.log("powerup reset");
            this.alpha = 0;
            this.x = -10000;
            this.y = -10000;
            this.isColliding = false;
        }
    }
    objects.PowerupHealth = PowerupHealth;
})(objects || (objects = {}));
//# sourceMappingURL=PowerupHealth.js.map