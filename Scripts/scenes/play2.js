var scenes;
(function (scenes) {
    class Play2Scene extends objects.Scene {
        // Public Properties
        // Constructor
        constructor(assetManager) {
            super(assetManager);
            this.plan = `
######################################################################################################################################################........................................................................................................................................................................................................................................................................
######################################################################################################################################################........................................................................................................................................................................................................................................................................
..#............................................................#...................................................................#................###..................................................................................................w..................................###############################################################.............######################################................
..#............................................................#...................................................................#................###..................................................................................................w..................................###############################################################.............######################################................
..#............................................................#..................................#####............e...............#.............................................######........##................e.......................#.........############.......##############.......................e..................e...........................##############.....................................###..............
..#............................................................#..................................#####............e...............#.............................................######........##................e.......................#.........############.......##############.......................e..................e...........................##############.....................................###..............
..#................................w...........................#...............w......#####......................#####.............#........#####...............................########........................###....................##...........................................###............#########################################.........................................................LVLFIN...###.............
..#................................w...........................#...............w......#####......................#####.............#........#####...............................########........................###....................##...........................................###............#########################################.........................................................LVLFIN...###.............
..#........#####.................#####.................#####...#..............###..................................................#......##......w.#..............######################..............###..........................###...............................................##.........##################################################.....................###########################################...........
..#.@......#####.................#####.................#####...#..............###..................................................#......##......w.#..............######################..............###..........................###...............................................##.........##################################################.....................###########################################...........
..#####............##########............##########............#.......###.........................................................#....###.........####....###....#######################......#####.........................######...................................................##.........###########################################..................................................................###............
..#####............##########............##########............#.......###.........................................................#....###.........####....###....#######################......#####.........................######...................................................##.........###########################################..................................................................###............
......#............#........#............#........#......e........................................e...................................##..#......e..#..............########################................e................e...........e.....................e.........................###..................E.................e......e..........#######################..................................E..###..............
......#............#........#............#........#......e........................................e...................................##..#......e..#..............########################................e................e...........e.....................e.........................###..................E.................e......e..........#######################..................................E..###..............
......##############........#............#........##############...###...###...#######################################################....###########..............#################################################################################################################......#######################################################.......................#######################################...............
......##############........#............#........##############...###...###...#######################################################....###########..............#################################################################################################################......#######################################################.......................#######################################...............
..............................................................................................................................................................................................................................................................................................................................................................................................................................`;
            console.log(this.plan);
            this._healthLabel = new objects.Label("Health: x", "12px", "Consolas", "#000000", 20, 20, true);
            this._weaponLabel = new objects.Label("Weapon: Pistol", "12px", "Consolas", "#000000", 20, 40, true);
            this._background = new objects.GameObject(this.assetManager, "backgroundlv2");
            this.addChild(this._background);
            this.addChild(this._healthLabel);
            this.addChild(this._weaponLabel);
            this._background.x = 3500;
            this._background.y = -250;
            this.rows = new Array();
            this.rows = this.plan.trim().split("\n").map(l => [...l]); //Splits up the "plan" string into an array of single rows, broken at each new line.
            console.log(this.rows);
            this.height = this.rows.length;
            this.width = this.rows[0].length;
            this.stageActors = [];
            this.levelPlatforms = new Array();
            const scale = 25; //size of basic platform block (must be square)
            /* const levelChars = {
               ".": "empty", "#": objects.Platform,
               "@": objects.Hero, "e": objects.Enemy//, "E": objects.BigEnemy, "W": objects.Weapon, "P": objects.Powerup
             }; //Didn't actually end up using this as originally planned.
              */
            this.y = 0;
            this.x = 0;
            //The below loop breaks up the array of rows into an array of individual characters, then checks the individual characters to create and place objects in the world.
            for (let str of this.rows) {
                this.x = 0;
                this.row = new Array();
                this.row = [...str];
                for (let chr of this.row) {
                    switch (chr) {
                        case chr = '.':
                            {
                                //empty space
                                break;
                            }
                        case chr = '#':
                            {
                                //place a platform
                                console.log(chr);
                                let newplat = new objects.Platform(this.assetManager, this.x * scale, this.y * scale);
                                this.levelPlatforms.push(newplat);
                                this.addChild(newplat);
                                console.log("Platform placed!");
                                break;
                            }
                        case chr = '@':
                            {
                                //place the player LAST
                                this._rx = this.x * scale;
                                this._ry = this.y * scale;
                                break;
                            }
                        case chr = 'e':
                            {
                                //place minor enemy
                                break;
                            }
                        case chr = 'E':
                            {
                                //place major enemy
                                break;
                            }
                        case chr = 'P':
                            {
                                //place random powerup
                                break;
                            }
                        case chr = 'W':
                            {
                                //place random weapon
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
        UpdateLabels() {
            this._healthLabel.x = this.stage.regX + 20;
            this._healthLabel.y = this.stage.regY + 20;
            this._weaponLabel.x = this.stage.regX + 20;
            this._weaponLabel.y = this.stage.regY + 40;
            this._healthLabel.text = "Health: " + this._sonic.lives;
            switch (this._sonic.weapontype) {
                case this._sonic.weapontype = 0:
                    {
                        this._weaponLabel.text = "Weapon: Pistol";
                        break;
                    }
                case this._sonic.weapontype = 1:
                    {
                        this._weaponLabel.text = "Weapon: Shotgun";
                        break;
                    }
                case this._sonic.weapontype = 2:
                    {
                        this._weaponLabel.text = "Weapon: Machine Gun";
                        break;
                    }
                default:
                    {
                        break;
                    }
            }
        }
        UpdateCamera() {
            this.stage.regX = this._sonic.x - 50;
            this.stage.regY = this._sonic.y - 410;
        }
        // TODO: Initialize Game Variables and objects
        Start() {
            this._sonic = new objects.Hero(this.assetManager, 1 * 10);
            this._sonic.myScene = this;
            this._sonic.x = this._rx;
            this._sonic.y = this._ry;
            this.collisionmanager = new managers.Collision();
            //this._platform = new objects.Platform(this.assetManager);
            //this._badguy = new objects.Enemy(this.assetManager);
            this.bulletobjectpool = new Array();
            for (var i = 0; i < 50; i++) {
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
            this.UpdateLabels();
            this.UpdateCamera();
        }
        checkBullets() {
            var b;
            var i;
            i = 0;
            for (b in this.bulletobjectpool) {
                this.bulletobjectpool[b].Update();
                for (var a in this.stageActors) {
                    i++;
                    this.collisionmanager.Check(this.bulletobjectpool[b], this.stageActors[i]); //checks bullet collision with all stage actors. collision script will handle determining if a bullet will actually DO anything to the thing it hit
                }
            }
        }
        //TODO: Add Game objects to the scene
        Main() {
            this.addChild(this._sonic);
            this.addChild(this._platform);
            this.addChild(this._badguy);
        }
        CheckPlatformCollisions() {
            //Checks all platforms in levelPlatforms array for collisions with hero.
            //Probably a slow way to do this but I had to find a way to support multiple platforms in the world at once.
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
    scenes.Play2Scene = Play2Scene;
})(scenes || (scenes = {}));
/*
If I am correct this is intended to function as a side scrolling camera by
moving the world under the player when the player is at the left hand border?

Novel idea, don't move the player/camera, move the world... but it should be possible to define and move a viewport instead.
Keeping this commented out for now while I figure out how that's going to work.



        if (this._sonic.isOnMiddle() || this._sonic.isOnLeftBorder()) {
            this._platform.Move();
            this._badguy.Move();
        }
*/ 
//# sourceMappingURL=play2.js.map