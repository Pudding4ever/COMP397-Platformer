module objects {
  export class Game {
    public static stage: createjs.Stage;
    public static assetManager: createjs.LoadQueue;
    public static keyboardManager: managers.Keyboard;
    public static currentScene: number;
  }
}
