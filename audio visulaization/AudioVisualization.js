export class AudioVisualization {
  constructor(audioPath) {
    this.audioPath = audioPath;
  }

  getAudioAnalyser() {
    var audioContext = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioContext.createAnalyser();

    var audioElement = new Audio(this.audioPath);
    var source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    return { analyser, audioElement, audioContext };
  }

  getDataArray(analyser) {
    var dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}
