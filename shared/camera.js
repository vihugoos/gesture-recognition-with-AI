export default class Camera {
    constructor() {
        this.video = document.createElement("video");
    }

    static async init() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            throw new Error(
                "Browser API navigator.mediaDevices.getUserMedia not available!"
            );
        }

        const videoConfig = {
            audio: false,
            video: {
                width: globalThis.screen.availWidth,
                height: globalThis.screen.availHeight,
                frameRate: {
                    ideal: 60,
                },
            },
        };

        const stream = await navigator.mediaDevices.getUserMedia(videoConfig);

        const camera = new Camera();

        camera.video.srcObject = stream;

        // Only for debug reasons
        // camera.video.height = 200;
        // camera.video.width = 320;
        // document.body.querySelector(".video-container").append(camera.video);

        // Wait for the camera
        await new Promise((resolve) => {
            camera.video.onloadedmetadata = () => {
                resolve(camera.video);
            };
        });

        camera.video.play();

        return camera;
    }
}
