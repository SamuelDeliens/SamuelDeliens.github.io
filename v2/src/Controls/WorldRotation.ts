export interface WorldRotationLerp {
    active: boolean,
    currentX: number,
    targetX: number,
    currentY: number,
    targetY: number,
    ease: number
}

export default class WorldRotation {

    static lerp: WorldRotationLerp;

    static onMouseMove(e: MouseEvent) {
        if (!this.lerp.active) return;
        const newRotationX = ((e.clientX - window.innerWidth / 2)*2)/window.innerWidth;
        const newRotationY = ((e.clientY - window.innerHeight / 2)*2)/window.innerHeight;
        WorldRotation.lerp.targetX = newRotationX;
        WorldRotation.lerp.targetY = newRotationY;
    }
}