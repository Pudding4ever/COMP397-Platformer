var objects;
(function (objects) {
    class WeaponRifle extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "w_rifle");
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
    objects.WeaponRifle = WeaponRifle;
})(objects || (objects = {}));
//# sourceMappingURL=Weapon_Rifle.js.map