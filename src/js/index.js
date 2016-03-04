// Require the SASS file, compile it to CSS and insert it on the page
require('../sass/styles.scss');
require('../../node_modules/prismjs/themes/prism-okaidia.css');
require('../../node_modules/prismjs/prism.js');

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

  // Change URL accordingly
  history.pushState(null, null, `${slugify(article.title)}.html`)

  // Set code hightlighting
  var codeNodes = getElements('code[class^="lang-"]');
  for (let node of codeNodes) {
    node.className = node.className.replace('lang', 'language');
    node.parentNode.classList.add(node.className);
  }
  Prism.highlightAll();
  
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

function slugify(str) {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}