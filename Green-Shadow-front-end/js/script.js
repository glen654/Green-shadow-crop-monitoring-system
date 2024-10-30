$("#login-section").css({display:'none'});
$("#navbar-section").css({display: 'block'});

$(document).ready(function(){
    $(".hamburger .hamburger__inner").click(function(){
      $(".wrapper").toggleClass("active")
    })

    $(".top_navbar .fas").click(function(){
       $(".profile_dd").toggleClass("active");
    });
})