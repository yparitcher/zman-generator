'use strict'
/*
Copyright (c) 2018 Y Paritcher
*/

zmanJS.calcSolNoonUTC = function(JD, longitude)
{
	let jcent = zmanJS.calcTimeJulianCent(JD);

	let tnoon = zmanJS.calcTimeJulianCent(zmanJS.calcJDFromJulianCent(jcent) + longitude/360.0);
	let eqTime = zmanJS.calcEquationOfTime(tnoon);
	let solNoonUTC = 720 + (longitude * 4) - eqTime;

	let newt = zmanJS.calcTimeJulianCent(zmanJS.calcJDFromJulianCent(jcent) -0.5 + solNoonUTC/1440.0);

	eqTime = zmanJS.calcEquationOfTime(newt);
	solNoonUTC = 720 + (longitude * 4) - eqTime;

	return solNoonUTC;
}

function getUTCNoon(JD, here)
{

	let noon = zmanJS.calcSolNoonUTC(JD, -here.longitude);
	noon = noon / 60;

	while (noon < 0.0)
	{
		noon += 24.0;
	}
	while (noon >= 24.0)
	{
		noon -= 24.0;
	}
	return noon;
}

function getDateFromNoon(current, time)
{
	let result = new zmanJS.hdate();
	if (isNaN(time)) {
		return result;
	}
	let calculatedTime = time;
	result.year = current.year;
	result.EY = current.EY;
	result.offset = current.offset;
	result.month = current.month;
	result.day = current.day;

	let hours = Math.trunc(calculatedTime);
	calculatedTime -= hours;
	let minutes = Math.trunc(calculatedTime *= 60);
	calculatedTime -= minutes;
	let seconds = Math.trunc(calculatedTime *= 60);
	calculatedTime -= seconds;
	let miliseconds = Math.trunc(calculatedTime * 1000);

	result.hour = hours;
	result.min = minutes;
	result.sec = seconds;
	result.msec = miliseconds;
	result.hdateaddsecond(current.offset);
	return result;
}

window.onload = function() {
	let base = new Date();
	let today = new zmanJS.hdate().convertDate(base);
	zmanform.year.value = today.year;
	getavgnoon()
}

function calcrs(today, here)
{
	let ctz = zmanJS.getchatzosbaalhatanya(today, here);
	let tme = (((((ctz.hour*60)+ctz.min)*60)+ctz.sec)*1000)+ctz.msec;
	return BigInt(tme);
}

function calcnn(today, here)
{
	let ctz = getDateFromNoon(today, getUTCNoon(today.hdatejulian(), here));
	let tme = (((((ctz.hour*60)+ctz.min)*60)+ctz.sec)*1000)+ctz.msec;
	return BigInt(tme);
}

function tabulate(today, here, result) {
	let limit = 1461;
	let total = [0n,0n,0n]
	for(let i = 0; i < limit; i++, today.hdateaddday(1)){
		//today.offset = (luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60);
	total[0] += calcrs(today, here)
	total[1] += calcnn(today, here)
	};
	
	let lat = (-(here.longitude*4) + (today.offset/60) + (12*60));
	total[2] = BigInt(parseInt(lat*60000))*BigInt(limit);
	
	for(let n = 0; n < 3; n++){
		let final = total[n]/BigInt(limit);
		let msec = final%1000n;
		let sec = final/1000n;
		let min = sec/60n;
		let hour = min/60n;
		min = min%60n;
		sec = sec%60n;
		result[n] = "" + hour + ":" + min + ":" + sec
		console.log(result[n] + "." + msec);
	};
}

function getavgnoon() {

	let here = new zmanJS.locations(zmanform.latitude.value, zmanform.longitude.value, 0);
	//let base =new Date();
	//let today = new zmanJS.hdate().convertDate(base);
	luxon.Settings.defaultZoneName = tzlookup(here.latitude, here.longitude);
	let today = new zmanJS.hdate(parseInt(zmanform.year.value), 1, 1, 12, 0, 0, 0, 0, 0)
	let offset = luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60;
	today.setoffset(offset);
	let result = ["","",""];
	tabulate(today, here, result);
	zmanform.RS.value = result[0];
	zmanform.Zenith.value = result[1];
	zmanform.lat.value = result[2];

}
