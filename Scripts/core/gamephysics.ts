module core {

    export class GamePhysics {
        static readonly g = 9.81;
        private timeIterator: core.RealtimeIterator;
        private isJumpng: boolean = false;
        private _onX;
        private _onY;

        public constructor() {
            this.timeIterator = new core.RealtimeIterator();
        }

        jump(hero: objects.Hero, alfa: number, Pt: number = 14) :void {
            let i = 0;
            let gf = this;
            let h = hero;
            let startX = h.x;
            let startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                this._onX = createjs.Ticker.on("tick", function () {
                    h.x = startX + gf.calculateX(Pt, alfa, ++i / 10);
                    if (!gf.checkX(h)) {
                        createjs.Ticker.off("tick", this._onX);
                    }
                }, this);

                this._onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(Pt, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", this._onY);
                        createjs.Ticker.off("tick", this._onX);
                        gf.isJumpng = false;
                    }

                }, this);
            }

        }

        public stopJumping() {
            createjs.Ticker.off("tick", this._onY);
            createjs.Ticker.off("tick", this._onX);
            this.isJumpng = false;
        }

        private calculateX(Pt: number, alfa: core.MovingDirections, ti: number) :number {
            return this.V0(Pt, GamePhysics.g) * ti * Math.cos(alfa * 180 / Math.PI);
        }

        private calculateY(Pt: number, alfa: core.MovingDirections, ti: number) :number {
            return this.V0(Pt, GamePhysics.g) * ti * Math.sin(alfa * 180 / Math.PI) - GamePhysics.g * ti * ti * 0.5;
        }

        private V0(Pt: number, g: number) :number {
            return 0.5 * Pt * g;
        }


        public checkX(hero: objects.Hero): boolean {
            if (hero.x >= 640 - hero.halfWidth) {
                hero.x = 640 - hero.halfWidth;
                return false;
            }

            // left boundary
            if (hero.x <= hero.halfWidth) {
                hero.x = hero.halfWidth;
                return false;
            }

            return true;
        }

        public checkY(hero: objects.Hero) :boolean {

            if(hero.y >= 480 - hero.halfHeight) {
                hero.y = 480 - hero.halfHeight;
                return false;
            }

            // left boundary
            if(hero.y <= hero.halfHeight) {
                hero.y = hero.halfHeight;
                return false;
            }
            return true;
        }

    }
}