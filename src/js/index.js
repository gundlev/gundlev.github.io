// Require the SASS file, compile it to CSS and insert it on the page
require('../sass/styles.scss');

// Store a reference to the Jade template function
var template = require('../jade/index.jade');

// Store all articles in array
var articleTemplate = require('../jade/_article-template.jade');
var articles = [];
articles.push({
  id: 1,
  date: '2016-03-01',
  title: 'Test article',
  content: require('../../articles/test.md')
});
articles.push({
  id: 2,
  date: '2016-03-03',
  title: 'Work',
  content: require('../../articles/work.md')
});

// Render the template on the page
document.querySelector('body').innerHTML = template({
  articles: articles
});

// Attach events to all article links
var articleSelect = getElements('.articles')[0];
articleSelect.addEventListener('change', function() {
  
  // Pick the chosen article
  var article = articles.filter((a) => a.id === parseInt(this.value))[0];
  
  // Remove existing article if it exists
  var existingArticle = document.querySelector('.article');
  if (existingArticle) remove(existingArticle);

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

  // Handle animation
  setTimeout(() => articlePlaceholder.classList.add('active'), 10);
  
});

/*
-----------------------------------------------------------------------------------
|
| Utility functions
|
-----------------------------------------------------------------------------------
*/

function getElements(query) {
  return Array.apply(null, document.querySelectorAll(query));
}

function remove(element) {
   element.parentNode.removeChild(element); 
}

function create(element, text, cssClass) {
  var node = document.createElement(element);
  node.textContent = text;
  if (cssClass) {
    node.classList.add(cssClass);
  }
  return node;
}

function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}