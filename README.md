# Manyu's Frost to Bloom - Birthday Website

A beautiful, scroll-based interactive storytelling website that transitions from Winter to Spring to celebrate a special birthday.

## 📂 Project Structure

- **assets/**: Place your images and audio files here.
- **components/**: React components for different sections (Hero, Chapter, etc.).
- **constants.ts**: The central configuration file for **Text, Links, and Image URLs**.
- **App.tsx**: Main layout and logic.

## 🛠 How to Customize

### 1. Changing Texts and Images
Open `constants.ts`. You will see a `STORY_CHAPTERS` array and an `IMAGES` object.
- **Images**: Update the URLs in the `IMAGES` constant. You can use Unsplash URLs or local paths (e.g., `/assets/my-photo.jpg`).
- **Story Text**: Edit the `title` and `text` fields inside `STORY_CHAPTERS`.

### 2. Adding Custom Music
The default music is configured in `constants.ts`.
1. Place your MP3 file in the `public/assets/` folder (or just `assets/` depending on your build setup, but for this structure, ensure it's accessible by the browser).
2. Rename it to `background_music.mp3` OR update the path in `constants.ts`:
   ```typescript
   export const CONFIG = {
     backgroundMusic: '/assets/my-new-song.mp3', 
     // ...
   };
   ```

### 3. Adding Voice Notes (Chapter 3)
1. Record your voice messages.
2. Save them as MP3 files in the `assets/` folder (e.g., `voice1.mp3`, `voice2.mp3`).
3. In `constants.ts`, find `Chapter 3` (id: 3) and update the `voiceClips` array:
   ```typescript
   voiceClips: [
     {
       id: 'msg1',
       label: 'My Birthday Wish',
       url: '/assets/voice1.mp3',
       duration: '0:15'
     },
     // ...
   ]
   ```

### 4. Changing the YouTube Link
In `constants.ts`, find `CONFIG.youtubeLink` and replace the URL with your desired YouTube video link.

## 🚀 How to Run Locally

1. Open a terminal in this folder.
2. Install dependencies (if you haven't): `npm install`
3. Run the dev server: `npm start` (or `npx vite`, depending on your setup).
4. Since this is a raw file export, simpler usage is to serve the root directory using a static server or `serve`.

## ☁️ Deployment (Vercel)

1. Create a GitHub repository and push this code.
2. Go to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Vercel usually detects React/Vite automatically. If prompted for "Output Directory", use `dist` or `build`.
5. Click **Deploy**.

**Enjoy the celebration!** 🎂
