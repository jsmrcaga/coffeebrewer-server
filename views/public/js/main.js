$(document).ready(function() {
  var now = moment();
  $('#hours').html(now.format('HH'));
  $('#minutes').html(now.format('mm'));
  var divs = '';
  for (var i = 0; i < 24; i++) {
    if (i < 10) {
      divs += '<span class="hour" onclick="select(\'0' + i + '\',\'hours\')">0' + i + '</span>';
    } else {
      divs += '<span class="hour" onclick="select(\'' + i + '\',\'hours\')">' + i + '</span>';
    }
  }
  $('#hoursSelection').html(divs).css('visibility', 'hidden');
  divs = '';
  for (i = 0; i < 60; i++) {
    if (i < 10) {
      divs += '<span class="minute" onclick="select(\'0' + i + '\',\'minutes\')">0' + i + '</span>';
    } else {
      divs += '<span class="minute" onclick="select(\'' + i + '\',\'minutes\')">' + i + '</span>';
    }
  }
  $('#minutesSelection').html(divs).css('visibility', 'hidden');
});

function showSelection(selector) {
  $('#' + selector + 'Selection').css('visibility', 'visible');
}
function hideSelection(selector) {
  $('#' + selector + 'Selection').css('visibility', 'hidden');
}

function select(value, selector) {
  $('#' + selector).html(value);
  hideSelection(selector);
}

function launchCoffee(){
  // var url = window.location.host + '/brew';
  var url = `http://${location.host}/brew`;
  var data = {
    app_key: "jaimeleCafedu60!!",
    time: moment($('#hours').html() + $('#minutes').html(), 'HHmm').format('x')
  }
  $.ajax({
    url: url,
    type: 'POST',
    data : data,
    success: function(result, status){
      if(result){
        if(result.success == false || result.output == null){
          showMessage('error', 'request failed while trying to reach the server');
        } else {
          showMessage('success', 'coffee is on the way !');
        }
      } else {
        showMessage('error');
      }
    },
    error: function(result, status, error){
      showMessage('error');
    }
  });
}

function cancelCoffee() {
  var url = window.location.host + '/cancel';
  var data = {};
  $.ajax({
    url: url,
    type: 'POST',
    data : data,
    success: function(result, status){
      if(result){
        if(result.success == false || result.outoutput == null){
          showMessage('error', 'request failed while trying to reach the server');
        } else {
          showMessage('success', 'coffee has been successfully cancelled !');
        }
      } else {
        showMessage('error');
      }
    },
    error: function(result, status, error){
      showMessage('error');
    }
  });
}

function showMessage(type, message){
  var txt = '';
  switch(type){
    case 'error':
      txt = '<i class="fa fa-times" aria-hidden="success"></i>Error : '+ (message || 'unknown error');
      break;
    case 'success':
      txt = '<i class="fa fa-check" aria-hidden="error"></i>Coffee is on the way !';
      break;
    default:
      txt = 'Unknown error : ' + message;
  }
  $('#informationMessage').html(txt).hide().slideDown(1500);;
  setTimeout(function(){
    $('#informationMessage').show().slideUp(1500);
  }, 6000);

}
