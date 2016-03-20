require('./utils');

// Require the SASS file, compile it to CSS and insert it on the page
require('../sass/styles.scss');
require('../../node_modules/prismjs/themes/prism-okaidia.css');
require('../../node_modules/prismjs/prism.js');
require('../../node_modules/prismjs/components/prism-bash.js');

// Store a reference to the Jade template function
var template = require('../jade/index.jade');

// Store all articles in array
var articleTemplate = require('../jade/_article-template.jade');
var articles = [];

articles.push({
  id: 1,
  date: '2016-03-03',
  title: 'Updating nested properties dynamically in MongoDB',
  content: require('../../articles/updating-nested-properties-dynamically-in-mongodb.md')
});

articles.push({
  id: 2,
  date: '2016-03-17',
  title: 'Docker 101',
  content: require('../../articles/docker-101.md')
});

articles.map(a => {
  a.hash = '#' + slugify(a.title);
  return a;
});

// Render the template on the page
document.querySelector('body').innerHTML = template({
  articles: articles
});

// Render the article matching the hash (on initial load)
findAndRenderArticle(window.location.hash);

// Render the right article when changing the select
var articleSelect = getElements('.articles')[0];
articleSelect.addEventListener('change', function() {
  findAndRenderArticle(this.options[this.selectedIndex].getAttribute('hash'));
});

// Render the right select when user goes backward/forward in browser history
window.onpopstate = function(e) {
  findAndRenderArticle(window.location.hash);
  if (window.location.hash !== "") {
    document.querySelector('.articles [hash="' + window.location.hash + '"]').selected = true;
  } else {
    document.querySelector('.articles [value="0"]').selected = true;
  }
};

function findAndRenderArticle(hash) {
  // Pick the chosen article
  var article = articles.filter((a) => a.hash === hash)[0];
  
  // Remove existing article if it exists
  var existingArticle = document.querySelector('.article');
  if (existingArticle) remove(existingArticle);

  if (article) {
    // Create new article
    var articlePlaceholder = document.createElement('div');
    articlePlaceholder.classList.add('article');
    
    // Set the article content and append to DOM
    articlePlaceholder.innerHTML = articleTemplate({
      author: 'Theodor C. Listov Lindekaer',
      date: article.date,
      title: article.title,
      content: article.content
    })
    document.querySelector('body').appendChild(articlePlaceholder);

    // Change hash accordingly
    history.pushState(null, null, article.hash);

    // Set code hightlighting
    var codeNodes = getElements('code[class^="lang-"]');
    for (let node of codeNodes) {
      node.className = node.className.replace('lang', 'language');
      node.parentNode.classList.add(node.className);
    }
    Prism.highlightAll();
    
    // Handle animation
    setTimeout(() => articlePlaceholder.classList.add('active'), 10);  
  } else {
    history.pushState(null, null, '#');
  }
}