document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '7e641ff9a7764c6eb3458c44858a9fbb';
    const newsContainer = document.getElementById('news-container');
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const menuToggleButton = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    let currentCategory = 'general';

    function isValidArticle(article) {
        return article.urlToImage && article.description;
    }

    function fetchNews(category = 'general') {
        console.log(`Fetching news for category: ${category}`);
        const apiUrl = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;
        console.log(`API URL: ${apiUrl}`);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched:', data);
                if (data.status === 'ok') {
                    newsContainer.innerHTML = '';
                    const articles = data.articles.filter(isValidArticle).slice(0, 8); // Filter and limit to 8 articles
                    const newsGrid = document.createElement('div');
                    newsGrid.classList.add('news-grid');
                    articles.forEach(article => {
                        const articleElement = document.createElement('a');
                        articleElement.classList.add('article');
                        articleElement.href = article.url;
                        articleElement.target = '_blank';
                        articleElement.innerHTML = `
                            <img src="${article.urlToImage}" alt="${article.title}">
                            <h3>${article.title}</h3>
                            <p class="meta">By ${article.author || 'Unknown'} on ${new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>${article.description}</p>
                        `;
                        newsGrid.appendChild(articleElement);
                    });
                    newsContainer.appendChild(newsGrid);
                } else {
                    console.error('Error fetching news:', data.message);
                }
            })
            .catch(error => console.error('Error fetching news:', error));
    }

    function searchNews(query) {
        console.log(`Searching news for query: ${query}`);
        const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;
        console.log(`API URL: ${apiUrl}`);
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched:', data);
                if (data.status === 'ok') {
                    newsContainer.innerHTML = '';
                    const articles = data.articles.filter(isValidArticle).slice(0, 8); // Filter and limit to 8 articles
                    const newsGrid = document.createElement('div');
                    newsGrid.classList.add('news-grid');
                    articles.forEach(article => {
                        const articleElement = document.createElement('a');
                        articleElement.classList.add('article');
                        articleElement.href = article.url;
                        articleElement.target = '_blank';
                        articleElement.innerHTML = `
                            <img src="${article.urlToImage}" alt="${article.title}">
                            <h3>${article.title}</h3>
                            <p class="meta">By ${article.author || 'Unknown'} on ${new Date(article.publishedAt).toLocaleDateString()}</p>
                            <p>${article.description}</p>
                        `;
                        newsGrid.appendChild(articleElement);
                    });
                    newsContainer.appendChild(newsGrid);
                } else {
                    console.error('Error fetching news:', data.message);
                }
            })
            .catch(error => console.error('Error fetching news:', error));
    }

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            currentCategory = event.target.getAttribute('data-category');
            console.log(`Category clicked: ${currentCategory}`);
            fetchNews(currentCategory);
            if (window.innerWidth <= 768) {
                menu.classList.add('hidden'); // Close the menu after clicking a category in mobile view
            }
        });
    });

    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-input').value;
        if (query) {
            searchNews(query);
        }
    });

    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.textContent = '🌞'; // Sun icon for light mode
        } else {
            themeIcon.textContent = '🌜'; // Moon icon for dark mode
        }
    });

    menuToggleButton.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    // Fetch general news by default
    fetchNews();
});
