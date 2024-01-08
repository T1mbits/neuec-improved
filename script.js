let presetDataEntry = document.getElementById('presetEntry');

class presetData {
	stringDecoded = '';
	stringEncoded = '';
	presetDataArray = [];
	presetDataArraySplit = [];

	constructor() {}
}

const preset = new presetData();

/**
 * Probably Takes Preset Input
 */
function sausageWeinerJordan() {
	preset.stringDecoded = atob(presetDataEntry.value);
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
	updateTable();
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
	let presetString = `NEUEC/[${preset.presetDataArray.toString()}]`;
	console.log(btoa(presetString));
	return btoa(presetString);
}

function ankleMonitorNinja() {}

function updateTable() {
	const tableBody = document.getElementById('presetEntryTable');
	tableBody.innerHTML = '';

	preset.presetDataArraySplit.forEach((row, rowIndex) => {
		const newRow = document.createElement('tr');

		row.forEach((cellData, colIndex) => {
			const cell = document.createElement('td');
			const cellInput = document.createElement('input');
			cellInput.value = cellData;
			cellInput.onchange = () =>
				(preset.presetDataArraySplit[rowIndex][colIndex] =
					cellInput.value);
			cell.appendChild(cellInput);
			newRow.appendChild(cell);
		});

		// Add a button for deleting the row
		const deleteButton = document.createElement('button');
		deleteButton.textContent = 'Delete';
		deleteButton.onclick = () => deleteRow(rowIndex);
		newRow.appendChild(deleteButton);

		tableBody.appendChild(newRow);
	});
}

function addRow() {
	const newRow = [
		'placeholder',
		'placeholder',
		'placeholder',
		'placeholder',
		'placeholder',
	];
	preset.presetDataArraySplit.push(newRow);
	updateTable();
}

function moveRow() {
	updateTable();
	console.error('Not Implemented Yet');
}

function deleteRow(index) {
	preset.presetDataArraySplit.splice(index, 1);
	updateTable();
}

// Initial table setup
updateTable();
