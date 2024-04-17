import { _decorator, Component, Node, randomRangeInt, Sprite, SpriteFrame } from "cc";
const { ccclass, property } = _decorator;

@ccclass("addImage")
export class addImage extends Component {
    @property({ type: [SpriteFrame] })
    imgArray: [SpriteFrame] | [] = [];

    @property({ type: SpriteFrame })
    background: SpriteFrame;
    start() {}

    update(deltaTime: number) {}
    setCard() {
        this.node.getComponent(Sprite).spriteFrame = this.imgArray[randomRangeInt(0, this.imgArray.length)];
    }

    setBackground() {
        this.node.getComponent(Sprite).spriteFrame = this.background;
    }
}
