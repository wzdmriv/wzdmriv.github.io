var Events = {
"monthly": [
{
"id": 1,
"name": “予定”,
"startdate": "2018-08-27",
"enddate": "",
"color": "#e84d38"
},
{
"id": 2,
"name": "予定2",
"startdate": "2018-08-28",
"enddate": "",
"color": "#53c3db"
}
]
};
 
$(window).load( function() {
$('#mycalendar').monthly({
mode: 'event',
dataType: 'json',
events: sampleEvents,
eventList:false
});
});