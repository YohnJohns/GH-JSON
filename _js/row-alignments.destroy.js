//const alignButtons = document.querySelectorAll(".change-row-align");
//const alignRow = document.getElementById("row-align-example");
alignButtons.forEach((button) => {
	button.removeEventListener("click", () => {
		let dir = button.getAttribute('data-align');
		console.log(dir)
		if (dir == 'start') {
			alignRow.classList.remove('align-center', 'align-end');
			alignRow.classList.add('align-start');
		} else if (dir == 'center') {
			alignRow.classList.remove('align-start', 'align-end');
			alignRow.classList.add('align-center');
		} else {
			alignRow.classList.remove('align-start', 'align-center');
			alignRow.classList.add('align-end');
		}
	});
});