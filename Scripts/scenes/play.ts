module scenes {
  export class PlayScene extends objects.Scene {
    // Private Instance Variables
    //TODO: Game object private variables
      private _sonic: objects.Hero;
      private _platform: objects.Platform;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods



    // Public Methods

    // TODO: Initialize Game Variables and objects
    public Start(): void {
        this._sonic = new objects.Hero(this.assetManager, 1 * 10);
        this._sonic.myScene = this;
        this._platform = new objects.Platform(this.assetManager)
        this.Main();
    }

    //TODO: Call update of game objects
    public Update(): void {
        this._sonic.Update();

        if (this.isOn(this._platform) && this._sonic.isFalling()) {
            this._sonic.stopHero();
            this.placeOn(this._platform, this._sonic);
        }

        if (!this.isOn(this._platform) && !this._sonic.isOnGround()) {
            this._sonic.jumpDown();
        }

    }

    //TODO: Add Game objects to the scene
    public Main(): void {
      this.addChild(this._sonic);
      this.addChild(this._platform);
    }

    private isOn(platform: objects.Platform):boolean {
        let x = this._sonic.x;
        let y = this._sonic.y;
        return (x + this._sonic.width/2 >= platform.x - platform.width/2 && x - this._sonic.width/2 <= platform.x + platform.width/2) &&
            (y >= platform.y - platform.height/2 - this._sonic.height/2);
    }

    private placeOn(platform: objects.Platform, hero: objects.Hero) {
        hero.y = platform.y - platform.height/2 - hero.height/2;
    }

  }
}
