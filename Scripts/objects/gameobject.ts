module objects {



  export class GameObject extends createjs.Bitmap {
    // private instance variables
    protected _dx: number;
    protected _dy: number;

    // public properties
    public width: number;
    public height: number;
    public halfWidth: number;
    public halfHeight: number;
    public isColliding: boolean;
    public isCollidingBullet: boolean;
    public Physics :core.GamePhysics;
    public currentplatform: objects.Platform;

    

    // constructors
    constructor(assetManager: createjs.LoadQueue, imageString:string) {
      super(assetManager.getResult(imageString));
      this.name = imageString;
      this._initialize();
  }
    // private methods
    private _initialize():void {
      this.width = this.getBounds().width;
      this.height = this.getBounds().height;
      this.halfWidth = this.width * 0.5;
      this.halfHeight = this.height * 0.5;
      this.regX = this.halfWidth;
      this.regY = this.halfHeight;
      this.isColliding = false;
    }

    // public methods
    public Start(): void {

    }

    public Update(): void {

    }

    public Reset():void {

    }

    public CheckBounds():void {

    }

    public Move():void {

    }

    public stopHero():void {
      this.Physics.stopJumping();
  }
  }
}
