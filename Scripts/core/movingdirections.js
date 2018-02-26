var core;
(function (core) {
    var MovingDirections;
    (function (MovingDirections) {
        MovingDirections[MovingDirections["FORWARD"] = 0] = "FORWARD";
        MovingDirections[MovingDirections["UP"] = 90] = "UP";
        MovingDirections[MovingDirections["BACK"] = 180] = "BACK";
        MovingDirections[MovingDirections["DOWN"] = 270] = "DOWN";
        MovingDirections[MovingDirections["UP_FORWARD"] = 45] = "UP_FORWARD";
        MovingDirections[MovingDirections["UP_BACK"] = 135] = "UP_BACK";
        MovingDirections[MovingDirections["DOWN_BACK"] = 225] = "DOWN_BACK";
        MovingDirections[MovingDirections["DOWN_FORWARD"] = 315] = "DOWN_FORWARD";
    })(MovingDirections = core.MovingDirections || (core.MovingDirections = {}));
})(core || (core = {}));
//# sourceMappingURL=movingdirections.js.map