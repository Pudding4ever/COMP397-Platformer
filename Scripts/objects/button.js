var objects;
(function (objects) {
    class Button extends createjs.Bitmap {
        // Private Instance Variables
        // Public Properties
        // Constructor
        constructor(assetManager, imageString, x = 0, y = 0) {
            super(assetManager.getResult(imageString));
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
            this.on("mouseover", this._mouseOver);
            this.on("mouseout", this._mouseOut);
        }
        // Private Methods
        _mouseOver() {
            this.alpha = 0.7;
        }
        _mouseOut() {
            this.alpha = 1.0;
        }
    }
    objects.Button = Button;
})(objects || (objects = {}));
//# sourceMappingURL=button.js.map