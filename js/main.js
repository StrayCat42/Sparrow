// main.js - load articles, search, filter, navigate to article page
let articlesData = [];

document.addEventListener('DOMContentLoaded', () => {
  init();
});

function init() {
  setupNavigation();
  loadArticles();
  setupSearch();
}

async function loadArticles() {
  try {
    const res = await fetch('data/articles.json');
    articlesData = await res.json();
    displayArticles(articlesData);
    populateCategoryFilter(articlesData);
  } catch (err) {
    console.error('Error loading articles:', err);
    const c = document.getElementById('articles-container');
    if (c) c.innerHTML = '<p style="color:red;">Error loading articles. See console.</p>';
  }
}

function displayArticles(list) {
  const container = document.getElementById('articles-container');
  if (!container) return;
  container.innerHTML = '';
  if (!Array.isArray(list) || list.length === 0) {
    container.innerHTML = '<p>No articles found.</p>';
    return;
  }
  list.forEach(a => container.appendChild(createArticleCard(a)));
  setupArticleInteractions();
}

function createArticleCard(article) {
  const card = document.createElement('article');
  card.className = 'article-card';
  card.innerHTML = `
    <div class="article-image">${article.icon || ''}</div>
    <div class="article-content">
      <span class="article-category">${article.category || ''}</span>
      <h3 class="article-title">${article.title || ''}</h3>
      <p class="article-excerpt">${article.excerpt || ''}</p>
      <div class="article-meta">
        <span>By ${article.author || 'Unknown'}</span>
        <a href="article.html?id=${encodeURIComponent(article.id)}" class="read-more" data-id="${article.id}">Read More →</a>
      </div>
    </div>
  `;
  return card;
}

function setupNavigation() {
  // keep links usable; could wire SPA behaviors here
}

function setupArticleInteractions() {
  // anchors already navigate to article.html; no extra wiring needed
}

function searchArticles(keyword, category) {
  let results = articlesData.slice();
  if (keyword && String(keyword).trim().length > 0) {
    const q = String(keyword).trim().toLowerCase();
    results = results.filter(a => (
      (a.title && a.title.toLowerCase().includes(q)) ||
      (a.excerpt && a.excerpt.toLowerCase().includes(q)) ||
      (a.content && a.content.toLowerCase().includes(q)) ||
      (a.category && a.category.toLowerCase().includes(q)) ||
      (a.author && a.author.toLowerCase().includes(q))
    ));
  }
  if (category && String(category).trim().length > 0) {
    const cat = String(category).trim().toLowerCase();
    results = results.filter(a => a.category && a.category.toLowerCase() === cat);
  }
  return results;
}

function populateCategoryFilter(articles) {
  const select = document.getElementById('category-filter');
  if (!select || !Array.isArray(articles)) return;
  const cats = Array.from(new Set(articles.map(a => a.category).filter(Boolean))).sort();
  select.innerHTML = '<option value="">All categories</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
  select.addEventListener('change', function () {
    const input = document.getElementById('search-input');
    const keyword = input ? input.value : '';
    const results = searchArticles(keyword, this.value);
    displayArticles(results);
    const countEl = document.getElementById('search-count');
    if (countEl) countEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
  });
}

function setupSearch() {
  const input = document.getElementById('search-input');
  const countEl = document.getElementById('search-count');
  const category = document.getElementById('category-filter');
  if (!input) return;
  let timer = null;
  input.addEventListener('input', (e) => {
    clearTimeout(timer);
    const v = e.target.value;
    timer = setTimeout(() => {
      const cat = category ? category.value : '';
      const results = searchArticles(v, cat);
      displayArticles(results);
      if (countEl) countEl.textContent = v || cat ? `${results.length} result${results.length !== 1 ? 's' : ''}` : '';
    }, 200);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cat = category ? category.value : '';
      const results = searchArticles(e.target.value, cat);
      displayArticles(results);
      if (countEl) countEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;
    }
  });
}

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date ? new Date(date).toLocaleDateString('en-US', options) : '';
}