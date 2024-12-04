
$("#login-section").css({ display: "block" });
$("#dashboard-section").css({ display: "none" });
$("#field-section").css({ display: "none" });
$("#crop-section").css({ display: "none" });
$("#staff-section").css({ display: "none" });
$("#monitoring-section").css({ display: "none" });
$("#vehicle-section").css({ display: "none" });
$("#equipment-section").css({ display: "none" });

function login() {
  Swal.fire({
    title: "Welcome",
    text: "You have successfully logged In",
    icon: "success"
  });
  $("#login-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "block" });
  $("#field-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });

  $("#navbar").css({ display: "block", position: "fixed", top: "0", left: "0", width: "100%", zIndex: "1000", })
  $("#dashboard-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#field-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#crop-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#staff-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#monitoring-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#vehicle-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });

  $("#equipment-section").css({
    marginTop: $("#navbar").outerHeight() + "px",
  });
}
$("#nav-dashboard").on("click", () => {
  $("#dashboard-section").css({ display: "block" });
  $("#field-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-field").on("click", () => {
  $("#field-section").css({ display: "block" });
  $("#dashboard-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-crop").on("click", () => {
  $("#crop-section").css({ display: "block" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-staff").on("click", () => {
  $("#staff-section").css({ display: "block" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-monitor-log").on("click", () => {
  $("#monitoring-section").css({ display: "block" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#vehicle-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-vehicle").on("click", () => {
  $("#vehicle-section").css({ display: "block" });
  $("#monitoring-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
  $("#equipment-section").css({ display: "none" });
});

$("#nav-equipment").on("click", () => {
  $("#equipment-section").css({ display: "block" });
  $("#vehicle-section").css({ display: "none" });
  $("#monitoring-section").css({ display: "none" });
  $("#staff-section").css({ display: "none" });
  $("#crop-section").css({ display: "none" });
  $("#dashboard-section").css({ display: "none" });
  $("#field-section").css({ display: "none" });
});
