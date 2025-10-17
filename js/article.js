// Read article id from query string and render the article
(function() {
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  async function loadArticle(id) {
    try {
      const res = await fetch('data/articles.json');
      const articles = await res.json();
      const article = articles.find(a => String(a.id) === String(id));
      const container = document.getElementById('article-detail');
      if (!article) {
        container.innerHTML = '<p>Article not found.</p>';
        return;
      }

      container.innerHTML = `
        <article class="article-full">
          <div class="article-image">${article.icon}</div>
          <div class="article-content">
            <span class="article-category">${article.category}</span>
            <h1 class="article-title">${article.title}</h1>
            <p class="article-meta">By ${article.author} • ${new Date(article.date).toLocaleDateString()}</p>
            <div class="article-body"><p>${article.content}</p></div>
            <p><a href="index.html">← Back to stories</a></p>
          </div>
        </article>
      `;
    } catch (err) {
      console.error('Error loading article:', err);
      const container = document.getElementById('article-detail');
      container.innerHTML = '<p>Error loading article.</p>';
    }
  }

  const id = getQueryParam('id');
  if (id) loadArticle(id);
})();