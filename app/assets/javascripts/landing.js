$( document ).ready(function() {
  // setTimeout(function(){
  //   $('.video-overlay').hide();
  // }, 3000);

  // $("body").css('opacity', 0).animate( { opacity: 1 }, 5000)
  // $("h1.home-widget-title").textillate({ in: { effect: 'flip', delay: 50 } });

  $("body").css("background-color", "black");
  $(".video-overlay").css("opacity", 0);
  $("nav").css("opacity", 0);
  $("video").css("opacity", 0);
  $("header").css("opacity", 0);
  $(".recent-searches").css("opacity", 0);
  $("footer").css("opacity", 0);

  $(".assembly").transition({ opacity: 0, delay: 4000, easing: "out" }, 500);
  $(".video-overlay").transition({ opacity: 1, delay: 5000 }, 500);
  $("nav").transition({ opacity: 1, delay: 6000 }, 500);
  $(".recent-searches").transition({ opacity: 1, delay: 7000 }, 500);
  $("footer").transition({ opacity: 1, delay: 7000 }, 500);
  $("video").transition({ opacity: 1, delay: 6000 }, 500);
  $("header").transition({ opacity: 1, delay: 7000, easing: "in" }, 500);
  $("header h1").textillate({
    initialDelay: 3000,
    in: {
      effect: 'flipInX',
      delay: 100,
    }
  });
  $("header h2").textillate({
    initialDelay: 3500,
    in: {
      effect: 'flipInX',
      delay: 80,
    }
  });

});
