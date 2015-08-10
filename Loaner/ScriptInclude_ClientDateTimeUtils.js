var ClientDateTimeUtils = Class.create();  
ClientDateTimeUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {  
  
//Takes a Single Date/Time Field and returns its time difference from nowDateTime().  
//params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)  
getNowDateTimeDiff: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day  
var diff = gs.dateDiff(gs.nowDateTime(), firstDT, true);  
var timediff = this._calcDateDiff(diffTYPE, diff);  
//return "getNowDateTimeDiff: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;  
return timediff;  
},  
  
//Diff the amount of time between two different Date/Time fields  
//params = sysparm_fdt (the first date/time field), sysparm_sdt (second date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)  
getDateTimeDiff: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var secondDT = this.getParameter('sysparm_sdt'); // Second Date-Time Field  
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day  
var diff = gs.dateDiff(firstDT, secondDT, true);  
var timediff = this._calcDateDiff(diffTYPE, diff);  
//return "getDateTimeDiff: FIRST DT: " + firstDT + " -SECOND DT: " + secondDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;  
return timediff;  
},  
  
//Takes your date/time field and returns the amount of time before now. A positive is time before now, a negative number is after now.  
//params = sysparm_fdt (the first date/time field), sysparm_difftype (time based format to return result. See "_calcDateDiff" function comments)  
getDateTimeBeforeNow: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var diffTYPE = this.getParameter('sysparm_difftype'); // Date-Time Type to return the answer as. Can be second, minute, hour, day  
var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);  
var timediff = this._calcDateDiff(diffTYPE, diff);  
//return "getDateTimeBeforeNow: FIRST DT: " + firstDT + " -DIFFTYPE: " + diffTYPE + " -TIME DIFF: " + timediff;  
return timediff;  
},  
  
//Returns true if it is before now, and false if it is after now.  
//params = sysparm_fdt (the first date/time field)  
getDateTimeBeforeNowBool: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var diff = gs.dateDiff(firstDT, gs.nowDateTime(), true);  
var answer = '';  
if (diff >= 0){answer = 'true';}  
else {answer = 'false';}  
return answer;  
},  
  
//Returns the Date/Time of right now.  
getNowDateTime: function(){  
var now = gs.nowDateTime(); //Now Date/Time  
return now;  
},  
  
//Returns the Date right now.  
getNowDate: function(){  
var now = GlideDate(); //Now Date  
return now.getLocalDate();  
},  
  
//Returns the Time of right now.  
getNowTime: function(){  
var now = GlideTime(); //Now Time  
var modnow = now.getLocalTime().toString().split(' ');  
return modnow[1];  
},  
  
//Takes a date/time field and adds time to it.  
//params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - second, minute, hour, day, week, month, year), sysparm_addtime (amount of time to add based on the type).  
addDateTimeAmount: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var addTYPE = this.getParameter('sysparm_addtype'); //What to add - second (addSeconds()), minute (need to add conversion), hour (need to add conversion), day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())  
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add  
var day = GlideDateTime(firstDT);  
  
if(addTYPE == 'second'){day.addSeconds(addTIME);}  
else if (addTYPE == 'minute'){day.addSeconds(addTIME*60);}  
else if (addTYPE == 'hour'){day.addSeconds(addTIME*(60*60));}  
else if (addTYPE == 'day'){day.addDays(addTIME);}  
else if (addTYPE == 'week'){day.addWeeks(addTIME);}  
else if (addTYPE == 'month'){day.addMonths(addTIME);}  
else if (addTYPE == 'year'){day.addYears(addTIME);}  
else {day.addDays(addTIME);}  
  
//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;  
return day;  
},  
  
//Takes a glide date field and adds time to it.  
//params = sysparm_fdt (the first date/time field), sysparm_addtype (type of time to add - day, week, month, year),sysparm_addtime (amount of time to add based on the type).  
addDateAmount: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date Field  
var addTYPE = this.getParameter('sysparm_addtype'); //What to add - day (addDays()), week (addWeeks()), month (addMonths()), year (addYears())  
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add  
var day = GlideDate();  
day.setValue(firstDT);  
  
if(addTYPE == 'day'){day.addDays(addTIME);}  
else if (addTYPE == 'week'){day.addWeeks(addTIME);}  
else if (addTYPE == 'month'){day.addMonths(addTIME);}  
else if (addTYPE == 'year'){day.addYears(addTIME);}  
else {day.addDays(addTIME);}  
  
//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + day;  
return day;  
},  
  
addTimeAmount: function(){  
var firstDT = this.getParameter('sysparm_fdt'); //First Date-Time Field  
var addTYPE = this.getParameter('sysparm_addtype'); //What  
var addTIME = this.getParameter('sysparm_addtime'); //How much time to add  
var time = GlideTime();  
time.setValue(firstDT);  
  
if(addTYPE == 'second'){time.addSeconds(addTIME);}  
else if (addTYPE == 'minute'){time.addSeconds(addTIME*60);}  
else if (addTYPE == 'hour'){time.addSeconds(addTIME*(60*60));}  
else {time.addSeconds(addTIME);}  
  
var modtime = time.toString().split(' ');  
//return "First Date: " + firstDT + " -Time to Add: " + addTIME + " -Add Type: " + addTYPE + " -Added Time: " + time;  
return modtime[1];  
},  
  
