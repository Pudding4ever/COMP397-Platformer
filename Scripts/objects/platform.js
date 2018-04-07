var objects;
(function (objects) {
    class Platform extends objects.GameObject {
        constructor(assetManager, x, y) {
            super(assetManager, "platform");
            this.x = x;
            this.y = y;
        }
    }
    objects.Platform = Platform;
})(objects || (objects = {}));
//# sourceMappingURL=platform.js.map