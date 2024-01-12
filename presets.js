const presetDataEntry = document.getElementById('presetEntry');

class Preset {
	stringDecoded;
	presetDataArray;
	presetEditingArray;

	restoreDefaults() {
		this.stringDecoded =
			'NEUEC/["[a-zA-Z\\- ]+:>:9:6:0","[a-zA-Z\\- ]+:>:6:c:0","[a-zA-Z\\- ]+:>:5:5:0","Experience:>:3:5:0","Life Steal:>:3:5:0","Scavenger:>:3:5:0","Looting:>:3:5:0"]';
		this.presetDataArray = [
			'"[a-zA-Z\\- ]+:>:9:6:0"',
			'"[a-zA-Z\\- ]+:>:6:c:0"',
			'"[a-zA-Z\\- ]+:>:5:5:0"',
			'"Experience:>:3:5:0"',
			'"Life Steal:>:3:5:0"',
			'"Scavenger:>:3:5:0"',
			'"Looting:>:3:5:0"',
		];
		this.presetEditingArray = [
			['[a-zA-Z\\- ]+', '>', '9', '6', 0],
			['[a-zA-Z\\- ]+', '>', '6', 'c', 0],
			['[a-zA-Z\\- ]+', '>', '5', '5', 0],
			['Experience', '>', '3', '5', 0],
			['Life Steal', '>', '3', '5', 0],
			['Scavenger', '>', '3', '5', 0],
			['Looting', '>', '3', '5', 0],
		];
	}

	constructor() {
		this.restoreDefaults();
	}
}

const MOVE_DIRECTION = {
	Up: 0,
	Down: 1,
};

const preset = new Preset();

function importPresetFromInput() {
	preset.stringDecoded = atob(presetDataEntry.value)
		.replace(/\\\\/g, '\\')
		.replace(/\\u003c/g, '<')
		.replace(/\\u003d/g, '=')
		.replace(/\\u003e/g, '>');
	if (
		!preset.stringDecoded.startsWith('NEUEC/[') &&
		!preset.stringDecoded.endsWith(']')
	)
		return;

	preset.presetDataArray = preset.stringDecoded
		.substring(0, preset.stringDecoded.length - 1)
		.substring(7)
		.split(',');

	preset.presetEditingArray = preset.presetDataArray.slice();
	preset.presetEditingArray.forEach((presetEntry, index) => {
		preset.presetEditingArray[index] = presetEntry.substring(
			1,
			presetEntry.length - 1
		);

		preset.presetEditingArray[index] =
			preset.presetEditingArray[index].split(':');
		preset.presetEditingArray[index][4] = parseInt(
			preset.presetEditingArray[index][4]
		);
	});
	updateTableData();
}

function exportPresetInfo() {
	preset.presetDataArray = [];
	preset.presetEditingArray.forEach((presetEntry, entryIndex) => {
		preset.presetDataArray.push(`"${presetEntry.join(':')}"`);
	});
	const presetString = `NEUEC/[${preset.presetDataArray.toString()}]`
		.replace(/\\/g, '\\\\')
		.replace(/</g, '\\u003c')
		.replace(/=/g, '\\u003d')
		.replace(/>/g, '\\u003e');
	document.getElementById('output').textContent = btoa(presetString);
}

