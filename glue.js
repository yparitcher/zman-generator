'use strict'
/*
Copyright (c) 2018 Y Paritcher
*/

const zmanlist = {
alos: [ { func: "getalos", desc: "16.1°"}, { func: "getalosbaalhatanya", desc: "Baal Hatanya (16.9°)", def: true}, { func: "getalos26degrees", desc: "26°"}, { func: "getalos19p8degrees", desc: "19.8°"}, { func: "getalos18degrees", desc: "18°"}, { func: "getalos120", desc: "120 min"}, { func: "getalos120zmanis", desc: "120 min Zmanis"}, { func: "getalos96", desc: "96 min"}, { func: "getalos96zmanis", desc: "96 min Zmanis"}, { func: "getalos90", desc: "90 min"}, { func: "getalos90zmanis", desc: "90 min Zmanis"}, { func: "getalos72", desc: "72 min"}, { func: "getalos72zmanis", desc: "72 min Zmanis"}, { func: "getalos60", desc: "60 min"} ],
misheyakir: [ { func: "getmisheyakir11p5degrees", desc: "11.5°"}, { func: "getmisheyakir11degrees", desc: "11°"}, { func: "getmisheyakir10p2degrees", desc: "10.2°", def: true} ],
netz: [ { func: "getsunrise", desc: "Sea Level", def: true}, { func: "getelevationsunrise", desc: "Elevation Adjusted"} ],
shma: [ { func: "getshmabaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getshmagra", desc: "Gra"}, { func: "getshmamga", desc: "Magen Avraham"} ],
tefila: [ { func: "gettefilabaalhatanya", desc: "Baal Hatanya", def: true}, { func: "gettefilagra", desc: "Gra"}, { func: "gettefilamga", desc: "Magen Avraham"} ],
achilaschometz: [ { func: "getachilaschometzbaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getachilaschometzgra", desc: "Gra"}, { func: "getachilaschometzmga", desc: "Magen Avraham"} ],
biurchometz: [ { func: "getbiurchometzbaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getbiurchometzgra", desc: "Gra"}, { func: "getbiurchometzmga", desc: "Magen Avraham"} ],
chatzos: [ { func: "getchatzosbaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getchatzosgra", desc: "Gra"} ],
minchagedola: [ { func: "getminchagedolabaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getminchagedolagra", desc: "Gra"}, { func: "getminchagedolamga", desc: "Magen Avraham"}, { func: "getminchagedolabaalhatanyag30m", desc: "Baal Hatanya 30 min"}, { func: "getminchagedolagrag30m", desc: "Gra 30 min"}, { func: "getminchagedolamgag30m", desc: "Magen Avraham 30 min"} ],
minchaketana: [ { func: "getminchaketanabaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getminchaketanagra", desc: "Gra"}, { func: "getminchaketanamga", desc: "Magen Avraham"} ],
plag: [ { func: "getplagbaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getplaggra", desc: "Gra"}, { func: "getplagmga", desc: "Magen Avraham"} ],
shkia: [ { func: "getsunset", desc: "Sea Level", def: true}, { func: "getelevationsunset", desc: "Elevation Adjusted"} ],
tzais: [ { func: "gettzaisbaalhatanya", desc: "Baal Hatanya (6°)", def: true}, { func: "gettzais8p5", desc: "8.5°"}, { func: "gettzais72", desc: "72 min"} ],
shabbosends: [ { func: "gettzaisbaalhatanya", desc: "6°"}, { func: "gettzais8p5", desc: "8.5°", def: true}, { func: "gettzais72", desc: "72 min"} ],
levanastart: [ { func: "getmolad7days", desc: "7 days", def: true} ],
levanaend: [ { func: "getmoladhalfmonth", desc: "Half month", def: true}, { func: "getmolad15days", desc: "15 days"} ],
shaahzmanis: [ { func: "getshaahzmanisbaalhatanya", desc: "Baal Hatanya", def: true}, { func: "getshaahzmanisgra", desc: "Gra"}, { func: "getshaahzmanismga", desc: "Magen Avraham"} ]
}

