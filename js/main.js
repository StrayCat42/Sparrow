// Global variable to store articles
let articlesData = [];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Daily News website loaded successfully!');
    
    // Initialize the website
    init();
});

/**
 * Initialize website functionality
 */
function init() {
    setupNavigation();
    loadArticles();
}

/**
 * Load articles from JSON file
 */
async function loadArticles() {
    try {
        const response = await fetch('data/articles.json');
        articlesData = await response.json();
        displayArticles(articlesData);
    } catch (error) {
        console.error('Error loading articles:', error);
        document.getElementById('articles-container').innerHTML = 
            '<p style="color: red;">Error loading articles. Please check the console.</p>';
    }
}

/**
 * Display articles on the page
 * @param {Array} articles - Array of article objects
 */
function displayArticles(articles) {
    const container = document.getElementById('articles-container');
    container.innerHTML = '';
    
    if (articles.length === 0) {
        container.innerHTML = '<p>No articles found.</p>';
        return;
    }
    
    articles.forEach(article => {
        const articleCard = createArticleCard(article);
        container.appendChild(articleCard);
    });
    
    // Setup interactions after articles are rendered
    setupArticleInteractions();
}

/**
 * Create an article card element
 * @param {Object} article - Article data object
 * @returns {HTMLElement} Article card element
 */
function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'article-card';
    
    card.innerHTML = `
        <div class="article-image">${article.icon}</div>
        <div class="article-content">
            <span class="article-category">${article.category}</span>
            <h3 class="article-title">${article.title}</h3>
            <p class="article-excerpt">${article.excerpt}</p>
            <div class="article-meta">
                <span>By ${article.author}</span>
                <a href="#" class="read-more" data-id="${article.id}">Read More →</a>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Setup navigation functionality
 */
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default for demo purposes
            // In a real site, you'd handle routing here
            console.log('Navigation clicked:', this.textContent);
        });
    });
}

/**
 * Setup article card interactions
 */
function setupArticleInteractions() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const articleId = this.getAttribute('data-id');
            const article = articlesData.find(a => a.id === parseInt(articleId));
            
            if (article) {
                console.log('Reading article:', article.title);
                // TODO: Implement article detail view
                alert(`Article: ${article.title}\n\nFull content coming soon!`);
            }
        });
    });
}

/**
 * Search articles by keyword
 * TODO: Implement this function for the search feature task
 * @param {string} keyword - Search keyword
 * @returns {Array} Filtered articles
 */
function searchArticles(keyword) {
    // TODO: Student task - implement search functionality
    // Hint: Filter articlesData by title, excerpt, category, or author
    return [];
}

/**
 * Utility function to format dates
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}