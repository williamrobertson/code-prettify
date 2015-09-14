// Utility to load and prettify text file from server (subject to cross-site scripting rules - must be same domain etc):
// e.g.
// <body onload="readFile('../code/ind.sql', 'container');">
// ...
// <pre id="container"></pre>
// William Robertson 2015 www.williamrobertson.net
//
function getFileFromServer(url, doneCallback) {
  var xhr;

  xhr = new XMLHttpRequest();

  // Handle symbols e.g. copyright in text file - otherwise HTTP may have trouble interpreting them during GET:
  // (Not available in Internet Explorer up to version 8 at time of writing)
  if (xhr.overrideMimeType) {
    xhr.overrideMimeType('application/x-javascript; charset=ISO-8859-1');
  }

  xhr.onreadystatechange = handleStateChange;
  xhr.open("GET", url, true);
  xhr.send();

  function handleStateChange() {
    if (xhr.readyState === 4) {
      doneCallback(xhr.status == 200 ? xhr.responseText : null);
    }
  }
}

function readFile(url, targetElement, prettify) {
  getFileFromServer(url, function(text) {
    var textFileContainer = document.getElementById(targetElement);
    var cRe  = '/\u00A9/';
    var cSym = '&copy;';

    if (text === null) {
      var err = location.pathname + " could not load the specified file '" + url + "'";
      window.alert(err);
      textFileContainer.innerHTML = textFileContainer.innerHTML + err;
    }
    else {
      var newText = text.replace(cRe,cSym);

      textFileContainer.setAttribute("class", "prettyprint linenums lang-plsql");
      textFileContainer.innerHTML = newText;

      // Apply prettify unless false
      if (!!prettify || prettify == undefined) {
        prettyPrint(textFileContainer);
      }

    }
  })
};

// vim: ts=2 sw=2
