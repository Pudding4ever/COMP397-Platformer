var scenes;
(function (scenes) {
    class OverScene extends objects.Scene {
        // Public Properties
        // Constructor
        constructor(assetManager) {
            super(assetManager);
            this.Start();
        }
        // Private Mathods
        _backButtonClick() {
            objects.Game.currentScene = config.Scene.START;
        }
        // Public Methods
        // Initialize Game Variables and objects
        Start() {
            //console.log ("GAME OVER YEAH");
            this._background = new objects.GameObject(this.assetManager, "backgroundlv3");
            this._background.x = 1000;
            this._background.y = -10;
            this.addChild(this._background);
            this._overLabel = new objects.Label("GAME OVER", "40px", "IMPACT", "#FF0000", 410, 240, true);
            this._backButton = new objects.Button(this.assetManager, "backButton", 410, 340);
            this.Main();
        }
        Update() {
        }
        // This is where the fun happens
        Main() {
            // add the welcome label to the scene
            this.addChild(this._overLabel);
            // add the backButton to the scene
            this.addChild(this._backButton);
            // event listeners
            this._backButton.on("click", this._backButtonClick);
        }
    }
    scenes.OverScene = OverScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map