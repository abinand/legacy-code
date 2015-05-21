function daysBetween(date1, date2){
	var DAY = 1000*60*60*24; 
	return Math.floor((Math.abs(date1 - date2))/DAY);
	}

function formatToDisplay(hours, minutes, seconds)
{
	return hours + " hours" + minutes + "minutes" + seconds + " seconds";
}
	
RegExp.escape = function(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

$jq(document).ready(function(){	
	$jq("#proPock td.expiry").each(
	function(index, data){
		var dateString = $jq(data).text().replace("at","");
		var timezoneString = dateString.substring(dateString.lastIndexOf(" ") + 1);
		var date = new Date(Date.parse(dateString));
		var currentDate = new Date(Date.now());
			if(!isNaN(date))
			{
				if(daysBetween(currentDate, date)==0)
				{
					var dateDifference = new Date(Math.abs(date.getTime()-currentDate.getTime()));
					var totalSeconds = Math.ceil(dateDifference/(1000));
					seconds = totalSeconds % 60;
					var minutes = ((totalSeconds - seconds)/60)%60;
					var hours = (totalSeconds - minutes*60 - seconds)/3600;
					
					var dateText = formatToDisplay(hours,minutes,seconds);
					$jq(this).text(dateText).addClass("countDown");
				}
				else
				{
					var originalText = $jq(this).text();
					$jq(this).text(originalText.replace(originalText.substring(originalText.lastIndexOf(":"), originalText.lastIndexOf(":")+ 3), ""));
				}
			}
		}
	);
});

function decrementTime(timeString)
{
    var regexTimer = 
	var timeArray = timeString.split(':');
	timeArray[2]--;
	if(timeArray[2] < 0)
	{
		timeArray[2] = 59;
		timeArray[1]--;
		if(timeArray[1] < 0)
		{
			timeArray[1] = 59;
			timeArray[0]--;
			if(timeArray[0] < 0)
			{
				return "Expired";
			}
		}
	}
	return pad(timeArray[0],2) + ":" + pad(timeArray[1],2) + ":" + pad(timeArray[2],2);
}

window.setInterval(
function(){
	$jq("#proPock td.expiry.countDown").each(
	function(index, data){
		$jq(this).text(decrementTime($jq(data).text().trim()));
	});
}, 1000);
