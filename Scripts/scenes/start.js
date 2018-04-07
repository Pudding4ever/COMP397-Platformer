var scenes;
(function (scenes) {
    class StartScene extends objects.Scene {
        // Public Properties
        // Constructor
        constructor(assetManager) {
            super(assetManager);
            this.Start();
        }
        // Private Mathods
        _startButtonClick() {
            objects.Game.currentScene = config.Scene.PLAY;
        }
        // Public Methods
        // Initialize Game Variables and objects
        Start() {
            this._welcomeLabel = new objects.Label("Welcome", "60px", "Consolas", "#000000", 320, 240, true);
            this._startButton = new objects.Button(this.assetManager, "startButton", 320, 340);
            this.Main();
        }
        Update() {
        }
        // This is where the fun happens
        Main() {
            // add the welcome label to the scene
            this.addChild(this._welcomeLabel);
            // add the startButton to the scene
            this.addChild(this._startButton);
            this._startButton.on("click", this._startButtonClick);
        }
    }
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map