const lmonths = { leap: [{ value: '7 ', disp: 'Tishrei' }, { value: '8 ', disp: 'Cheshvan' }, { value: '9 ', disp: 'Kislev' }, { value: '10 ', disp: 'Teves' }, { value: '11 ', disp: 'Shevat' }, { value: '12 ', disp: 'Adar I' }, { value: '13 ', disp: 'Adar II' }, { value: '1 ', disp: 'Nissan' }, { value: '2 ', disp: 'Iyar' }, { value: '3 ', disp: 'Sivan' }, { value: '4 ', disp: 'Tammuz' }, { value: '5 ', disp: 'Av' }, { value: '6 ', disp: 'Elul' }], regular: [{ value: '7 ', disp: 'Tishrei' }, { value: '8 ', disp: 'Cheshvan' }, { value: '9 ', disp: 'Kislev' }, { value: '10 ', disp: 'Teves' }, { value: '11 ', disp: 'Shevat' }, { value: '12 ', disp: 'Adar' }, { value: '1 ', disp: 'Nissan' }, { value: '2 ', disp: 'Iyar' }, { value: '3 ', disp: 'Sivan' }, { value: '4 ', disp: 'Tammuz' }, { value: '5 ', disp: 'Av' }, { value: '6 ', disp: 'Elul' }] }

function setbyval(field, value) {
	for (let i = 0; i< field.length; i++) {
		if (field.options[i].value == value) {
			field.options[i].selected = true;
			break;
		}
	}

}

function formfill(member) {
	for(let index in zmanlist[member]) {
		let def = zmanlist[member][index].def ? true : false;
		zmanform[member].options[zmanform[member].options.length] = new Option(zmanlist[member][index].desc, index, def, def);
	}
}

function monthform() {
	zmanform.month.innerHTML = "";
	let monthlist = (zmanJS.HebrewLeapYear(zmanform.year.value) ? lmonths.leap : lmonths.regular);
	for(let index in monthlist) {
		zmanform.month.options[zmanform.month.options.length] = new Option(monthlist[index].disp, monthlist[index].value);
	}
}

function yearchange() {
	let old = zmanform.month.value;
	let len = zmanform.month.length;
	monthform();
	setbyval(zmanform.month, old);
	if (zmanform.month.length != len){
		if (old == 13) { setbyval(zmanform.month, 12);}
		if (old == 12) {
			if (zmanJS.HebrewLeapYear(zmanform.year.value)) {setbyval(zmanform.month, 13);}
		}
	}
}

function typechange() {
	let els = document.getElementsByClassName('month');
	let hidden = (zmanform.type.value == 'Year') ? true : false;
	for (let index in els){ els.item(index).hidden = hidden;}
}

window.onload = function() {
	let base = new Date();
	let today = new zmanJS.hdate().convertDate(base);
	zmanform.year.value = today.year;
	monthform();
	typechange();
	setbyval(zmanform.month, today.month)
	zmanform.year.onchange = yearchange;
	zmanform.type.onchange = typechange;
	const formfilllist = [ "alos", "misheyakir", "netz", "shma", "tefila", "biurchometz", "minchagedola", "minchaketana", "plag", "shkia", "tzais", "shabbosends", "shaahzmanis", "levanastart", "levanaend" ];
	for(let index in formfilllist) {formfill(formfilllist[index]);};
}

function calczman(today, here, row, zman) {
	row[zman] = zmanJS.formattime(zmanJS[zmanlist[zman][zmanform[zman].value].func](today, here));
}

function tablebody(today, here) {
	let bodyarray = [];
	let monthlength = zmanJS.LastDayOfHebrewMonth(today.month, today.year);
	const calczmanlist = [ "alos", "misheyakir", "netz", "shma", "tefila", "minchagedola", "minchaketana", "plag", "shkia" ];
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

		for(let index in calczmanlist) {calczman(today, here, rowobj, calczmanlist[index]);};

		rowobj.chatzos = zmanJS.formattime(zmanJS.getchatzosbaalhatanya(today, here));
		rowobj.shaahzmanis = Math.trunc(zmanJS[zmanlist.shaahzmanis[zmanform.shaahzmanis.value].func](today, here)/60000);
		rowobj.omer = zmanJS.formatnum(today.getomer());

		let shabbosends = zmanlist.shabbosends[zmanform.shabbosends.value].func;
		if (today.iscandlelighting() == 1) {rowobj.candlelighting = zmanJS.formattime(zmanJS.calctimeoffset(zmanJS.getsunset(today, here), -60000 *  parseInt(zmanform.candlelighting.value)));}
		if (today.iscandlelighting() == 2) {rowobj.candlelighting = zmanJS.formattime(zmanJS[shabbosends](today, here));}

		if (!today.isassurbemelachah()) {
			rowobj.tzais = zmanJS.formattime(zmanJS[zmanlist.tzais[zmanform.tzais.value].func](today, here));
		} else {
			rowobj.shabbosends = zmanJS.formattime(zmanJS[shabbosends](today, here));
		}

		bodyarray.push(rowobj);
	}
	return bodyarray;
}

