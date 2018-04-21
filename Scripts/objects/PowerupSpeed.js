var objects;
(function (objects) {
    class PowerupSpeed extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "p_speed");
            this.Start();
        }
        Start() {
            this.alpha = 1;
        }
        Update() {
            if (this.isColliding) {
                this.Reset();
            }
        }
        Reset() {
            this.alpha = 0;
            this.x = -10000;
            this.y = -10000;
            this.isColliding = false;
        }
    }
    objects.PowerupSpeed = PowerupSpeed;
})(objects || (objects = {}));
//# sourceMappingURL=PowerupSpeed.js.map