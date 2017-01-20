  var canvsasHeight = window.innerHeight,
      canvsasWidth = window.innerWidth;
  var canvas = document.getElementById('filterpic');
  var blurDiv = document.getElementById('blur-div');
  blurDiv.style.width = canvsasWidth + "px";
  blurDiv.style.height = canvsasHeight + "px";
  var radius = 50;
  var canvas = document.getElementById('filterpic');
  var context = canvas.getContext('2d');
  canvas.height = canvsasHeight;
  canvas.width = canvsasWidth;

  window.onresize = function() {
      canvsasHeight = window.innerHeight;
      canvsasWidth = window.innerWidth;
      blurDiv.style.width = canvsasWidth + "px";
      blurDiv.style.height = canvsasHeight + "px";
      canvas.height = canvsasHeight;
      canvas.width = canvsasWidth;
  };
  var radius = 50;
  var clippingRegion = { x: 200, y: 133, r: radius };
  var image = document.createElement("img");
  image.src="images/blurimage.jpg";
  image.style.width = canvsasWidth +"px";
  image.style.height = canvsasHeight+ "px";
  document.body.appendChild(image);
  image.onload = function() {
      initCanvas();
  }

  function initCanvas() {
      draw(image, clippingRegion);
  }

  function draw(image, clippingRegion) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      setClippingRegion(clippingRegion);
      context.drawImage(image, 0, 0);
      context.restore();
  }

  function setClippingRegion(clippingRegion) {
      context.beginPath();
      context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, 2 * Math.PI);
      context.clip();
  }

  function show() {
      var timer = setInterval(function() {
          var limit = Math.max(canvsasHeight, canvsasWidth);
          clippingRegion.r += 20;
          draw(image, clippingRegion);
          if (clippingRegion.r > 2 * limit) {
              clearInterval(timer);
          }
      }, 20);
  }

  function reset() {
      var xlimit = Math.random() * (canvsasWidth - 2 * radius) + radius;
      console.log(xlimit);
      var ylimit = Math.random() * (canvsasHeight - 2 * radius) + radius;
      clippingRegion = { x: xlimit, y: ylimit, r: radius };
      initCanvas();
  }
