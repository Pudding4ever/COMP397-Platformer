var objects;
(function (objects) {
    class Label extends createjs.Text {
        // Private Instance Variables
        // Public Propoerties
        // Constructor
        constructor(labelString, fontSize, fontFamily, fontColour, x = 0, y = 0, isCentered = false) {
            super(labelString, fontSize + " " + fontFamily, fontColour);
            if (isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            this.x = x;
            this.y = y;
        }
    }
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map