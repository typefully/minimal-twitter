// Removing promoted tweets
function scrollStop(callback) {
  // Make sure a valid callback was provided
  if (!callback || typeof callback !== "function") return;

  // Setup scrolling variable
  var isScrolling;

  // Listen for scroll events
  window.addEventListener(
    "scroll",
    function(event) {
      // Clear our timeout throughout the scroll
      window.clearTimeout(isScrolling);

      // Set a timeout to run after scrolling ends
      isScrolling = setTimeout(function() {
        // Run the callback
        callback();
      }, 66);
    },
    false
  );
}

function removeAds() {
  var spanTags = document.getElementsByTagName("span");
  var promotedText = "Promoted";
  var found;

  for (var i = 0; i < spanTags.length; i++) {
    if (spanTags[i].textContent == promotedText) {
      found = spanTags[i];
      found.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        found.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
          .parentNode.parentNode
      );
    }
  }

  return;
}

scrollStop(function() {
  removeAds();
});

setTimeout(() => {
  removeAds();
}, 2000);
