# FIFA World Cup 2026 - Tournament Dashboard

Official-grade analytics dashboard for the FIFA World Cup 2026 tournament, built using a premium glassmorphic style with native, clean front-end architecture.

---

## 🏆 Project Details

* **Team Name:** FIFO
* **Country:** Uruguay
* **Team Members:** Uruguay Developer
* **GitHub Repository:** [notjamestbh](https://github.com/notjamestbh)

---

## 🚀 Project Description

This dashboard is a high-performance web application designed to track and analyze the stage 1 matches and standings of the FIFA World Cup 2026. Designed with visual excellence and mobile-first responsiveness in mind, it provides tournament organizers, journalists, and fans with real-time computational standings calculation, grouping explorer accordions, instantaneous fuzzy search, and multi-column sorting capabilities.

---

## ✨ Features

1. **Top Hero Glass UI:** A beautiful frosted-glass hero banner showing metadata: current matchday, selected group filter, status, and dynamic last-updated timestamps.
2. **Animated Stats Cards:** Four statistics counters (Teams, Matches, Leader, Avg Points) that animate dynamically on load and adapt to refreshed data.
3. **Sticky Navigation Bar:** An elegant sticky header that provides smooth anchor-scrolling across target sections and contains quick action controls (Theme toggle & Refresh data button).
4. **Group Explorer (Accordions):** Interactive card accordions showing Groups A, B, C, and D. Only one group can be expanded at any time, complete with country flags, names, and FIFA rankings.
5. **Standings Dashboard:** A sortable, searchable, and responsive table representing the current group stage standings.
    - **Podium Highlights:** Distinct visual rankings highlighting Gold (1st Place with floating crown & pulsing glow), Silver (2nd Place), and Bronze (3rd Place).
    - **Instant Filtering:** A live search field that instantly matches country names, groups, and rankings without page reload.
    - **Multi-Field Sorting:** Clicking column headers toggles ascending/descending sorting for Points, Wins, Goals, Goal Difference, and Played.
    - **Recent Form Badges:** Display of recent results using circular, color-coded badges (🟢 Win, 🟡 Draw, 🔴 Loss).
6. **Theme Toggler:** Instant transition between dark premium navy and light frosted sky themes while retaining the glassmorphic aesthetics.
7. **Simulation Refresh System:** A refresh action that simulates real-time match goals, recalculates standings, updates stats, and fires success toast notifications.
8. **Modern Accessibility:** Fully compatible with keyboard navigation, visible focus indicators, high color contrast, and descriptive aria-labels.

---

## 🛠️ Technologies Used

* **HTML5:** Semantic layouts, document outlining, and accessibility ARIA specifications.
* **CSS3:** Flexible layouts (Flexbox & Grid), GPU-accelerated backdrop blur filter, HSL CSS variables, custom scrollbar styling, keyframe animation, and custom media queries.
* **JavaScript (ES6+):** Vanilla script managing states, search fuzzy matching, dynamic sorting algorithms, requestAnimationFrame calculations, class manipulation, and toast systems.

---

## 📂 Folder Structure

```text
fifa-dashboard/
│
├── index.html        # Semantic HTML5 document and grid structure
├── style.css         # Modern styling rules, variables, layout grids, animations, and media queries
├── script.js        # Realistic sample data, sorting/filtering engines, event listeners, and animations
├── logo.png          # Official FIFA World Cup Trophy logo image
└── README.md         # Full project overview and execution guidelines
```

---

## 💻 How to Run

1. Clone or download the project files into a single directory.
2. Open `index.html` in any modern web browser (e.g. Chrome, Firefox, Safari, Microsoft Edge).
3. Alternatively, host the files on a local web server (e.g., using VS Code Live Server or python `http.server`) to ensure smooth performance of backdrop filters.

```bash
# To run locally using Python:
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## 📸 Screenshots

![Theme Mockup Placeholder](https://via.placeholder.com/1200x600/020617/38bdf8?text=FIFA+World+Cup+2026+Dashboard+Mockup)

---

## ⚖️ License

This project is licensed under the MIT License. See individual files for licensing specifications.
