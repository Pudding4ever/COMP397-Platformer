var math;
(function (math) {
    class Vec2 extends createjs.Point {
        // private instance variables
        // public properties
        // constructors
        constructor(x = 0, y = 0) {
            super(x, y);
        }
        // private methods
        // public methods
        static Distance(P1, P2) {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }
    }
    math.Vec2 = Vec2;
})(math || (math = {}));
//# sourceMappingURL=math.js.map