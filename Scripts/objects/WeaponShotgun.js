var objects;
(function (objects) {
    class WeaponShotgun extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "w_shotgun");
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
    objects.WeaponShotgun = WeaponShotgun;
})(objects || (objects = {}));
//# sourceMappingURL=WeaponShotgun.js.map