var LazyImageLoader = {
  apply: function(lazyImages) {
    lazyImages.forEach(function(lazyImage) {
      LazyImageLoader.observer.observe(lazyImage);
    });
  },
  observer: new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        var lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        if (typeof lazyImage.dataset.srcset === "undefined") {
        } else {
          lazyImage.srcset = lazyImage.dataset.srcset;
        }
        lazyImage.classList.remove("lazy");
        LazyImageLoader.observer.unobserve(lazyImage);
      }
    });
  })
};

document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  LazyImageLoader.apply(lazyImages);
});

// if ("IntersectionObserver" in window) {
// }
