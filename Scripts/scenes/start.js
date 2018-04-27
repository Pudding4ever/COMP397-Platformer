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
        _skipButtonClick() {
            objects.Game.currentScene = config.Scene.PLAY4;
        }
        // Public Methods
        // Initialize Game Variables and objects
        Start() {
            this._background = new objects.GameObject(this.assetManager, "backgroundlv3");
            this._background.x = 1000;
            this._background.y = -10;
            this.addChild(this._background);
            this._welcomeLabel = new objects.Label("KILL ALL ALIENS", "72px", "Impact", "#FF0000", 410, 140, true);
            this._startButton = new objects.Button(this.assetManager, "startButton", 410, 340);
            this._skipButton = new objects.Button(this.assetManager, "skipButton", 410, 440);
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
            this.addChild(this._skipButton);
            this._startButton.on("click", this._startButtonClick);
            this._skipButton.on("click", this._skipButtonClick);
        }
    }
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map