function zchometz(key, today, here) {
	let eat = zmanJS.formattime(zmanJS[zmanlist.tefila[zmanform.tefila.value].func](today, here));
	let burn = zmanJS.formattime(zmanJS[zmanlist.biurchometz[zmanform.biurchometz.value].func](today, here));
	return { [key]: {
		content: 'אכילת חמץ ' + eat  + '        ביעור חמץ ' + burn,
		colSpan: 20,
		styles: {
			halign: 'center',
			valign: 'middle',
			cellPadding: 1,
			lineColor: 200,
			lineWidth: 0.1
		}
	}}
}

function tablefooter(today) {
	let blevanah = zmanJS[zmanlist.levanastart[zmanform.levanastart.value].func](today);//zmanJS.getmolad7days(today);
	let blevanahtext = zmanJS.meridian(blevanah) + " " + zmanJS.formattime(blevanah) + " " + "\u202B" + "תחילת זמן קידוש לבנה: " + zmanJS.formatnum(blevanah.day) + " " + zmanJS.formatmonth(blevanah);
	let elevanah = zmanJS[zmanlist.levanaend[zmanform.levanaend.value].func](today);//zmanJS.getmoladhalfmonth(today);
	let elevanahtext = zmanJS.meridian(elevanah) + " " + zmanJS.formattime(elevanah) + " " + "\u202B" + "סוף זמן קידוש לבנה: " + zmanJS.formatnum(elevanah.day) + " " + zmanJS.formatmonth(elevanah);
	today.hdateaddmonth(1);
	let molad = zmanJS.getmolad(today.year, today.month);
	let moladfiller = "";
	if (molad.hour < 12){moladfiller = "בבוקר"}else{moladfiller = "בצהרים"};
	let moladtext = "\u202B" + 'מולד ' + zmanJS.formatmonth(today) + ': יום ' + zmanJS.formatwday(molad, 1) + " " + moladfiller + " " + zmanJS.formattime(molad);
	if (molad.sec) moladtext += " ו" + molad.sec + " חלקים"
	return moladtext + "        " + elevanahtext + "        " + blevanahtext;
}

function tablecolumns(today) {
	let columnsarray = []
	columnsarray.push({header: 'פרשה', dataKey: 'special'});
	if ([1, 2, 3].includes(today.month)){columnsarray.push({header: 'ספירת\nהעומר', dataKey: 'omer'});}
	columnsarray.push({header: '', dataKey: 'wday'});
	columnsarray.push({header: 'שעה\nזמנית', dataKey: 'shaahzmanis'});
	columnsarray.push({header: 'יציאת\nהשבת', dataKey: 'shabbosends'});
	columnsarray.push({header: 'צאת\nהכוכבים', dataKey: 'tzais'});
	columnsarray.push({header: 'שקיעה', dataKey: 'shkia'});
	columnsarray.push({header: 'ליכט', dataKey: 'candlelighting'});
	columnsarray.push({header: 'פלג\nהמנחה', dataKey: 'plag'});
	columnsarray.push({header: 'מנחה\nקטנה', dataKey: 'minchaketana'});
	columnsarray.push({header: 'מנחה\nגדולה', dataKey: 'minchagedola'});
	columnsarray.push({header: 'חצות', dataKey: 'chatzos'});
	columnsarray.push({header: 'סו״ז\nתפלה', dataKey: 'tefila'});
	columnsarray.push({header: 'סו״ז\nק״ש', dataKey: 'shma'});
	columnsarray.push({header: 'נץ\nהחמה', dataKey: 'netz'});
	columnsarray.push({header: 'משיכיר', dataKey: 'misheyakir'});
	columnsarray.push({header: 'עלות\nהשחר', dataKey: 'alos'});
	columnsarray.push({header: zmanJS.formatmonth(today), dataKey: 'yom'});
	return columnsarray;
}

