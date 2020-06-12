function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! Lazy Load 2.0.0-rc.2 - MIT license - Copyright 2007-2019 Mika Tuupola */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e(t) : "function" == typeof define && define.amd ? define([], e) : t.LazyLoad = e(t);
}("undefined" != typeof global ? global : this.window || this.global, function (t) {
  "use strict";

  function e(t, e) {
    this.settings = s(r, e || {}), this.images = t || document.querySelectorAll(this.settings.selector), this.observer = null, this.init();
  }

  "function" == typeof define && define.amd && (t = window);

  var r = {
    src: "data-src",
    srcset: "data-srcset",
    selector: ".lazyload",
    root: null,
    rootMargin: "0px",
    threshold: 0
  },
      s = function s() {
    var t = {},
        e = !1,
        r = 0,
        o = arguments.length;
    "[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (e = arguments[0], r++);

    for (; r < o; r++) {
      !function (r) {
        for (var _o in r) {
          Object.prototype.hasOwnProperty.call(r, _o) && (e && "[object Object]" === Object.prototype.toString.call(r[_o]) ? t[_o] = s(!0, t[_o], r[_o]) : t[_o] = r[_o]);
        }
      }(arguments[r]);
    }

    return t;
  };

  if (e.prototype = {
    init: function init() {
      if (!t.IntersectionObserver) return void this.loadImages();
      var e = this,
          r = {
        root: this.settings.root,
        rootMargin: this.settings.rootMargin,
        threshold: [this.settings.threshold]
      };
      this.observer = new IntersectionObserver(function (t) {
        Array.prototype.forEach.call(t, function (t) {
          if (t.isIntersecting) {
            e.observer.unobserve(t.target);

            var _r = t.target.getAttribute(e.settings.src),
                _s = t.target.getAttribute(e.settings.srcset);

            "img" === t.target.tagName.toLowerCase() ? (_r && (t.target.src = _r), _s && (t.target.srcset = _s)) : t.target.style.backgroundImage = "url(" + _r + ")";
          }
        });
      }, r), Array.prototype.forEach.call(this.images, function (t) {
        e.observer.observe(t);
      });
    },
    loadAndDestroy: function loadAndDestroy() {
      this.settings && (this.loadImages(), this.destroy());
    },
    loadImages: function loadImages() {
      if (!this.settings) return;
      var t = this;
      Array.prototype.forEach.call(this.images, function (e) {
        var r = e.getAttribute(t.settings.src),
            s = e.getAttribute(t.settings.srcset);
        "img" === e.tagName.toLowerCase() ? (r && (e.src = r), s && (e.srcset = s)) : e.style.backgroundImage = "url('" + r + "')";
      });
    },
    destroy: function destroy() {
      this.settings && (this.observer.disconnect(), this.settings = null);
    }
  }, t.lazyload = function (t, r) {
    return new e(t, r);
  }, t.jQuery) {
    var _r2 = t.jQuery;

    _r2.fn.lazyload = function (t) {
      return t = t || {}, t.attribute = t.attribute || "data-src", new e(_r2.makeArray(this), t), this;
    };
  }

  return e;
});
"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});