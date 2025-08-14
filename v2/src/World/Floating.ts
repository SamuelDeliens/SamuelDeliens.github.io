import type {GlobeInterface} from "./Globes.ts";
import { gsap } from "gsap";

export default class Floating {
    static animations: Map<GlobeInterface, gsap.core.Tween> = new Map();

    static start(globe: GlobeInterface) {
        const base = globe.ballMesh.position.clone();

        const animate = () => {
            const delta = {
                x: (Math.random() - 0.5) * 0.3,
                y: (Math.random() - 0.5) * 0.3,
                z: (Math.random() - 0.5) * 0.3,
            };

            const duration = 2 + Math.random();

            const tween = gsap.to([globe.ballMesh.position, globe.glassMesh.position], {
                x: base.x + delta.x,
                y: base.y + delta.y,
                z: base.z + delta.z,
                duration,
                ease: "sine.inOut",
                delay: Math.random() * 0.3,
                onComplete: animate,
            });

            Floating.animations.set(globe, tween);
        };

        animate();
    }

    static stop(globe: GlobeInterface) {
        const tween = Floating.animations.get(globe);
        if (tween) {
            tween.kill();
            Floating.animations.delete(globe);
        }
    }
}