const presetDataEntry = document.getElementById('presetEntry');

class presetData {
	stringDecoded =
		'NEUEC/["[a-zA-Z\\- ]+:>:9:6:0","[a-zA-Z\\- ]+:>:6:c:0","[a-zA-Z\\- ]+:>:5:5:0","Experience:>:3:5:0","Life Steal:>:3:5:0","Scavenger:>:3:5:0","Looting:>:3:5:0"]';
	presetDataArray = [
		'"[a-zA-Z\\- ]+:>:9:6:0"',
		'"[a-zA-Z\\- ]+:>:6:c:0"',
		'"[a-zA-Z\\- ]+:>:5:5:0"',
		'"Experience:>:3:5:0"',
		'"Life Steal:>:3:5:0"',
		'"Scavenger:>:3:5:0"',
		'"Looting:>:3:5:0"',
	];
	presetDataArraySplit = [
		['[a-zA-Z\\- ]+', '>', '9', '6', '0'],
		['[a-zA-Z\\- ]+', '>', '6', 'c', '0'],
		['[a-zA-Z\\- ]+', '>', '5', '5', '0'],
		['Experience', '>', '3', '5', '0'],
		['Life Steal', '>', '3', '5', '0'],
		['Scavenger', '>', '3', '5', '0'],
		['Looting', '>', '3', '5', '0'],
	];

	constructor() {}
}

const preset = new presetData();

/**
 * Probably Takes Preset Input
 */
function sausageWeinerJordan() {
	preset.stringDecoded = atob(presetDataEntry.value)
		.replace(/\\\\/g, '\\')
		.replace(/\\u003c/g, '<')
		.replace(/\\u003d/g, '=')
		.replace(/\\u003e/g, '>');
	if (!preset.stringDecoded.startsWith('NEUEC/')) {
		console.error('Invalid Entry');
		return;
	}

	preset.presetDataArray = preset.stringDecoded
		.substring(0, preset.stringDecoded.length - 1)
		.substring(7)
		.split(',');

	preset.presetDataArraySplit = preset.presetDataArray.slice();
	preset.presetDataArraySplit.forEach((presetEntry, index) => {
		preset.presetDataArraySplit[index] = presetEntry.substring(
			1,
			presetEntry.length - 1
		);
		preset.presetDataArraySplit[index] =
			preset.presetDataArraySplit[index].split(':');
	});

	console.log(preset);
	biflerCofunction();
}

/**
 * Should convert preset data array into preset string and convert to base64.
 *
 * Output should be usable inside of /neuec directly.
 * @returns Base64 Encoded /neuec Preset String
 */
function fortySevenCaprisun() {
	preset.presetDataArray = [];
	preset.presetDataArraySplit.forEach((presetEntry, index) => {
		preset.presetDataArray.push(`"${presetEntry.join(':')}"`);
	});
	let presetString = `NEUEC/[${preset.presetDataArray.toString()}]`
		.replace(/\\/g, '\\\\')
		.replace(/</g, '\\u003c')
		.replace(/=/g, '\\u003d')
		.replace(/>/g, '\\u003e');
	console.log(btoa(presetString));
	return btoa(presetString);
}

function biflerCofunction() {
	const tableBody = document.getElementById('presetEntryTable');
	tableBody.innerHTML = '';

	preset.presetDataArraySplit.forEach((row, rowIndex) => {
		const newRow = document.createElement('tr');

		row.forEach((cellData, colIndex) => {
			if (colIndex == 4) {
				const deleteButton = document.createElement('button');
				deleteButton.textContent = 'Delete';
				deleteButton.onclick = () => deleteRow(rowIndex);
				newRow.appendChild(deleteButton);

				const checkboxesChecked = [];
				if (cellData - 16 >= 0) {
					checkboxesChecked.push(true);
					cellData -= 16;
				} else checkboxesChecked.push(false);
				if (cellData - 8 >= 0) {
					checkboxesChecked.push(true);
					cellData -= 8;
				} else checkboxesChecked.push(false);
				if (cellData - 2 >= 0) {
					checkboxesChecked.push(true);
					cellData -= 2;
				} else checkboxesChecked.push(false);
				if (cellData - 1 >= 0) {
					checkboxesChecked.push(true);
					cellData -= 1;
				} else checkboxesChecked.push(false);

				const cell = document.createElement('td');
				for (let i = 0; i < 4; i++) {
					const checkbox = document.createElement('input');
					const container = document.createElement('div');
					checkbox.type = 'checkbox';
					checkbox.checked = checkboxesChecked[i];
					cell.appendChild(container);
					switch (i) {
						case 0:
							container.textContent = 'S';
							break;
						case 1:
							container.textContent = 'U';
							break;
						case 2:
							container.textContent = 'I';
							break;
						case 3:
							container.textContent = 'B';
							break;
					}
					container.appendChild(checkbox);
				}

				newRow.appendChild(cell);
			} else {
				const cell = document.createElement('td');
				const cellInput = document.createElement('input');
				cellInput.value = cellData;
				cellInput.onchange = () =>
					(preset.presetDataArraySplit[rowIndex][colIndex] =
						cellInput.value);
				cell.appendChild(cellInput);
				newRow.appendChild(cell);
			}
		});

		tableBody.appendChild(newRow);
	});
}

function bootyFart() {}
function ankleNinjaMonkey() {}

function vasectomyCore() {
	const newRow = [
		'[a-zA-Z\\- ]+',
		'placeholder',
		'placeholder',
		'placeholder',
		'placeholder',
	];
	preset.presetDataArraySplit.push(newRow);
	biflerCofunction();
}

function kerfuffle() {
	biflerCofunction();
	console.error('Not Implemented Yet');
}

function blunderbussChatter(index) {
	preset.presetDataArraySplit.splice(index, 1);
	biflerCofunction();
}

biflerCofunction();

/*
bold => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MSJd => 												1
underline => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6OCJd => 											8
italic => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MiJd => 												2
strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTYiXQ== => 									16
bold + underline => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6OSJd => 						1+8=		9
bold + italic => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MyJd => 							1+2=		3
bold + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTciXQ== => 				1+16=		17
bold + underline + italic => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTEiXQ== => 			1+8+2=		11
bold + underline + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MjUiXQ== => 	1+8+16=		5
bold + italic + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTkiXQ== => 		1+2+16=		19
underline + italic => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTAiXQ== => 					8+2=		10
underline + italic + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MjYiXQ== => 	8+2+16=		26
underline + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MjQiXQ== => 			8+16=		24
italic + strikethrough => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MTgiXQ== => 				2+16=		18
all => TkVVRUMvWyJbYS16QS1aXFwtIF0rOlx1MDAzZTo5OjY6MjciXQ== => 									1+8+2+16=	27
*/
