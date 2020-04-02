$(window).load( function() {
$('#mycalendar').monthly({
    mode: 'event',
    jsonUrl: 'events.json',
    dataType: 'json',
    eventList:true
});
});