'use strict'

window.onload = function() {
	let base =new Date()
	let today = new hdate().convertDate(base);
	zmanform.year.value = today.year;
	zmanform.month.value = today.month;
	zmanform.year.onchange = yearchange;
}

function calculatemonth(doc, year, month, here) {

	luxon.Settings.defaultZoneName = tzlookup(here.latitude, here.longitude);
	let today = new hdate(year, month, 1, 12, 0, 0, 0, 0, 0)
	today.offset = (luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60);
	let monthday = formatmonth(today);
	let title = monthday + " " + formatnum(today.year)

	let blevanah = getmolad7days(today);
	let blevanahtext = "\u202B" + "תחילת זמן קידוש לבנה: " + formatnum(blevanah.day) + " " + formatmonth(blevanah) + " " + meridian(blevanah) + " " + formattime(blevanah);
	let elevanah = getmoladhalfmonth(today);
	let elevanahtext = "\u202B" + "סוף זמן קידוש לבנה: " + formatnum(elevanah.day) + " " + formatmonth(elevanah) + " " + meridian(elevanah) + " " + formattime(elevanah);

	let bodyarray = [];
	let monthlength = LastDayOfHebrewMonth(today.month, today.year);
	for(let i = 0; i < monthlength; i++, today.hdateaddday(1)){
		today.offset = (luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60);
		let rowobj = {};
		rowobj.yom = formatnum(today.day);
		rowobj.special = "";
		if (today.getparshah()){rowobj.special += " " + parshahformat(today.getparshah())};
		if (today.getyomtov()){rowobj.special += " " + yomtovformat(today.getyomtov())};
		if (today.getspecialshabbos()){rowobj.special += " " + yomtovformat(today.getspecialshabbos())};
		if (today.getroshchodesh()){rowobj.special += " " + yomtovformat(today.getroshchodesh())};
		if (today.getmacharchodesh()){rowobj.special += " " + yomtovformat(today.getmacharchodesh())};
		if (today.getshabbosmevorchim()){rowobj.special += " " + yomtovformat(today.getshabbosmevorchim())};
		rowobj.wday = formatwday(today, 'true');
		rowobj.alos = formattime(getalosbaalhatanya(today, here));
		rowobj.mishyakir = formattime(getmisheyakir10p2degrees(today, here));
		rowobj.netz = formattime(getsunrise(today, here));
		rowobj.shma = formattime(getshmabaalhatanya(today, here));
		rowobj.tefilah = formattime(gettefilabaalhatanya(today, here));
		rowobj.chatzos = formattime(getchatzosbaalhatanya(today, here));
		rowobj.mincha1 = formattime(getminchagedolabaalhatanya(today, here));
		rowobj.mincha2 = formattime(getminchaketanabaalhatanya(today, here));
		rowobj.mincha3 = formattime(getplagbaalhatanya(today, here));
		if (today.iscandlelighting() == 1) {rowobj.candlelighting = formattime(getcandlelighting(today, here));}
		if (today.iscandlelighting() == 2) {rowobj.candlelighting = formattime(gettzais8p5(today, here));}
		rowobj.shkiah = formattime(getsunset(today, here));
		if (!today.isassurbemelachah()){rowobj.tzais = formattime(gettzaisbaalhatanya(today, here));}
		if (today.isassurbemelachah()){rowobj.shabbos = formattime(gettzais8p5(today, here));}
		bodyarray.push(rowobj);
	}

	let molad = getmolad(today.year, today.month);
	let moladfiller = "";
	if (molad.hour < 12){moladfiller = "בבוקר"}else{moladfiller = "בצהרים"};
	let moladtext = "\u202B" + 'מולד ' + formatmonth(today) + ': יום ' + formatwday(molad, 1) + " " + moladfiller + " " + formattime(molad) + " ו" + molad.sec + " חלקים"
	let footertext = blevanahtext + "        " + elevanahtext + "        " + moladtext;

	let columnsarray = [{header: 'פרשה', dataKey: 'special'}, {header: monthday, dataKey: 'yom'}, {header: '', dataKey: 'wday'}, {header: 'עלות', dataKey: 'alos'}, {header: 'משיכיר', dataKey: 'mishyakir'}, {header: 'נץ', dataKey: 'netz'}, {header: 'ק"ש', dataKey: 'shma'}, {header: 'תפלה', dataKey: 'tefilah'}, {header: 'חצות', dataKey: 'chatzos'}, {header: 'מנחה\nגדולה', dataKey: 'mincha1'}, {header: 'מנחה\nקטנה', dataKey: 'mincha2'}, {header: 'פלג\nמנחה', dataKey: 'mincha3'}, {header: 'ליכט', dataKey: 'candlelighting'}, {header: 'שקיעה', dataKey: 'shkiah'}, {header: 'צאת', dataKey: 'tzais'}, {header: 'יציאת\nהשבת', dataKey: 'shabbos'}];

	doc.setFont('ezra', 'normal')
	doc.setFontSize(5)
	doc.text('a', 500, 0)
	doc.text('ב"ה', 275,5, {align: 'right'})
	doc.setFontSize(15)
	doc.text('לוח זמנים - ' + title,doc.internal.pageSize.width/2, 15, {align: 'center'})

	doc.autoTable({
		startY: 20,
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

	doc.setFontSize(9)
	doc.text( 'copyright 2019 Y Paritcher', doc.internal.pageSize.width/2, doc.lastAutoTable.finalY+10, {align: 'center'})
}

function yearchange() {
	zmanform.month.max = (HebrewLeapYear(zmanform.year.value) ? 13 : 12);
}

function getPDF() {

	let here = new locations(zmanform.latitude.value, zmanform.longitude.value, zmanform.elevation.value)
	let base =new Date()
	let today = new hdate().convertDate(base);

	let doc = new jsPDF({
	 orientation: 'l',
	 unit: 'mm',
	 format: 'letter'
	})

	calculatemonth(doc, parseInt(zmanform.year.value), parseInt(zmanform.month.value), here)

	//doc.output('datauri', 'test.pdf')
	doc.save('Zmanim.pdf')
}
