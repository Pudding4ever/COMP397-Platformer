/// <reference path="_references.ts"/>
// IIFE - Immediately Invoked Function Expression
var core;
(function (core) {
    (function () {
        // Game Variables
        let canvas = document.getElementById("canvas");
        let stage;
        let helloLabel;
        let clickMeButton;
        let assetManager;
        let assetManifest;
        let currentScene;
        let currentState;
        let keyboardManager;
        //TODO: add pictures
        assetManifest = [
            { id: "clickMeButton", src: "./Assets/images/clickMeButton.png" },
            { id: "startButton", src: "./Assets/images/startButton.png" },
            { id: "nextButton", src: "./Assets/images/nextButton.png" },
            { id: "backButton", src: "./Assets/images/backButton.png" },
            { id: "sonicHero", src: "./Assets/images/sonic.png" },
            { id: "platform", src: "./Assets/images/platform.png" },
            { id: "bullet", src: "./Assets/images/bullet.png" },
            { id: "badguy", src: "./Assets/images/badguy.png" },
        ];
        // preloads assets
        function Init() {
            console.log("Initialization Started...");
            assetManager = new createjs.LoadQueue(); // creates the assetManager object
            assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
            assetManager.loadManifest(assetManifest);
            assetManager.on("complete", Start, this);
        }
        function Start() {
            console.log("Starting Application...");
            stage = new createjs.Stage(canvas);
            stage.enableMouseOver(20); // turn this on for buttons
            createjs.Ticker.framerate = 60; // 60 FPS
            createjs.Ticker.on("tick", Update);
            var context = canvas.msGetInputContext;
            objects.Game.stage = stage;
            objects.Game.currentScene = config.Scene.START;
            currentState = config.Scene.START;
            keyboardManager = new managers.Keyboard();
            objects.Game.keyboardManager = keyboardManager;
            Main();
        }
        function Update() {
            // if the scene that is playing returns another current scene
            // then call Main again and switch the scene
            if (currentState != objects.Game.currentScene) {
                Main();
            }
            currentScene.Update();
            stage.update(); // redraws the stage
        }
        function Main() {
            stage.removeAllChildren();
            switch (objects.Game.currentScene) {
                case config.Scene.START:
                    currentScene = new scenes.StartScene(assetManager);
                    break;
                case config.Scene.PLAY:
                    currentScene = new scenes.PlayScene(assetManager);
                    break;
                case config.Scene.OVER:
                    currentScene = new scenes.OverScene(assetManager);
                    break;
            }
            currentState = objects.Game.currentScene;
            stage.addChild(currentScene);
        }
        window.onload = Init;
    })();
})(core || (core = {}));
//# sourceMappingURL=game.js.map