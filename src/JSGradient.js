(function () {
  function JSGradient(colors, count) {
    var start = convertToRGB(colors[0]),
        end = convertToRGB(colors[1]),
        alpha = 0.0;
        
    this.colors = [];
    if(count && count > 0)
      this.count = count;

    for (var i = 0; i < this.count; i++) {
      alpha += (1 / this.count);

      var r = start[0] * alpha + end[0] * (1 - alpha),
          g = start[1] * alpha + end[1] * (1 - alpha),
          b = start[2] * alpha + end[2] * (1 - alpha);

      this.colors.push("#" + convertToHex([r, g, b]));

    }

    function hex(c) {
      var letters = "0123456789abcdef", i = parseInt(c);

      if (i == 0 || isNaN(c)) return "00";

      i = Math.round(Math.min(Math.max(0, i), 255));
      return letters.charAt((i - i % 16) / 16) + letters.charAt(i % 16);
    }

    function convertToHex(rgb) {
      return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
    }

    function trim(str) {
      return (str.charAt(0) == '#') ? str.substring(1, 7) : str;
    }

    function convertToRGB(hex) {
      var r = parseInt((trim(hex)).substring(0, 2), 16),
          g = parseInt((trim(hex)).substring(2, 4), 16),
          b = parseInt((trim(hex)).substring(4, 6), 16);

      return [r, g, b];
    }

    return this.colors.reverse();
  }

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = JSGradient;
  } else {
    if (typeof define === 'function' && define.amd) {
      define([], function () {
        return JSGradient;
      });
    } else {
      window.JSGradient = JSGradient;
    }
  }
})();