function updateTableData() {
	const tableBody = document.getElementById('presetEntryTable');
	tableBody.innerHTML = '';

	preset.presetEditingArray.forEach((entry, entryIndex) => {
		const newRow = document.createElement('tr');
		let cell;
		let cellInput;
		entry.forEach((cellData, cellIndex) => {
			switch (cellIndex) {
				case 0:
					cell = document.createElement('td');
					cellInput = document.createElement('input');

					cellInput.value = cellData;
					cellInput.id = 'textInput';
					cellInput.onchange = function input() {
						preset.presetEditingArray[entryIndex][cellIndex] =
							this.value;
					};
					cell.appendChild(cellInput);
					newRow.appendChild(cell);
					break;
				case 1:
					cell = document.createElement('td');
					cellInput = document.createElement('input');
					cellInput.addEventListener('keyup', function () {
						this.value = this.value.match(/[<=>]/g, '');
					});
					cellInput.maxLength = 1;

					cellInput.value = cellData;
					cellInput.onchange = function input() {
						preset.presetEditingArray[entryIndex][cellIndex] =
							this.value;
					};
					cell.appendChild(cellInput);
					newRow.appendChild(cell);
					break;
				case 2:
					cell = document.createElement('td');
					cellInput = document.createElement('input');
					cellInput.addEventListener('keyup', function () {
						this.value = this.value.match(/[0-9]+/g, '');
					});

					cellInput.value = cellData;
					cellInput.onchange = function input() {
						preset.presetEditingArray[entryIndex][cellIndex] =
							this.value;
					};
					cell.appendChild(cellInput);
					newRow.appendChild(cell);
					break;
				case 3:
					cell = document.createElement('td');
					cellInput = document.createElement('input');
					cellInput.addEventListener('keyup', function () {
						this.value = this.value.match(/[a-fzZ0-9]/g, '');
					});
					cellInput.maxLength = 1;

					cellInput.value = cellData;
					cellInput.onchange = function input() {
						preset.presetEditingArray[entryIndex][cellIndex] =
							cellInput.value;
					};
					cell.appendChild(cellInput);
					newRow.appendChild(cell);
					break;
				case 4:
					cell = document.createElement('td');
					const deleteButton = document.createElement('button');
					deleteButton.textContent = 'Delete';
					deleteButton.onclick = () => deleteEntry(entryIndex);
					const addButton = document.createElement('button');
					addButton.textContent = 'Add';
					addButton.onclick = () => addEntry(entryIndex);
					cell.appendChild(deleteButton);
					cell.appendChild(addButton);
					newRow.appendChild(cell);

					cell = document.createElement('td');
					const moveUp = document.createElement('button');
					moveUp.textContent = '/\\';
					moveUp.onclick = () =>
						moveEntry(entryIndex, MOVE_DIRECTION.Up);
					const moveDown = document.createElement('button');
					moveDown.textContent = '\\/';
					moveDown.onclick = () =>
						moveEntry(entryIndex, MOVE_DIRECTION.Down);
					if (entryIndex > 0) cell.appendChild(moveUp);
					if (entryIndex < preset.presetEditingArray.length - 1)
						cell.appendChild(moveDown);
					newRow.appendChild(cell);

					const checkboxesChecked = [false, false, false, false];
					if (cellData - 16 >= 0) {
						checkboxesChecked[3] = true;
						cellData -= 16;
					}
					if (cellData - 8 >= 0) {
						checkboxesChecked[1] = true;
						cellData -= 8;
					}
					if (cellData - 2 >= 0) {
						checkboxesChecked[2] = true;
						cellData -= 2;
					}
					if (cellData - 1 >= 0) {
						checkboxesChecked[0] = true;
						cellData -= 1;
					}

					cell = document.createElement('td');
					for (let i = 0; i < 4; i++) {
						const checkbox = document.createElement('input');
						const container = document.createElement('div');
						checkbox.type = 'checkbox';
						checkbox.checked = checkboxesChecked[i];
						cell.appendChild(container);
						switch (i) {
							case 0:
								container.textContent = 'B';
								checkbox.addEventListener(
									'change',
									function () {
										if (checkbox.checked == true)
											preset.presetEditingArray[
												entryIndex
											][4] += 1;
										else {
											preset.presetEditingArray[
												entryIndex
											][4] -= 1;
										}
									}
								);
								break;
							case 1:
								container.textContent = 'U';
								checkbox.addEventListener(
									'change',
									function () {
										if (checkbox.checked == true)
											preset.presetEditingArray[
												entryIndex
											][4] += 8;
										else {
											preset.presetEditingArray[
												entryIndex
											][4] -= 8;
										}
									}
								);
								break;
							case 2:
								container.textContent = 'I';
								checkbox.addEventListener(
									'change',
									function () {
										if (checkbox.checked == true)
											preset.presetEditingArray[
												entryIndex
											][4] += 2;
										else {
											preset.presetEditingArray[
												entryIndex
											][4] -= 2;
										}
									}
								);
								break;
							case 3:
								container.textContent = 'S';
								checkbox.addEventListener(
									'change',
									function () {
										if (checkbox.checked == true)
											preset.presetEditingArray[
												entryIndex
											][4] += 16;
										else {
											preset.presetEditingArray[
												entryIndex
											][4] -= 16;
										}
									}
								);
								break;
						}
						container.appendChild(checkbox);
					}

					newRow.appendChild(cell);
					break;
			}
		});
		tableBody.appendChild(newRow);
	});
}

function clearAllEntries() {
	preset.presetEditingArray = [];
	updateTableData();
}

function resetEntries() {
	preset.restoreDefaults();
	updateTableData();
}

function addEntry(entryIndex) {
	const newRow = ['[a-zA-Z\\- ]+', '>', '5', '9', 0];
	preset.presetEditingArray.splice(entryIndex + 1, 0, newRow);
	updateTableData();
}

function moveEntry(entryIndex, moveDirection) {
	if (entryIndex < 0 || entryIndex > preset.presetEditingArray.length - 1)
		return;
	if (moveDirection == MOVE_DIRECTION.Up)
		preset.presetEditingArray.splice(
			entryIndex - 1,
			0,
			preset.presetEditingArray.splice(entryIndex, 1)[0]
		);
	else {
		preset.presetEditingArray.splice(
			entryIndex + 1,
			0,
			preset.presetEditingArray.splice(entryIndex, 1)[0]
		);
	}

	updateTableData();
}

function deleteEntry(entryIndex) {
	preset.presetEditingArray.splice(entryIndex, 1);
	updateTableData();
}

updateTableData();
