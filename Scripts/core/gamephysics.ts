module core {

    export class GamePhysics {
        static readonly g = 9.81;
        private timeIterator: core.RealtimeIterator;
        private isJumpng: boolean = false;

        public constructor() {
            this.timeIterator = new core.RealtimeIterator();
        }



        jump(hero: objects.Hero, alfa: number) :void {

            let i = 0;
            let gf = this;
            let h = hero;
            let startX = h.x;
            let startY = h.y;
            if (!this.isJumpng) {
                this.isJumpng = true;
                let onX = createjs.Ticker.on("tick", function () {
                    h.x = startX + gf.calculateX(14, alfa, ++i / 10);
                    if (!gf.checkX(h)) {
                        createjs.Ticker.off("tick", onX);
                    }
                }, this);

                let onY = createjs.Ticker.on("tick", function () {
                    h.y = startY - gf.calculateY(14, alfa, ++i / 10);
                    if (!gf.checkY(h)) {
                        createjs.Ticker.off("tick", onY);
                        createjs.Ticker.off("tick", onX);
                        gf.isJumpng = false;
                    }

                }, this);
            }

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


        private checkX(hero: objects.Hero): boolean {
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

        private checkY(hero: objects.Hero) :boolean {

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