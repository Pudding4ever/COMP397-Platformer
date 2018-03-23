module objects {
  export class Scene extends createjs.Container {
    // Instance Variables

    // Public Properties
    public assetManager;
    public bulletobjectpool: objects.Bullet[];
    public collisionmanager: managers.Collision;

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
