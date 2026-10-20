# রুয়েট অটো সার্ভিস · Games by Istiak

Mobile-friendly Three.js campus satire runner. The goal is to build batch consensus for taking an unofficial break, through five days of discussion. It is not a trip home or a holiday simulator.

## Run

```sh
npm install
npm run dev
```

## Deploy on Vercel

Import this folder through GitHub into Vercel. The included vercel.json selects Vite, `npm run build`, and `dist`. Alternatively run `npx vercel` with your Vercel account.

## Mechanics

Arrow keys / A D / swipe / touch buttons change lanes. Space or the unity button gives 2.3 seconds to manage pressure, followed by a cooldown. Tea-table discussions restore unity and add consensus. Campus encounters reduce unity and consensus. Four day-end discussions pause the runner for a decision. Complete five days with at least 70% consensus to finalize the auto decision. Escape / P pauses.

Sound On plays the user-supplied Subway Surfers MP3, bundled in public/audio/ at 85% volume and looping. Audio pauses when the game is paused or the browser tab is hidden. Engine and horn effects remain synthesized. The CR ghosting encounter and second-day card depict a seen message with no reply; sending a confirmed batch list restores support.

All geometry is generated locally: Bangladesh-style open battery auto, campus buildings and trees, human discussion groups, representative desk, phone-call encounter, tea tables and gate checkpoints. Visuals are stylized rather than photorealistic. Fonts load from Google Fonts with system fallbacks.

Mobile portrait/landscape layouts, safe-area padding, large touch buttons and lower mobile pixel/shadow resolution are included. Actual phone performance depends on the device GPU.

Characters show role labels, dialogue, lane hints and exact consequences. Green tea discussions give +4% support and +1 unity. Yellow hesitant classmates and blue batch representatives reward talking (Space / কথা button). Red phone and attendance encounters can be avoided by changing lanes. Five day indicators track discussion time separately from a support bar with a 70% target marker. Decision cards show concrete situations and the exact support changes before choosing.
