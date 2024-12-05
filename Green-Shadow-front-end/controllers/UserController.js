$(document).ready(function () {
  $(window).on("hashchange", function () {
    const hash = window.location.hash;

    if (hash === "#login-section") {
      $("#dashboard-section").css("display", "none");
      $("#login-section").css("display", "block");
    } else if (hash === "#dashboard-section") {
      $("#dashboard-section").css("display", "block");
      $("#login-section").css("display", "none");
      $("#navbar").css({
        display: "block",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        zIndex: "1000",
      });

      const navbarHeight = $("#navbar").outerHeight();
      $(
        "#field-section, #crop-section, #staff-section, #monitoring-section, #vehicle-section, #equipment-section"
      ).css({
        marginTop: navbarHeight + "px",
      });
    }
  });
});

// $(window).on("hashchange", function () {
//   // if (window.location.hash === "#login-section") {
//   //   $("#dashboard-section").css("display", "block");
//   //   $("#login-section").css("display", "none");
//   //   $("#navbar").css({
//   //     display: "block",
//   //     position: "fixed",
//   //     top: "0",
//   //     left: "0",
//   //     width: "100%",
//   //     zIndex: "1000",
//   //   });

//   //   $("#dashboard-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#field-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#crop-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#staff-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#monitoring-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#vehicle-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });

//   //   $("#equipment-section").css({
//   //     marginTop: $("#navbar").outerHeight() + "px",
//   //   });
//   // }

// });

function signUp() {
  event.preventDefault();
  var email = $("#register_email").val();
  var password = $("#register_password").val();
  var role = $("#register_role").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/auth/signup",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password,
      role: role,
    }),
    success: (response) => {
      Swal.fire({
        title: "Welcome",
        text: "You have successfully Signed Up",
        icon: "success",
      });
      console.log("Signup successful:", response);
      localStorage.setItem("token", response.token);
      window.location.href = "#dashboard-section";
    },
    error: (error) => {
      Swal.fire({
        title: "Welcome",
        text: "Sign Up Unsuccessfull",
        icon: "error",
      });
      console.error("Signup failed:", error);
      console.error("Token is missing in the response");
    },
  });
}

function userLogin() {
  event.preventDefault();
  var email = $("#login_email").val();
  var password = $("#login_password").val();

  $.ajax({
    url: " http://localhost:5050/green-shadow/api/v1/auth/signin",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: (response) => {
      Swal.fire({
        title: "Welcome to Green Shadow",
        text: "You have successfully Logged In",
        icon: "success",
      });
      console.log("Signup successful:", response);
      localStorage.setItem("token", response.token);
      window.location.href = "#dashboard-section";
      console.log("Hash after login:", window.location.hash);
    },
    error: (error) => {
      Swal.fire({
        title: "Welcome to Green Shadow",
        text: "Login unsuccessfull",
        icon: "error",
      });
      console.error("Signup failed:", error);
    },
  });
}
