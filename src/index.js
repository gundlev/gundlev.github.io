// Require the SASS file, compile it to CSS and insert it on the page
require('./styles.scss');

// Store a reference to the Jade template function
var template = require('./index.jade');

// Store all articles in array
var articles = [];
articles.push({
  'id': 1,
  'title': 'Test article',
  'content': require('../articles/test.md')
});
articles.push({
  'id': 2,
  'title': 'Work',
  'content': require('../articles/work.md')
});

// Render the template on the page
document.write(template({
  articles: articles
}));

// Attach events to all article links
var articleSelect = getElements('.articles')[0];
articleSelect.addEventListener('change', function() {
  
  // Pick the chosen article
  var article = articles.filter((a) => a.id === parseInt(this.value))[0];
  
  // Create article placeholder (after removing previous)
  var existingArticle = document.querySelector('.article');
  if (existingArticle) remove(existingArticle);

  // Create new article
  var articlePlaceholder = document.createElement('div');
  articlePlaceholder.classList.add('article');
  articlePlaceholder.innerHTML = article.content;
  document.querySelector('body').appendChild(articlePlaceholder);
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