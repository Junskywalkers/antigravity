# Chord Button App Implementation Plan

## Goal Description
Create a web application with 6 buttons (72px x 72px) that play specific chords (C, Dm, Em, F, G, Am) when touched/clicked. The app will use the Web Audio API for sound generation and feature a premium, responsive UI.

## Proposed Changes

### Project Structure
- Initialize a Vite project with Vanilla JavaScript.
- Root directory: `/Users/takahashij/Documents/Antigravity/chord-app`

### [NEW] `index.html`
- Main entry point.
- Container for the 6 buttons.
- Import `style.css` and `main.js`.

### [NEW] `style.css`
- Global styles (reset, font, background).
- Button styles:
    - Size: 72px x 72px.
    - Premium aesthetic: Gradients, shadows, rounded corners.
    - Active states (transform, brightness).
    - Responsive grid layout.

### [NEW] `main.js`
- Audio Context setup.
- Chord frequency definitions (C4 octave base).
- Oscillator creation and envelope handling (ADSR for smooth sound).
- Event listeners for buttons (`touchstart`, `mousedown`).

## Verification Plan

### Automated Tests
- None (Visual and Audio interaction requires manual verification).

### Manual Verification
1.  **Start Server**: Run `npm run dev`.
2.  **Visual Check**:
    - Verify 6 buttons are present.
    - Verify buttons are 72px x 72px.
    - Verify layout is centered and aesthetically pleasing.
3.  **Audio Check**:
    - Click/Touch "C" -> Hear C Major chord.
    - Click/Touch "Dm" -> Hear D Minor chord.
    - Click/Touch "Em" -> Hear E Minor chord.
    - Click/Touch "F" -> Hear F Major chord.
    - Click/Touch "G" -> Hear G Major chord.
    - Click/Touch "Am" -> Hear A Minor chord.
4.  **Interaction Check**:
    - Verify sound plays immediately on touch/click.
    - Verify buttons show visual feedback on press.
