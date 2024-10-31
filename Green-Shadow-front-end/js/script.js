$("#login-section").css({display:'none'});
$("#dashboard-section").css({display: 'block'});
$("#field-section").css({display:'none'});

$('#nav-dashboard').on('click', () => {
  $('#dashboard-section').css({display: 'block'});
  $('#field-section').css({display: 'none'});
});

$('#nav-field').on('click', () => {
  $('#dashboard-section').css({display: 'none'});
  $('#field-section').css({display: 'block'});
});