//button
var slide = $("#slide1 .slide-pointer");
var fill = $("#slide1 .slide-fill");
var indicator = $("#slide1 .slide-indicator-numeric");
var up = $("#slide1 .increment");
var down = $("#slide1 .decrement");
var button = $("#button1");
var height;
var max = 100;
var min = 0;

//Copy Control Value to Indicator Value
$(button).on("click", function( event, ui ) {
  height = parseInt($(slide).position().top);
  $("#slide2 .slide-fill").css({"top":height, "height":max-height});
  $("#slide2 .slide-indicator-numeric").text(max-height.toFixed(2));
  $.post( "slide/update", { slide: max-height } );
});

setInterval(function() {
    $.get( "slide/read", function( data ) {
		data.slide = parseInt(data.slide);
		height = parseInt(100-data.slide);
		$("#slide2 .slide-fill").css({"top":height, "height":data.slide});
		$("#slide2 .slide-indicator-numeric").text(data.slide);  
	});
}, 500);

//Increment control value by 1
$(up).on("click", function( event, ui ) {
  height = parseInt($(slide).position().top);
  height = height - 1;
  if(height < min){ height = min; }
  if(height > max){ height = max; }
  $(slide).css({'top':height})
  $(fill).css({'top':height, 'height':max-height});
  $(indicator).text(max-height.toFixed(2));
});
//decrement control value by 1
$(down).on("click", function( event, ui ) {
  height = parseInt($(slide).position().top);
  height = height + 1;
  if(height < min){ height = min; }
  if(height > max){ height = max; }
  $(slide).css({'top':height})
  $(fill).css({'top':height, 'height':max-height});
  $(indicator).text(max-height.toFixed(2));
});

//Update control value based on slider position
$(slide).draggable({
  axis: 'y',
  containment: '#slide1',
  stop: function(event, ui) {
    if(ui.position.top>max) {   
      $(slide).animate({"top": "100px"},600);
    }
    else if(ui.position.top<0) {
      $(slide).animate({"top": "0px"},600);
    }                                              
  }
}).on( "drag", function( event, ui ) {
  height = parseInt($(slide).position().top);
  if(height < min){ height = min; }
  if(height > max){ height = max; }
    $(fill).css({'top':height, 'height':max-height});
    $(indicator).text(max-height.toFixed(2));
});

//Enable Touch Pad Devices
var startY;
slide[0].addEventListener('touchstart', function(e) {
  e.preventDefault();
  height = parseInt($(slide).position().top);
  startY = e.targetTouches[0].pageY;
}, false);
slide[0].addEventListener("touchmove", function(e) {
  e.preventDefault();
  var diffY = e.changedTouches[0].pageY - startY;
  var newHeight = height + diffY;
  if(newHeight < min){ newHeight = min; }
  if(newHeight > max){ newHeight = max; }
  slide.css({'top':newHeight}); 
  $(fill).css({'top':newHeight, 'height':max-newHeight});
  $(indicator).text(max-newHeight.toFixed(2));
}, false);
slide[0].addEventListener("touchend", function(e) {
}, false);