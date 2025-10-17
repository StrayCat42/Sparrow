# Daily News Website

A simple news website template for learning web development fundamentals.

## Project Structure

```
news-website/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles
├── js/
│   └── main.js        # JavaScript functionality
├── data/
│   └── articles.json  # Article data store
├── assets/
│   └── images/        # Image assets (placeholder)
└── README.md          # This file
```

## Setup Instructions

1. Clone or download this project
2. **Important:** You must run this with a local server due to CORS restrictions when loading JSON files
   - **Option 1 (Python):** `python -m http.server 8000` or `python3 -m http.server 8000`
   - **Option 2 (Node.js):** `npx http-server`
   - **Option 3 (VS Code):** Install "Live Server" extension and click "Go Live"
3. Open `http://localhost:8000` (or the port your server uses) in your browser
4. No build process required - pure HTML, CSS, and JavaScript!

## Features

- Responsive navigation bar
- Hero section with gradient background
- **Dynamic article loading from JSON data**
- Article grid with 6 sample articles
- Hover effects on article cards
- Mobile-responsive design


_________________________________________________________________________

## Tasks
1. Implement a search feature | may have to add more articles
2. Create an individual article view page
2. Implement a filter
3. Update logo
4. Manual input of articles

## Bugs