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

$('table').DataTable({
  "order": [[ 1, "desc" ]],
  "columnDefs": [
    { "orderable": false, "targets": [2,3,4] },
    { "searchable": false, "targets": [1,2,3,4] }
  ]
});

$('time').timeago();

var SIM = {
  delete : function (event){
    // if not confirmed just ignore request
    var confirmed = window.confirm("Do you really want to delete this simulation with all attachments?");
    if(!confirmed) return event.preventDefault();
    // otherwise it automatically redirects to delete url
  }
}

