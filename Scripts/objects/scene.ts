module objects {
  export class Scene extends createjs.Container {
    // Instance Variables



    
    // Public Properties
    public assetManager;
    public bulletobjectpool: objects.Bullet[];
    public collisionmanager: managers.Collision;

    public height: number;
    public width: number;
    public startActors: Array<objects.GameObject>;
    public plan: string;
    public rows: Array<Array<String>>;
    public row: Array<String>;
    public x: number;
    public y: number;

    // Constructor
    constructor(assetManager: createjs.LoadQueue) {
      super();
      this.assetManager = assetManager;
    }
    // Private Methods

    // Public Methods

    public Start():void {

    }

    public Update():void {

    }

    public Main():void {

    }
  }
}