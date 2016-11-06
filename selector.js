// Transverse DOM using BFS to find and match items

var traverseDomAndCollectElements = function(matchFunc, startEl) {

  
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  let queue = [startEl];
  while(queue.length){
    currentEl = queue.shift()

    if(matchFunc(currentEl)){
      resultSet.push(currentEl)
    }
    console.log(currentEl.children)
    queue.push(...currentEl.children)
  }
  return resultSet;
};

// Decides whether selector is class, id, tag, or tag.class
var selectorTypeMatcher = function(selector) {
  var firstChar = selector.charAt(0);
  if(firstChar === "#"){
    return 'id';
  } else if(firstChar === "."){
    return 'class';
  } else{
    for(var i = 0; i < selector.length; i++) {
      if(selector.charAt(i) === '.') {
        return "tag.class";
      }
    }
    return "tag";
  }
}

// Function handler based on selector type
var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") {
    matchFunction = function(element){
      return element.id === selector.slice(1);
    }
  } else if (selectorType === "class") {
    matchFunction = function (element) {
      var classes = element.className.split(' ');
      return classes.indexOf(selector.slice(1)) !== -1;
    };
  } else if (selectorType === "tag.class") {
    matchFunction = function (element) {

        var tag = selector.split('.')[0];
        var theClass = selector.split('.')[1];
        var classes = element.className.split(' ');

        return classes.indexOf(theClass) !== -1
               && element.tagName.toLowerCase() === tag.toLowerCase();
    };
  } else if (selectorType === "tag") {
    matchFunction = function(el){
      return el.tagName && (el.tagName.toLowerCase() === selector.toLowerCase());
    }
  }
  return matchFunction;
};

// $ function similar to jQuery Implementation
var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