function calculatemonth(here, year, month) {
	luxon.Settings.defaultZoneName = tzlookup(here.latitude, here.longitude);
	let today = new zmanJS.hdate(year, month, 1, 12, 0, 0, 0, 0, 0)
	let offset = luxon.DateTime.fromSeconds(today.hdateunix()).offset * 60;
	today.setoffset(offset);

	let columnsarray = tablecolumns(today);
	let title = 'לוח זמנים - ' + zmanJS.formatmonth(today) + " " + zmanJS.formatnum(today.year);
	let loctitle = zmanform.locname.value + ' Lat: ' + here.latitude + ' Long: ' + here.longitude;
	let levanaday = new zmanJS.hdate(year, month, 1, 12, 0, 0, 0, 0, 0).setoffset(offset);;
	let bodyarray = tablebody(today, here);
	let chometz = new zmanJS.hdate(year, month, 14, 12, 0, 0, 0, 0, 0).setoffset(offset);;
	if (chometz.month == 1){
		let chometzrow = zchometz(columnsarray[0].dataKey, chometz, here);
		bodyarray.push(chometzrow);
	}
	let footertext = tablefooter(levanaday);
	let foot = {[columnsarray[0].dataKey]: {content: footertext, colSpan: 20}};
	return {
		title: title,
		loctitle: loctitle,
		startY: 25,
		margin: 5,
		tableLineWidth: 0.2,
		columns: columnsarray,
		body: bodyarray,
		foot: [foot],
		styles: {
			fillColor: null,
			textColor: 20,
			lineColor: 200,
			lineWidth: 0.1,
			cellPadding: {top: 1, right: 0, bottom: 1, left: 0},
			fontSize: 8
		},
		columnStyles: {
			special: {
				halign: 'right'
			}
		},
		headStyles: {
			halign: 'center',
			valign: 'bottom',
			font: 'ezra',
			fontStyle: 'normal',
			lineColor: 200,
			lineWidth: 0.1,
			cellPadding: {top: 1, right: 0, bottom: 0, left: 0}
		},
		bodyStyles: {
			font: 'ezra',
			halign: 'center',
			fontSize: 8,
			cellPadding: {top: 1, right: 1, bottom: 1, left: 1}
		},
		footStyles: {
			halign: 'center',
			valign: 'bottom',
			font: 'ezra',
			fontStyle: 'normal',
			fontSize: 8,
			cellPadding: {top: 2, right: 0, bottom: 1, left: 0},
			lineColor: 200,
			lineWidth: 0.1
		}
	}
}

function formatpage(doc, here, year, month) {
	let table = calculatemonth(here, year, month);
	let disclaimer = 'Zmanim may be inacurate by up to 2 minutes due to refraction.'
	let cw = doc.internal.pageSize.width/2;
	doc.setFont('ezra', 'normal')
	doc.setFontSize(5)
	doc.text('a', 500, 0)
	doc.text('ב"ה', 273,5, {align: 'right'})
	doc.setFontSize(15)
	doc.text(table.title, cw, 15, {align: 'center'})
	doc.setFontSize(10)
	doc.text(table.loctitle, cw, 20, {align: 'center'})
	doc.autoTable(table);
	doc.setFontSize(9);
	doc.text(disclaimer, cw, doc.lastAutoTable.finalY+5, {align: 'center'});
	doc.setFontSize(6);
	doc.setTextColor("0.5");
	doc.text('© 2019 Y Paritcher https://zmanim.paritcher.com', 5, 213);
	doc.setTextColor("0");
}

function calculateyear(doc, here, year) {
	let lim = (zmanJS.HebrewLeapYear(year) ? 13 : 12);
	let monthlist = (zmanJS.HebrewLeapYear(zmanform.year.value) ? lmonths.leap : lmonths.regular);
	formatpage(doc, here, year, parseInt(monthlist[0].value));
	for (let i = 1; i < lim; i++) {
		doc.addPage('letter', 'l');
		formatpage(doc, here, year, parseInt(monthlist[i].value));
	}
}

function getPDF() {

	let here = new zmanJS.locations(zmanform.latitude.value, zmanform.longitude.value, zmanform.elevation.value);
	let base =new Date();
	let today = new zmanJS.hdate().convertDate(base);

	let doc = new jsPDF({
	 orientation: 'l',
	 unit: 'mm',
	 format: 'letter'
	});

	if (zmanform.type.value == 'Year') {
		calculateyear(doc, here, parseInt(zmanform.year.value));
	} else {
		formatpage(doc, here, parseInt(zmanform.year.value), parseInt(zmanform.month.value));
	}

	doc.save('Zmanim.pdf')
}
