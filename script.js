
document.addEventListener("DOMContentLoaded", function () {
	const charCountInput = document.getElementById("charCount");
	const generateButton = document.getElementById("generate");
	const addButton = document.getElementById("add");
	const container = document.getElementById("container");
	const pal = document.getElementById("pal");


	let squares = [];

	generateButton.addEventListener("click", generateSquares);
	addButton.addEventListener("click", addSquare);


	function generateSquares() {
		const charCount = parseInt(charCountInput.value);

		if (isNaN(charCount) || charCount <= 0) {
			alert("Molimo unesite validan broj karaktera.");
			return;
		}

		squares = [];
		container.innerHTML = "";
		for (let i = 0; i < charCount; i++) {
			createSquare();
		}
	}



	function createSquare(squareNumber) {
		const squareContainer = document.createElement("div");
		squareContainer.className = "square-container";

		const square = document.createElement("div");
		square.className = "square";
		square.contentEditable = true;
		square.addEventListener("input", checkPalindrome);

		const numberSpan = document.createElement("span");
		numberSpan.textContent = squareNumber;

		const deleteButton = document.createElement("button");
		deleteButton.className = "delete-button";
		deleteButton.textContent = "X";
		deleteButton.addEventListener("click", () => deleteSquare(squareContainer));

		squareContainer.appendChild(numberSpan);
		squareContainer.appendChild(square);
		squareContainer.appendChild(deleteButton);

		container.appendChild(squareContainer);
		squares.push(square);
	}


	function addSquare() {
		createSquare();
	}

	function deleteSquare(squareContainer) {
		const index = squares.indexOf(squareContainer.querySelector(".square"));
		if (index !== -1) {
			squares.splice(index, 1);
		}
		container.removeChild(squareContainer);
	}

	function checkPalindrome() {
		const text = this.innerText.toLowerCase().replace(/[^a-z ]/g, "");
		this.innerText = text;
		const reversedText = text.split("").reverse().join("");
		const isPalindrome = text === reversedText;

		if (isPalindrome) {
			this.style.backgroundColor = "lightgreen";

			pal.textContent = "Jeste palindrom";

		} else {
			this.style.backgroundColor = "red";
			pal.textContent = "Nije palindrom";


		}

		const message = isPalindrome
			? "Unijeta riječ je palindrom"
			: "Unijeta riječ nije palindrom";
		const messageElement = document.createElement("p");
		messageElement.textContent = message;

		const squareContainer = this.parentNode;
		squareContainer.querySelector(".message").remove();
		squareContainer.appendChild(messageElement);
		messageElement.className = "message";
	}







});






