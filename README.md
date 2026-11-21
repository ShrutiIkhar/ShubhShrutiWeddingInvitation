# Shruti & Shubham — Wedding Invitation

A lightweight, mobile-first, one-page wedding invitation.

## Customize
Open `config.js`. You can change:
- names, date and time
- venue and Google Maps link
- story and personal message
- events
- RSVP link / WhatsApp number
- Instagram link
- music URL
- hero, story and gallery image paths

## Add photos
Put your images inside `assets/` and update the filenames in `config.js`.

Suggested files:
hero.jpg
story-1.jpg
story-2.jpg
story-3.jpg
gallery-1.jpg ... gallery-8.jpg

If you don't have images yet, the layout still works; replace the placeholders before publishing.

## Run
Because this is a static site, you can open it through a simple local server:

Python:
python -m http.server 8000

Then visit:
http://localhost:8000

## Publish
Upload the whole folder to any static hosting provider. No database is required unless you connect RSVP to a backend/form service.
