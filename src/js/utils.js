/*
-----------------------------------------------------------------------------------
|
| Utility functions
|
-----------------------------------------------------------------------------------
*/

window.getElements = function(query) {
  return Array.apply(null, document.querySelectorAll(query));
}

window.remove = function(element) {
   element.parentNode.removeChild(element); 
}

window.create = function(element, text, cssClass) {
  var node = document.createElement(element);
  node.textContent = text;
  if (cssClass) {
    node.classList.add(cssClass);
  }
  return node;
}

window.insertAfter = function(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.slugify = function(str) {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}