//Private function to calculate the date difference return result in second, minute, hour, day.  
_calcDateDiff: function(diffTYPE, seconds){  
var thisdiff;  
if (diffTYPE == "day"){thisdiff = seconds/86400;}  
else if (diffTYPE == "hour"){thisdiff = seconds/3600;}  
else if (diffTYPE == "minute"){thisdiff = seconds/60;}  
else if (diffTYPE == "second"){thisdiff = seconds;}  
else {thisdiff = seconds;}  
return thisdiff;  
},
 
//Created by KA
//Compare start and end date
compareStartEndDates: function(){
//Client start date
var startDate = this.getParameter('sysparm_start');
//Client end date
var endDate = this.getParameter('sysparm_end');
//Create a GlideDateTime object	
var gdtStart = new GlideDateTime();
	gdtStart.setDisplayValue(startDate);
//Set gtd object to date time selected by client	
var gdtEnd = new GlideDateTime();
	gdtEnd.setDisplayValue(endDate);
//Get number of milliseconds for each date
var startNum = gdtStart.getNumericValue();
var endNum = gdtEnd.getNumericValue();
//Start milliseconds are more than end milliseconds start date is later date	
	if(startNum > endNum) {
	return("ERROR: Start date must be before end date");	
	}
	else if(startNum <= endNum) {
	return true;	
	}
},

//Created by KA

//Check if dates are in the future	
compareFutureDates: function(){
//Client date
var userDate = this.getParameter('sysparm_userDate');
//Now Date
var now = new GlideDateTime();
	now.setDisplayValue(gs.now());
//Timezone
var timeZoneOffSet = now.getTZOffset(); 
// now.setNumericValue(now.getNumericValue() + timeZoneOffSet);  
	gs.log("GDT OFFSET:" + now);
//Get number of milliseconds now date
	var nowNum = now.getNumericValue();
	
//Create a GlideDateTime object
var gdt = new GlideDateTime();
//Set gtd object to date time selected by client
	gdt.setDisplayValue(userDate);
//Get number of milliseconds user date
var userDateNum = gdt.getNumericValue();
//Now milliseconds are more than user milliseconds must be in future
	if(nowNum > userDateNum) {
	return("ERROR: Selected dates must be in the future.");	
	}
	else if(nowNum <= userDateNum) {
	return true;	
	}
},

validateCalendarDate: function(){
//Client date
var userDate = this.getParameter('sysparm_userDate');
//Check date format is in mm-dd-yyyy
if (!/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(userDate)) {
	return("ERROR: Format must be YYYY-MM-DD. Please use the calendar picker.");
	}
	else {
		return true;
	}
	
	// Take the string and split it by the dash delimiter		
	var format = userDate.split("-");
	// Parse the string and convert each part to integer
	var day = parseInt(format[2], 10);
	var month = parseInt(format[1], 10);
	var year = parseInt(format[0], 10);
	// Store the number of days in each month in an array				
	var monthDays = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	
if(month == 0 || month > 12) {
	return("ERROR: Enter a valid calendar month");
	}	
	else {
		return true;
	}
	
// Check the number of years
if(year < 2015 || year > 2080) {
	return("ERROR: Enter a valid calendar year");
	}
	else {
		return true;
	}
	
// Check if the year is a leap year and modify February in monthDays array
if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
	monthDays[1] = 29;
	}
	else {
		return true;
	}
	
// Check the number of days in each month 
if(day < 0 || day > monthDays[month - 1]) {
	return("ERROR: Enter a valid calendar day");
	}
	else {
		return true;
	}
},
	
	
//Compare start end between less than 21 days
getDateDiff: function(){
//Client start date
var startDate = this.getParameter('sysparm_start');
//Client end date
var endDate = this.getParameter('sysparm_end');
//Create a GlideDateTime object	
var gdtStart = new GlideDateTime();
	gdtStart.setDisplayValue(startDate);
//Set gtd object to date time selected by client	
var gdtEnd = new GlideDateTime();
	gdtEnd.setDisplayValue(endDate);
//Get number of milliseconds for each date
var startNum = gdtStart.getNumericValue();
var endNum = gdtEnd.getNumericValue();
//Start milliseconds are more than end milliseconds start date is later date
var dateDiffMS = endNum - startNum;
var dateDiffSecs = dateDiffMS / 1000;
var dateDiffMins = dateDiffSecs / 60;
var dateDiffHrs = dateDiffMins / 60;
var dateDiffDays = dateDiffHrs / 24;
	
if(dateDiffDays > 21) {
	return("ERROR: The maximum number of loaner days is 21. Please select a shorter duration.");
	}
	else {
		return true;
	}
}
	
});