$(document).ready(function() {
  console.log('ready');
  // Handle upload event
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
              if (data["status"] == "False") {
                document.getElementById("results").innerHTML = "Nope";
              } else { 
                clearInterval(poller);
                document.getElementById("results").innerHTML = data["status"];
              }
            },
            //dataType: "json",
            //complete: checkJob, 
            //timeout: 30000 
          });
        }
      },
      error: function(error) {
        console.log('Error ${error}')
      },
    });
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


