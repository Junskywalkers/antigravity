import './style.css'

// Audio Context
let audioCtx;

// Chord Frequencies (Equal Temperament, A4=440Hz)
const chords = {
  'C': [261.63, 329.63, 392.00], // C4, E4, G4
  'Dm': [293.66, 349.23, 440.00], // D4, F4, A4
  'Em': [329.63, 392.00, 493.88], // E4, G4, B4
  'F': [349.23, 440.00, 523.25], // F4, A4, C5
  'G': [392.00, 493.88, 587.33], // G4, B4, D5
  'Am': [440.00, 523.25, 659.25]  // A4, C5, E5
};

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playChord(chordName) {
  initAudio();
  
  const frequencies = chords[chordName];
  if (!frequencies) return;

  const now = audioCtx.currentTime;
  const duration = 1.5; // seconds

  frequencies.forEach(freq => {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'triangle'; // Softer sound than sine, richer than sine
    osc.frequency.value = freq;

    // Envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // Decay

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  });
}

// UI Interaction
document.querySelectorAll('.chord-btn').forEach(btn => {
  const chord = btn.dataset.chord;
  
  const trigger = (e) => {
    e.preventDefault(); // Prevent double firing on some touch devices
    playChord(chord);
    
    // Visual feedback
    btn.classList.add('active');
    setTimeout(() => btn.classList.remove('active'), 150);
  };

  btn.addEventListener('mousedown', trigger);
  btn.addEventListener('touchstart', trigger, { passive: false });
});
