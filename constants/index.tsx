

export const interpolate = (start: number, end: number, progress: number): number => {
    return start + (end - start) * progress;
};

export function interpolateScale(min: number, max: number, t: number) {
    return min + (max - min) * t;
}

export const cubesData = {
    "cube-1": {
        initial: {
            top: -63,
            left: 37.5,
            rotateX: 360,
            rotateY: -180,
            rotateZ: 48,
            z: -4000
        },
        final: {
            top: 50,
            left: 15,
            rotateX: 0,
            rotateY: 3,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-2": {
        initial: {
            top: -35,
            left: 32.5,
            rotateX: -180,
            rotateY: 180,
            rotateZ: 90,
            z: -4000
        },
        final: {
            top: 75,
            left: 25,
            rotateX: 1,
            rotateY: 2,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-3": {
        initial: {
            top: -75,
            left: 50,
            rotateX: -90,
            rotateY: -90,
            rotateZ: -180,
            z: -4000
        },
        final: {
            top: 25,
            left: 25,
            rotateX: -1,
            rotateY: 2,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-4": {
        initial: {
            top: -35,
            left: 50,
            rotateX: -90,
            rotateY: -90,
            rotateZ: -180,
            z: -4000
        },
        final: {
            top: 75,
            left: 75,
            rotateX: 1,
            rotateY: -2,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-5": {
        initial: {
            top: -64,
            left: 63.5,
            rotateX: 90,
            rotateY: 320,
            rotateZ: 100,
            z: -4000
        },
        final: {
            top: 25,
            left: 75,
            rotateX: -1,
            rotateY: -2,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-6": {
        initial: {
            top: -35,
            left: 67.5,
            rotateX: -90,
            rotateY: -180,
            rotateZ: -180,
            z: -4000
        },
        final: {
            top: 50,
            left: 85,
            rotateX: 0,
            rotateY: -3,
            rotateZ: 0,
            z: 0
        }
    }
};

export const mobileCubesData = {
   
    "cube-2": {
        initial: {
            top: -35,
            left: 32.5,
            rotateX: -180,
            rotateY: 180,
            rotateZ: 90,
            z: -4000
        },
        final: {
            top: 85,
            left: 18,
            rotateX: 1,
            rotateY: 2,
            rotateZ: 0,
            z: 0
        }
    },
    "cube-3": {
        initial: {
            top: -75,
            left: 50,
            rotateX: -90,
            rotateY: -90,
            rotateZ: -180,
            z: -4000
        },
        final: {
            top: 15,
            left: 18,
            rotateX: 344,
            rotateY: 356,
            rotateZ: 20,
            z: 0
        }
    },
    "cube-4": {
        initial: {
            top: -35,
            left: 50,
            rotateX: -90,
            rotateY: -90,
            rotateZ: -180,
            z: -4000
        },
        final: {
            top: 75,
            left: 82,
            rotateX: 26,
            rotateY: 177,
            rotateZ: 37,
            z: 0
        }
    },
    "cube-5": {
        initial: {
            top: -64,
            left: 63.5,
            rotateX: 90,
            rotateY: 320,
            rotateZ: 100,
            z: -4000
        },
        final: {
            top: 25,
            left: 82,
            rotateX: 340,
            rotateY: 349,
            rotateZ: 331,
            z: 0
        }
    },
  
};

// translate3d(-50%, -50%, 0px) rotateX(344deg) rotateY(356deg) rotateZ(20deg) cube-3
// translate3d(-50%, -50%, 0px) rotateX(26deg) rotateY(177deg) rotateZ(37deg)
// 
// 