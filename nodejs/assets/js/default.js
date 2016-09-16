/* global $, io */

var Flash = {
  clear : function()
  {
    $('#flash').html('');
  },

  message : function(msg, type, target)
  {
    this.clear();

    var Alert = document.createElement("div");

    $(Alert)
      .addClass('alert alert-'+type+' alert-dismissible alert-condensed fade in')
      .attr('role', 'alert')
      .html('<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
            '<span aria-hidden="true">×</span></button>'+msg);

    if(typeof(target) !== 'undefined') target[0].appendChild(Alert);
    else $('#flash')[0].appendChild(Alert);

    // auto-dismiss alert after 2 seconds
    setTimeout(function(){ $(Alert).fadeOut(2000); }, 4000);
  },

  error : function(msg, target)
  {
    this.message(msg, 'danger', target)
  },

  success : function(msg, target)
  {
    this.message(msg, 'info', target)
  },

};

var File = {
  delete : function (id) {
    // ask for confirmation before deletion
    var confirmed = window.confirm('Are you sure you want to delete this file?');

    if(confirmed) window.location.href = "/file/delete/"+id;
    return false;
  }
};

$(document).ready(function() {
  $('time').timeago();
});