'use strict'
/*
Copyright (c) 2018 Y Paritcher
*/

window.onload = function() {
	let base =new Date()
	let today = new zmanJS.hdate().convertDate(base);
	zmanform.year.value = today.year;
	zmanform.month.value = today.month;
	zmanform.year.onchange = yearchange;
}

function yearchange() {
	zmanform.month.max = (zmanJS.HebrewLeapYear(zmanform.year.value) ? 13 : 12);
}

function calculatemonth(doc, year, month, here) {

	luxon.Settings.defaultZoneName = tzlookup(here.latitude, here.longitude);
	let today = new zmanJS.hdate(year, month, 1, 12, 0, 0, 0, 0, 0)
	today.setoffset(luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60);
	let monthday = zmanJS.formatmonth(today);
	let title = monthday + " " + zmanJS.formatnum(today.year)

	let blevanah = zmanJS.getmolad7days(today);
	let blevanahtext = zmanJS.meridian(blevanah) + " " + zmanJS.formattime(blevanah) + " " + "\u202B" + "תחילת זמן קידוש לבנה: " + zmanJS.formatnum(blevanah.day) + " " + zmanJS.formatmonth(blevanah);
	let elevanah = zmanJS.getmoladhalfmonth(today);
	let elevanahtext = zmanJS.meridian(elevanah) + " " + zmanJS.formattime(elevanah) + " " + "\u202B" + "סוף זמן קידוש לבנה: " + zmanJS.formatnum(elevanah.day) + " " + zmanJS.formatmonth(elevanah);

	let bodyarray = [];
	let monthlength = zmanJS.LastDayOfHebrewMonth(today.month, today.year);
	for(let i = 0; i < monthlength; i++, today.hdateaddday(1)){
		today.offset = (luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60);
		let rowobj = {};
		rowobj.yom = zmanJS.formatnum(today.day);
		rowobj.special = "";
		if (today.getparshah()){rowobj.special += zmanJS.parshahformat(today.getparshah()) + ' '};
		if (today.getyomtov()){rowobj.special += zmanJS.yomtovformat(today.getyomtov()) + ' '};
		if (today.getspecialshabbos()){rowobj.special += zmanJS.yomtovformat(today.getspecialshabbos()) + ' '};
		if (today.getroshchodesh()){rowobj.special += zmanJS.yomtovformat(today.getroshchodesh()) + ' '};
		if (today.getmacharchodesh()){rowobj.special += zmanJS.yomtovformat(today.getmacharchodesh()) + ' '};
		if (today.getshabbosmevorchim()){rowobj.special += zmanJS.yomtovformat(today.getshabbosmevorchim()) + ' '};
		rowobj.wday = zmanJS.formatwday(today, 'true');
		rowobj.alos = zmanJS.formattime(zmanJS.getalosbaalhatanya(today, here));
		rowobj.mishyakir = zmanJS.formattime(zmanJS.getmisheyakir10p2degrees(today, here));
		rowobj.netz = zmanJS.formattime(zmanJS.getsunrise(today, here));
		rowobj.shma = zmanJS.formattime(zmanJS.getshmabaalhatanya(today, here));
		rowobj.tefilah = zmanJS.formattime(zmanJS.gettefilabaalhatanya(today, here));
		rowobj.chatzos = zmanJS.formattime(zmanJS.getchatzosbaalhatanya(today, here));
		rowobj.mincha1 = zmanJS.formattime(zmanJS.getminchagedolabaalhatanya(today, here));
		rowobj.mincha2 = zmanJS.formattime(zmanJS.getminchaketanabaalhatanya(today, here));
		rowobj.mincha3 = zmanJS.formattime(zmanJS.getplagbaalhatanya(today, here));
		if (today.iscandlelighting() == 1) {rowobj.candlelighting = zmanJS.formattime(zmanJS.getcandlelighting(today, here));}
		if (today.iscandlelighting() == 2) {rowobj.candlelighting = zmanJS.formattime(zmanJS.gettzais8p5(today, here));}
		rowobj.shkiah = zmanJS.formattime(zmanJS.getsunset(today, here));
		if (!today.isassurbemelachah()){rowobj.tzais = zmanJS.formattime(zmanJS.gettzaisbaalhatanya(today, here));}
		if (today.isassurbemelachah()){rowobj.shabbos = zmanJS.formattime(zmanJS.gettzais8p5(today, here));}
		bodyarray.push(rowobj);
	}

	let molad = zmanJS.getmolad(today.year, today.month);
	let moladfiller = "";
	if (molad.hour < 12){moladfiller = "בבוקר"}else{moladfiller = "בצהרים"};
	let moladtext = "\u202B" + 'מולד ' + zmanJS.formatmonth(today) + ': יום ' + zmanJS.formatwday(molad, 1) + " " + moladfiller + " " + zmanJS.formattime(molad) + " ו" + molad.sec + " חלקים"
	let footertext = moladtext + "        " + elevanahtext + "        " + blevanahtext;

	let columnsarray = [ {header: 'פרשה', dataKey: 'special'}, {header: '', dataKey: 'wday'}, {header: 'יציאת\nהשבת', dataKey: 'shabbos'}, {header: 'צאת', dataKey: 'tzais'}, {header: 'שקיעה', dataKey: 'shkiah'}, {header: 'ליכט', dataKey: 'candlelighting'}, {header: 'פלג\nמנחה', dataKey: 'mincha3'}, {header: 'מנחה\nקטנה', dataKey: 'mincha2'}, {header: 'מנחה\nגדולה', dataKey: 'mincha1'}, {header: 'חצות', dataKey: 'chatzos'}, {header: 'תפלה', dataKey: 'tefilah'}, {header: 'ק"ש', dataKey: 'shma'}, {header: 'נץ', dataKey: 'netz'}, {header: 'משיכיר', dataKey: 'mishyakir'}, {header: 'עלות', dataKey: 'alos'}, {header: monthday, dataKey: 'yom'} ];

	let disclaimer = 'Please do not rely on the zmanim up to the last second, zmanim may be inacurate by up to 2 minutes due to refraction.'

	doc.setFont('ezra', 'normal')
	doc.setFontSize(5)
	doc.text('a', 500, 0)
	doc.text('ב"ה', 273,5, {align: 'right'})
	doc.setFontSize(15)
	doc.text('לוח זמנים - ' + title, doc.internal.pageSize.width/2, 15, {align: 'center'})
	doc.setFontSize(10)
	doc.text(zmanform.locname.value + ' Lat: ' + here.latitude + ' Long: ' + here.longitude, doc.internal.pageSize.width/2, 20, {align: 'center'})

	doc.autoTable({
		startY: 25,
		margin: 5,
		tableLineWidth: .2,
		styles: {fillColor: null, textColor: 20, lineColor: 10, lineWidth: 0/*.1*/, fontSize: 8 },
	 	headStyles: {halign: 'center', valign: 'bottom', font: 'ezra', fontStyle: 'normal'},
		bodyStyles: { font: 'ezra', halign: 'center', fontSize: 8, cellPadding: 1},
		columns: columnsarray,
		columnStyles: { special: { halign: 'right'} },
		body: bodyarray,
		footStyles: { halign: 'center', valign: 'middle', font: 'ezra', fontStyle: 'normal', fontSize: 8, cellPadding: 1},
		foot: [{[columnsarray[0].dataKey]: {content: footertext, colSpan: 20}}]
	});

	doc.setFontSize(9);
	doc.text(disclaimer, doc.internal.pageSize.width/2, doc.lastAutoTable.finalY+5, {align: 'center'});
	doc.setFontSize(6);
	doc.setTextColor("0.5");
	doc.text('© 2019 Y Paritcher https://zmanim.yparitcher.com', 5, 213);
}

function getPDF() {

	let here = new zmanJS.locations(zmanform.latitude.value, zmanform.longitude.value, zmanform.elevation.value)
	let base =new Date()
	let today = new zmanJS.hdate().convertDate(base);

	let doc = new jsPDF({
	 orientation: 'l',
	 unit: 'mm',
	 format: 'letter'
	})

	calculatemonth(doc, parseInt(zmanform.year.value), parseInt(zmanform.month.value), here)

	doc.save('Zmanim.pdf')
}
