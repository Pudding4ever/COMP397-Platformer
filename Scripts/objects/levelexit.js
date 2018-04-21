var objects;
(function (objects) {
    class LevelExit extends objects.GameObject {
        constructor(assetManager) {
            super(assetManager, "levelexit");
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
        }
    }
    objects.LevelExit = LevelExit;
})(objects || (objects = {}));
//# sourceMappingURL=levelexit.js.map