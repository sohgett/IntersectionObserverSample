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
  var body = document.getElementsByTagName("body");
  var img = document.createElement("img");
  img.setAttribute("src", "dummy.svg");
  img.setAttribute("data-src", "real.svg");
  img.setAttribute("class", "lazy");
  // LazyImageLoader.apply([img]);
  body[0].appendChild(img);

  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  LazyImageLoader.apply(lazyImages);
});
