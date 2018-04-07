var managers;
(function (managers) {
    class Collision {
        Check(object1, object2) {
            // create two vec2 objects
            let P1 = new math.Vec2(object1.x, object1.y);
            let P2 = new math.Vec2(object2.x, object2.y);
            if (math.Vec2.Distance(P1, P2) < (object1.halfHeight + object2.halfHeight)) {
                if (!object2.isColliding) {
                    console.log("COLLISION");
                    object2.isColliding = true;
                }
                else {
                    object2.isColliding = false;
                }
            }
        }
    }
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map