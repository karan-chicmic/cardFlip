import {
    _decorator,
    Component,
    EventMouse,
    instantiate,
    Label,
    Node,
    Prefab,
    randomRangeInt,
    SpriteFrame,
    tween,
    UITransform,
    Vec3,
} from "cc";
import { addImage } from "./addImage";
const { ccclass, property } = _decorator;

const SPRITE_COUNT = 6;
@ccclass("flip")
export class flip extends Component {
    @property({ type: Prefab })
    cardPrefab: Prefab;

    totalCard = 7;
    lastSecondCard: Node;

    // @property({ type: Label })
    // label: Label = null;

    start() {
        for (let i = 0; i < this.totalCard; i++) {
            const card = instantiate(this.cardPrefab);
            card.getComponent(addImage).setCard();

            if (i % 2 == 0) {
                card.setPosition(-750 + i * 200, 200, 0);
            } else {
                card.setPosition(-750 + (i - 1) * 200, -200, 0);
            }
            if (i == this.totalCard - 2) {
                this.lastSecondCard = card;
            }
            if (i == this.totalCard - 1 && !(this.totalCard % 2 == 0)) {
                card.setPosition(this.lastSecondCard.getPosition().x + 350, 0, 0);
            }
            this.node.addChild(card);

            card.on(
                Node.EventType.MOUSE_DOWN,
                (event) => {
                    this.onSpriteClick(event);
                },

                this
            );
        }
    }

    update(deltaTime: number) {}

    onSpriteClick(event: EventMouse) {
        const clickedSprite = event.currentTarget;
        // clickedSprite.addChild(this.label);

        tween(clickedSprite)
            .to(0.3, { scale: new Vec3(0, 1, 0) })
            // .to(0.6, {scale: new Vec3(0, 0, 0)})
            .call(() => {
                clickedSprite.getComponent(addImage).setCard();
            })
            .to(0.3, { scale: new Vec3(-1, 1, 0) })
            .start();

        const randomNumber = randomRangeInt(0, 9);

        // this.label.getComponent(Label).string = randomNumber.toString();
    }
}
