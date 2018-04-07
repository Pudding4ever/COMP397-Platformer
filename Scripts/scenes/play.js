var scenes;
(function (scenes) {
    class PlayScene extends objects.Scene {
        // Public Properties
        // Constructor
        constructor(assetManager) {
            super(assetManager);
            this.plan = `
......................
......................
......................
......................
......................
......................
......................
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;
            console.log(this.plan);
            this.rows = new Array();
            this.rows = this.plan.trim().split("\n").map(l => [...l]);
            console.log(this.rows);
            this.height = this.rows.length;
            this.width = this.rows[0].length;
            this.startActors = [];
            this.levelPlatforms = new Array();
            const scale = 25;
            const levelChars = {
                ".": "empty", "#": objects.Platform,
                "@": objects.Hero, "e": objects.Enemy //, "E": objects.BigEnemy, "W": objects.Weapon, "P": objects.Powerup
            };
            this.y = 0;
            this.x = 0;
            for (let str of this.rows) {
                this.x = 0;
                this.row = new Array();
                this.row = [...str];
                for (let chr of this.row) {
                    switch (chr) {
                        case chr = '.':
                            {
                                break;
                            }
                        case chr = '#':
                            {
                                console.log(chr);
                                let newplat = new objects.Platform(this.assetManager, this.x * scale, this.y * scale);
                                this.levelPlatforms.push(newplat);
                                this.addChild(newplat);
                                console.log("Platform placed!");
                                break;
                            }
                        default:
                            {
                                //empty space
                                break;
                            }
                    }
                    this.x++;
                }
                this.y++;
            }
            console.log(this.levelPlatforms);
            this.Start();
        }
        // Private Mathods
        // Public Methods
        // TODO: Initialize Game Variables and objects
        Start() {
            this.collisionmanager = new managers.Collision();
            this._sonic = new objects.Hero(this.assetManager, 1 * 10);
            this._sonic.myScene = this;
            //this._platform = new objects.Platform(this.assetManager);
            this._badguy = new objects.Enemy(this.assetManager);
            this.bulletobjectpool = new Array();
            for (var i = 0; i < 12; i++) {
                var b;
                b = new objects.Bullet(this.assetManager);
                this.bulletobjectpool.push(b);
                this.addChild(b);
                console.log("created bullet");
            }
            this.Main();
        }
        //TODO: Call update of game objects
        Update() {
            this._sonic.Update();
            this.checkBullets();
            this._badguy.Update();
            this.CheckPlatformCollisions();
        }
        checkBullets() {
            var b;
            for (b in this.bulletobjectpool) {
                this.bulletobjectpool[b].Update();
                this.collisionmanager.Check(this.bulletobjectpool[b], this._badguy);
            }
        }
        //TODO: Add Game objects to the scene
        Main() {
            this.addChild(this._sonic);
            this.addChild(this._platform);
            this.addChild(this._badguy);
        }
        CheckPlatformCollisions() {
            for (var i = 0; i < this.levelPlatforms.length; i++) {
                if (this.isOn(this.levelPlatforms[i]) && this._sonic.isFalling()) {
                    this._sonic.stopHero();
                    this.placeOn(this.levelPlatforms[i], this._sonic);
                }
                if (!this.isOn(this.levelPlatforms[i]) && !this._sonic.isOnGround()) {
                    this._sonic.jumpDown();
                }
            }
        }
        isOn(platform) {
            let x = this._sonic.x;
            let y = this._sonic.y;
            return (x + this._sonic.width / 2 >= platform.x - platform.width / 2 && x - this._sonic.width / 2 <= platform.x + platform.width / 2) &&
                (y >= platform.y - platform.height / 2 - this._sonic.height / 2);
        }
        placeOn(platform, hero) {
            hero.y = platform.y - platform.height / 2 - hero.height / 2;
        }
    }
    scenes.PlayScene = PlayScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=play.js.map