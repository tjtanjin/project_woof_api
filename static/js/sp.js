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
  $("#mysterious-dog").on('dragenter', function (e){
    e.preventDefault();
    if (document.getElementById("results").value != "pred") {
      document.getElementById("mysterious-dog").src = "./static/img/dog_hovered.png";
    } else {
    //nothing
    }
  });

  $("#mysterious-dog").on('dragleave', function (e){
    e.preventDefault();
    if (document.getElementById("results").value != "pred") {
      document.getElementById("mysterious-dog").src = "./static/img/dog_unhovered.png";
    } else {
    //nothing  
    }
  });
  $("#mysterious-dog").on('dragover', function (e){
    e.preventDefault();
  });
  //$("#drop-area").on('dragover', function (e){
   // e.preventDefault();
  //});
  $("#mysterious-dog").on('drop', function (e){
    e.preventDefault();
    if (document.getElementById("results").value != "pred") {
      document.getElementById("results").value = "pred";
      document.getElementById("mysterious-dog").src = "http://i64.tinypic.com/28vc4n4.gif";
      document.getElementById("results").innerHTML = "Predicting...";
      const url = e.originalEvent.dataTransfer.getData('text/html').match(/src\s*=\s*"(.+?)"/)[1];
      const data = {img_src: url};
      $.ajax({
        // put your api endpoint here
        url: './api/v1/convert/',
        type: "POST",
        data: JSON.stringify(data),
        dataType: "json",
        contentType: 'application/json',
        // function callback after success ajax request
        success: function(data) {
          console.log(data)
          var job_id = data["job_id"]
          //document.getElementById("results").innerHTML = "The dog breed is "+data["breed"]+"!";
          // $(function poll(){
          //   $.ajax({ 
          //     url: 'https://tjtanjin.pythonanywhere.com/api/v1/predict/status/'+job_id,
          //     success: function(data){
          //       document.getElementById("results").innerHTML = data["status"];
          //     },
          //     dataType: "json",
          //     complete: poll, 
          //     timeout: 29000 
          //   });
          // })();
          var poller = setInterval(checkJob, 3000);
          function checkJob() {
            $.ajax({ 
              url: 'https://tjtanjin.pythonanywhere.com/api/v1/predict/status/'+job_id,
              success: function(data){
                //works only because there is only one worker on the free server, not to be generalized
                clearInterval(poller);
                document.getElementById("results").value = "idle";
                if (data["status"] == "False") {
                  document.getElementById("mysterious-dog").src = "./static/img/dog_unhovered.png";
                  document.getElementById("results").innerHTML = "There appears to be an error with the prediction. Please try again. Error Code: 001.";
                } else if (data["status"] == "None") {
                //do nothing
                } else { 
                  document.getElementById("mysterious-dog").src = url;
                  document.getElementById("results").innerHTML = "The dog breed is "+data["breed"]+"!";
                }
              },
              error: function(error) {
                console.log('Error ${error}')
                clearInterval(poller);
                document.getElementById("mysterious-dog").src = "./static/img/dog_unhovered.png";
                document.getElementById("results").value = "idle";
                document.getElementById("results").innerHTML = "There appears to be an error with the prediction. Please try again. Error Code: 002.";
              },
              //dataType: "json",
              //complete: checkJob, 
              //timeout: 30000 
            });
          }
        },
        error: function(error) {
          console.log('Error ${error}')
          document.getElementById("mysterious-dog").src = "./static/img/dog_unhovered.png";
          document.getElementById("results").value = "idle";
          document.getElementById("results").innerHTML = "This prediction only accepts static images. If you are experiencing issues with static images, try dragging them in from a new tab.";
        },
      });
    } else {
      alert("A prediction is already running!");
    }
    return false;
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


