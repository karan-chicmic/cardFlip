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

    // @property({ type: Label })
    // label: Label = null;

    start() {
        for (let i = 0; i < 7; i++) {
            const card = instantiate(this.cardPrefab);
            card.getComponent(addImage).setCard();
            card.setPosition(-750 + i * 200, 0, 0);
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

        tween(clickedSprite)
            .to(0.5, { scale: new Vec3(0, 1, 0) })
            .to(0.5, { scale: new Vec3(-1, 1, 0) })
            .start();

        const randomNumber = randomRangeInt(0, 9);

        clickedSprite.getChildByName("Label").getComponent(Label).string = randomNumber.toString();
    }
}
