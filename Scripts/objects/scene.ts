module objects {
  export class Scene extends createjs.Container {
    // Instance Variables

    // Public Properties
    public assetManager;
    public bulletobjectpool: objects.Bullet[];
    public enemybulletobjectpool: objects.eBullet[];
    public collisionmanager: managers.Collision;
    public player: GameObject;

    public height: number;
    public width: number;
    public stageActors: Array<objects.GameObject>;
    public stagePowerups: Array<objects.GameObject>;
    public levelPlatforms: Array<objects.Platform>;
    public regpoints: Array<objects.Platform>;
    public plan: string;
    public rows: Array<Array<String>>;
    public row: Array<String>;
    public prevrow: Array<String>;
    public x: number;
    public y: number;
    public BOSSDEAD: boolean = false;

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