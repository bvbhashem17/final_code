
export class AnimationFunctions {
    constructor() {
    }

    bouncingAnimation(mesh, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

        const animation = gsap.timeline({ repeat: repetitions });
        animation
            .to(mesh.position, { duration, delay, x, y, z, ease });
        animation.play();
    }

    arounditself(mesh, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }

    rotateAroundZ(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }

    rotateAroundY(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }

    rotateAroundX(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;
    }

    comeback(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;
    }

    faraway(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;
    }

    wallhit(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }

    bounce(object, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }

    animateCameraZoom(camera, options = {}) {
        const {
            delay = 1,
            duration = 1,
            x = 0,
            y = 2,
            z = 0,
            ease = 'bounce.in.out',
            repetitions = 1
        } = options;

    }
}