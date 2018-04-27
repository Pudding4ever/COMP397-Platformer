var objects;
(function (objects) {
    class PowerupShield extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "p_shield");
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
    objects.PowerupShield = PowerupShield;
})(objects || (objects = {}));
//# sourceMappingURL=PowerupShield.js.map