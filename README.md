# K Explore – Responsive Event Management Website

A modern, responsive event management website where users can explore upcoming events, view details, and register. Built for the **K Explore – Web Designing** task using **HTML5, CSS3 and vanilla JavaScript**.

## Live Demo & Repository

| | Link |
|---|---|
| Deployed website | https://k-explore-events.vercel.app/ |
| GitHub repository | https://github.com/im-nikhiil/k-explore-events |

## Screenshots

> Add your screenshots to a `screenshots/` folder and update the file names below.

| Light mode (desktop) | Dark mode (desktop) | Mobile |
|---|---|---|
| ![Light](screenshots/light.png) | ![Dark](screenshots/dark.png) | ![Mobile](screenshots/mobile.png) |

## Problem Statement

Design and develop a responsive event management website that lets users explore upcoming events, view detailed information, and register for their preferred events, with a clean interface and interactive components.

## Features

### Core requirements

| Requirement | How it is implemented |
|---|---|
| Hero section | Headline, short intro, call-to-action button and a live countdown card for the next event |
| Upcoming and featured events | Grid of event cards showing name, date, venue, image and a short description |
| Browse, search and filter | Live keyword search plus category filter chips (Tech, Music & Arts, Business, Workshop, Sports) |
| Event details | Clicking "View details" opens a modal with full information |
| Registration form | Collects name, email, phone number and selected event |
| Form validation | JavaScript validation with inline error messages (see below) |
| Confirmation message | Success screen shown after a valid submission |
| Responsive design | Works on mobile, tablet and desktop using CSS Grid, Flexbox and media queries |

### Bonus challenges

- **Dark / light mode:** toggle in the navbar; remembers the choice and respects the system preference on first visit
- **Event countdown timers:** live timer in the hero and inside each event's detail view
- **Animations:** page-load hero animation, card entrance, hover transitions, modal pop-in and a success tick animation
- **Local Storage registration management:** registrations are saved in the browser, listed under "My registrations", and can be cancelled

### Form validation rules

| Field | Rule |
|---|---|
| Full name | 2 to 50 characters, letters, spaces and `. ' -` only |
| Email | Must match a valid email format (`name@example.com`) |
| Phone number | 10-digit Indian mobile number starting with 6 to 9 (optional `+91`) |
| Selected event | Must be selected |
| Duplicate check | The same email cannot register twice for the same event |

### UI / UX and accessibility

- Consistent colour tokens (CSS variables) for light and dark themes
- Keyboard accessible: visible focus outlines, skip link, Escape closes the modal
- Semantic HTML, ARIA labels and alt text on images
- Respects `prefers-reduced-motion`
- Lazy-loaded images

## Tech Stack

- **HTML5:** semantic structure
- **CSS3:** variables, Grid, Flexbox, animations, media queries
- **JavaScript (ES6):** DOM manipulation, validation, Local Storage, timers
- **Git and GitHub:** version control
- **Vercel:** deployment
- **Google Fonts:** Bricolage Grotesque and DM Sans
- **Images:** [Picsum Photos](https://picsum.photos) placeholders

## Project Structure

```
k-explore-events/
├── index.html    # Page markup (hero, events, registrations, modal)
├── style.css     # Theme variables, layout, animations, responsive rules
├── script.js     # Event data, rendering, filters, validation, storage, timers
└── README.md     # Project documentation
```

## How It Works

1. **Event data** lives in the `EVENTS` array at the top of `script.js`. Each event has an id, name, category, date, venue, image and description.
2. **Rendering:** cards are generated from the array. The search box and category chips filter the list in real time.
3. **Registration:** the modal form validates each field on submit. Valid data is saved to `localStorage` under the key `kexplore_regs`.
4. **Countdowns:** a one-second `setInterval` updates the hero timer to the nearest upcoming event and the modal timer for the selected event.
5. **Theme:** the choice is stored under `kexplore_theme` and applied through a `data-theme` attribute that switches the CSS variables.

## Run Locally

```bash
git clone https://github.com/im-nikhiil/k-explore-events.git
cd k-explore-events
```

Then open `index.html` in any browser. No build step or dependencies are needed.

## Customising Events

Open `script.js` and edit the `EVENTS` array:

```js
{ id: 9, name: "Your Event", cat: "Tech", date: "2027-03-01T10:00",
  venue: "Your Venue", img: "https://your-image-url", desc: "Short description." }
```

## Deployment

1. Push the project to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project** and import the repository.
3. Keep the default settings (Framework Preset: Other) and click **Deploy**.
4. Every `git push` to `main` redeploys automatically.

## Possible Future Improvements

- Backend and database for real registrations
- Email confirmation after registering
- Admin page to create and manage events
- Calendar export (.ics) and map integration

## Author

**Nikhil**: [GitHub](https://github.com/im-nikhiil)

Built as part of the K Explore Web Designing task.
