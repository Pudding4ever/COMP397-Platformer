var objects;
(function (objects) {
    class Platform extends objects.GameObject {
        constructor(assetManager, x, y) {
            super(assetManager, "platform");
            this.x = x;
            this.y = y;
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
    objects.Platform = Platform;
})(objects || (objects = {}));
//# sourceMappingURL=platform.js.map