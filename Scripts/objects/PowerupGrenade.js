var objects;
(function (objects) {
    class PowerupGrenade extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "p_grenade");
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
    objects.PowerupGrenade = PowerupGrenade;
})(objects || (objects = {}));
//# sourceMappingURL=PowerupGrenade.js.map