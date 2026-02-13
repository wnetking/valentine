# Valentine Day Page

A single-page Valentine's Day experience built with Vite, React, and Material Design 3. Features a photo-grid background, interactive Yes/No buttons, flip animations, and an optional screen + camera recording.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Output is in `dist/`. The app uses `base: '/valentine/'` for GitHub Pages. If your repo name differs, update `base` in `vite.config.js`.

## Deploy to GitHub Pages

1. Ensure the repo has a remote (e.g. `origin`) and the correct `base` in `vite.config.js` matches your repo name (e.g. `base: '/valentine/'` for `https://<user>.github.io/valentine/`).
2. Build and publish the `dist` folder to the `gh-pages` branch:

   ```bash
   npm run build
   npx gh-pages -d dist
   ```

3. In the repo **Settings → Pages**, set source to the `gh-pages` branch and save.

## Features

- **Mobile gate**: On small viewports, only a message asking to open on desktop is shown.
- **Photo grid**: Background of blocks with images (opacity 0.2); replace placeholder URLs in `src/components/PhotoGrid.jsx` with your own.
- **Center content**: “Will you be my valentine?” with **Yes** and **No** buttons.
- **No button**: Moves 100px in a random direction on hover (stays on screen). After 5 hovers, a popup with “Don’t mess with me!!!” and an angry cat GIF appears.
- **Yes button**: Scales 3× on hover. On click, the center fades out and photo blocks flip in random order (two flips each, opacity increases). Then a large heart appears and beats, followed by “Happy Valentine day! I love you!”
- **Recording (optional)**: On load, a dialog asks to record the experience. If accepted, screen and camera are recorded (composited). Recording stops when the heart appears; you can then download or watch the video.

## Tech stack

- Vite 7, React 19
- MUI (Material UI) for buttons and dialogs
- Custom CSS for layout, photo grid, flip, and heart animations
