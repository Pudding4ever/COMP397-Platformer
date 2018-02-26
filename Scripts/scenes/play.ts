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
        this._platform = new objects.Platform(this.assetManager)
      this.Main();
    }

    //TODO: Call update of game objects
    public Update(): void {
        this._sonic.Update();
    }

    //TODO: Add Game objects to the scene
    public Main(): void {
      this.addChild(this._sonic);
      this.addChild(this._platform);
    }
  }
}
