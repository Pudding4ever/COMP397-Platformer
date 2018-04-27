module scenes {
  export class WinScene extends objects.Scene {
    // Private Instance Variables
    private _overLabel: objects.Label;
    private _backButton: objects.Button;
    private _background: objects.GameObject;

    // Public Properties

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super(assetManager);

      this.Start();
    }

    // Private Mathods
    private _backButtonClick():void {
      objects.Game.currentScene = config.Scene.START;
    }


    // Public Methods

    // Initialize Game Variables and objects
    public Start(): void {
      //console.log ("GAME OVER YEAH");
      this._background = new objects.GameObject(this.assetManager, "backgroundlv3");
      this._background.x = 1000;
      this._background.y = -10;
      this.addChild(this._background);
      this._overLabel = new objects.Label("YOU'RE WINNER", "40px", "IMPACT", "#FF0000", 410, 240, true);
      this._backButton = new objects.Button(this.assetManager, "backButton", 320, 340);
      this.Main();
    }

    public Update(): void {

    }

    // This is where the fun happens
    public Main(): void {
      // add the welcome label to the scene
      this.addChild(this._overLabel);

      // add the backButton to the scene
      this.addChild(this._backButton);

      // event listeners
      this._backButton.on("click", this._backButtonClick);
    }
  }
}
