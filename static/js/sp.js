$(document).ready(function() {
  console.log('ready');

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 400) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  // Handle upload event
  $(document).ready(function()
  {
   $("#drop-area").on('dragenter', function (e){
    e.preventDefault();
    $(this).css('background', '#BBD5B8');
   });

   $("#drop-area").on('dragover', function (e){
    e.preventDefault();
   });

   $("#drop-area").on('drop', function (e){
    e.preventDefault();
    var url = e.originalEvent.dataTransfer.getData('text/html').match(/src\s*=\s*"(.+?)"/)[1];
    const data = {img_src: url};

    $.ajax({
      // put your api endpoint here
      url: 'http://0.0.0.0:5000/api/v1/predict/',
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: 'application/json',
      // function callback after success ajax request
      success: function(data) {
        console.log(data)
        document.getElementById("drop-area").innerHTML = "yay";
      },
      error: function(error) {
        console.log('Error ${error}')
      },
    });
    
    return false;
   });
  });

  document.getElementById('text_box').addEventListener('keypress', function(event) {
    if (event.keyCode == 13) {
      event.preventDefault();
      document.getElementById("main_button").click();
    }
  });
  $('#nav_title').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    },700);
  });
  $('#nav_home').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    },700);
  });
  $('#nav_models').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: ($('#models').offset().top)
    },700);
  });
  $('#nav_about').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: ($('#about').offset().top)
    },700);
  });
  $('#nav_timeline').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: ($('#timeline').offset().top)
    },700);
  });
  $('#nav_team').click(function(evt) {
      evt.preventDefault();
    $('html, body').animate({
      scrollTop: ($('#team').offset().top)
    },700);
  });
});