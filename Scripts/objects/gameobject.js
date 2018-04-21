var objects;
(function (objects) {
    class GameObject extends createjs.Bitmap {
        // constructors
        constructor(assetManager, imageString) {
            super(assetManager.getResult(imageString));
            this.name = imageString;
            this._initialize();
        }
        // private methods
        _initialize() {
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.halfWidth = this.width * 0.5;
            this.halfHeight = this.height * 0.5;
            this.regX = this.halfWidth;
            this.regY = this.halfHeight;
            this.isColliding = false;
        }
        // public methods
        Start() {
        }
        Update() {
        }
        Reset() {
        }
        CheckBounds() {
        }
        Move() {
        }
        stopHero() {
            this.Physics.stopJumping();
        }
    }
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map