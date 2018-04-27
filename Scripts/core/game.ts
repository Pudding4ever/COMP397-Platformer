/// <reference path="_references.ts"/>

// IIFE - Immediately Invoked Function Expression
module core {
    (function () {

        // Game Variables
        let canvas = document.getElementById("canvas");
        let stage: createjs.Stage;
        let helloLabel: objects.Label;
        let clickMeButton: objects.Button;
        let assetManager: createjs.LoadQueue;
        let assetManifest: any[];
        let currentScene: objects.Scene;
        let currentState: number;
        let keyboardManager: managers.Keyboard;


        //TODO: add pictures
        assetManifest = [
            {id: "clickMeButton", src: "./Assets/images/clickMeButton.png"},
            {id: "startButton", src: "./Assets/images/startButton.png"},
            {id: "nextButton", src: "./Assets/images/nextButton.png"},
            {id: "backButton", src: "./Assets/images/backButton.png"},
            {id: "skipButton", src: "./Assets/images/skipButton.png"},
            {id: "player", src: "./Assets/images/sonic.png"},
            {id: "bullet", src: "./Assets/images/bullet.png"},
            {id: "ebullet", src: "./Assets/images/ebullet.png"},
            {id: "badguy", src: "./Assets/images/badguy.png"},
            {id: "p_ammobox", src: "./Assets/images/ammo.png"},
            {id: "w_launcher", src: "./Assets/images/launcher.png"},
            {id: "p_grenade", src: "./Assets/images/grenade.png"},
            {id: "grenade", src: "./Assets/images/smallgrenade.png"},
            {id: "p_health", src: "./Assets/images/lifeup.png"},
            {id: "p_shield", src: "./Assets/images/shield.png"},
            {id: "p_ewpew", src: "./Assets/images/rapidshot.png"},
            {id: "w_rifle", src: "./Assets/images/rifle.png"},
            {id: "w_shotgun", src: "./Assets/images/shotgun.png"},
            {id: "rocket", src: "./Assets/images/rocket.png"},
            {id: "jumpingenemy", src: "./Assets/images/e1.png"},
            {id: "shootingenemy", src: "./Assets/images/e2.png"},
            {id: "flyingenemy", src: "./Assets/images/e3.png"},
            {id: "boss", src: "./Assets/images/boss.png"},
            {id: "backgroundlv1", src: "./Assets/images/bg1.png"},
            {id: "backgroundlv2", src: "./Assets/images/bg2.png"},
            {id: "backgroundlv3", src: "./Assets/images/bg3.png"},
            {id: "levelexit", src: "./Assets/images/levelexit.png"},
            { id: "pistol", src: "./Assets/audio/pistol.wav" },
            { id: "rifle", src: "./Assets/audio/rifle.wav" },
            { id: "rifle2", src: "./Assets/audio/rifle2.wav" },
            { id: "ouch", src: "./Assets/audio/ouch.wav" },
            { id: "ouch2", src: "./Assets/audio/ouch2.wav" },
            { id: "dead", src: "./Assets/audio/dead.wav" },
            { id: "jumpingguysound", src: "./Assets/audio/jumping monster noise.wav" },
            { id: "powerup", src: "./Assets/audio/powerup.wav" },
            { id: "shotgun", src: "./Assets/audio/shotgun.wav" },
            { id: "heal", src: "./Assets/audio/heal.wav" },
            { id: "flyingenemyshot", src: "./Assets/audio/flyingenemyshot.wav" },
            { id: "gameover", src: "./Assets/audio/gameover.wav" },
            { id: "enemyshot", src: "./Assets/audio/enemyshot.wav" },
            { id: "enemydead", src: "./Assets/audio/jumping monster noise.wav" },
            { id: "music1", src: "./Assets/audio/music1.ogg" },
            { id: "music2", src: "./Assets/audio/music2.ogg" },
            { id: "musicboss", src: "./Assets/audio/musicboss.ogg" },
            {id: "platform#", src: "./Assets/images/tiles/1.png"},
            {id: "platform(", src: "./Assets/images/tiles/2.png"},
            {id: "platform)", src: "./Assets/images/tiles/3.png"},
            {id: "platform-", src: "./Assets/images/tiles/4.png"},
            {id: "platform[", src: "./Assets/images/tiles/5.png"},
            {id: "platform]", src: "./Assets/images/tiles/6.png"},
            {id: "platform_", src: "./Assets/images/tiles/7.png"},
            {id: "platform{", src: "./Assets/images/tiles/8.png"},
            {id: "platform}", src: "./Assets/images/tiles/9.png"},
            {id: "platform=", src: "./Assets/images/tiles/10.png"},

        ];

        // preloads assets
        function Init(): void {
            //console.log("Initialization Started...");
            assetManager = new createjs.LoadQueue(); // creates the assetManager object
            assetManager.installPlugin(createjs.Sound); // asset manager can also load sounds
            assetManager.loadManifest(assetManifest);
            assetManager.on("complete", Start, this);
        }

        function Start(): void {
            //console.log("Starting Application...")

            stage = new createjs.Stage(canvas);
            stage.enableMouseOver(20); // turn this on for buttons
            createjs.Ticker.framerate = 60; // 60 FPS
            createjs.Ticker.on("tick", Update);
            var context = canvas.msGetInputContext
            objects.Game.stage = stage;
            objects.Game.currentScene = config.Scene.START;
            currentState = config.Scene.START;

            keyboardManager = new managers.Keyboard();
            objects.Game.keyboardManager = keyboardManager;
            Main();
        }

        function Update(): void {
            // if the scene that is playing returns another current scene
            // then call Main again and switch the scene
            if (currentState != objects.Game.currentScene) {
                Main();
            }

            currentScene.Update();

            stage.update(); // redraws the stage
        }

        function Main(): void {
            stage.removeAllChildren();
            stage.regX = 0;
            stage.regY = 0;
            switch (objects.Game.currentScene) {
                case config.Scene.START:
                    currentScene = new scenes.StartScene(assetManager);
                    break;
                case config.Scene.PLAY:
                    currentScene = new scenes.PlayScene(assetManager);
                    break;
                    case config.Scene.PLAY2:
                    currentScene = new scenes.Play2Scene(assetManager);
                    break;
                    case config.Scene.PLAY3:
                    currentScene = new scenes.Play3Scene(assetManager);
                    break;
                    case config.Scene.PLAY4:
                    currentScene = new scenes.Play4Scene(assetManager);
                    break;
                    case config.Scene.WIN:
                    currentScene = new scenes.WinScene(assetManager);
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
}
