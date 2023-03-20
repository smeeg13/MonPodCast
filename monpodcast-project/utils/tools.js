export const getDuration = (file) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = (e) => {
        const ctx = new AudioContext();
        const audioArrayBuffer = e.target.result;
        ctx.decodeAudioData(audioArrayBuffer, data => {
            // this is the success callback
            const duration = data.duration;
            console.log('Audio file duration: ' + duration);
            return duration;
        }, error => {
            // this is the error callback
            console.error(error);
            return -1;
        });
    };
};