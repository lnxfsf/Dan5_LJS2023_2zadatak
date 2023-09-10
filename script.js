

const charCountInput = document.getElementById("charCount");
const napraviButton = document.getElementById("generisi");
const dodajButton = document.getElementById("dodaj");
const container = document.getElementById("container");


const pali = document.getElementById("pali");


let squares = [];

napraviButton.addEventListener("click", napraviKvadrate);
dodajButton.addEventListener("click", dodajKvadrat);



// na osnovu inputa sto se unese on ce ovde 
function napraviKvadrate() {
	const charCount = parseInt(charCountInput.value);


	squares = [];
	container.innerHTML = "";
	for (let i = 0; i < charCount; i++) {
		napraviKvadrat();
	}
}



function napraviKvadrat(squareNumber) {



	// on ovde na osnovu inputa napravi toliko 
	const squareContainer = document.createElement("div"); // kreira div element
	squareContainer.className = "square-container";  // u taj div element doda ovu klasu 


	const square = document.createElement("div"); // kreira div element
	square.className = "square"; // u taj div element doda ovu klasu 
	square.contentEditable = true;  // da taj div moze u njega da unosimo tekst

	square.style.backgroundColor = "white";
	square.addEventListener("input", Palindrome);  // i kad se unese element, onda poziva funkciju da proveri da li je tekst palindrom

	const numberSpan = document.createElement("span");  // kreira span element 
	numberSpan.textContent = squareNumber;  // i assignuje broj div-a koji je. da bi znali da ga brisemo posle...



// boxicon da se doda smece...
const icon = document.createElement("i");
icon.className = "bx bxs-trash-alt";
	icon.style.backgroundColor = "white";


	// ovo je delete button. dodaje ispod ovog gore. i stavlja event listener. a kao argument za brisanje se salje ovaj squareContainer sto sadrzi elemente i sve sto treba.. to je kao DOM referenca na taj div sto drzi ove buttons i jos jedan div zajedno...
	const deleteButton = document.createElement("button");
	deleteButton.className = "delete-button";
	// da ima trash icon ovde
	deleteButton.appendChild(icon);
	deleteButton.style.backgroundColor = "white";
	deleteButton.addEventListener("click", () => obrisiKvadrat(squareContainer));



	// dodajemo u ovaj container, da bi ih sve prikazao u glavni..  div (container)
	squareContainer.appendChild(numberSpan);
	squareContainer.appendChild(square);
	squareContainer.appendChild(deleteButton);

	container.appendChild(squareContainer);
	squares.push(square);
}


function dodajKvadrat() {
	napraviKvadrat();
}




// on ovde obrise taj element. 
function obrisiKvadrat(squareContainer) {




	// trazi na koji indeks liste se nalazi ovaj element. jer je squareContainer referenca do tog izabranog div-a sto nam je... 
	const index = squares.indexOf(squareContainer.querySelector(".square"));



	// on ga sklanja iz liste
	if (index !== -1) {
		squares.splice(index, 1);
	}

	// da bi ga maknio i sa DOM-a..
	container.removeChild(squareContainer);


	// Ako nema vise kvadrata da makne onaj prikaz teksta za palindrom ili ne... 
	if (squares.length === 0) {

		// sakrij ovaj tekst za palindrom kada se sve obrise (kvadrati). OK, works
		pali.style.display = "none";

	}

}

function Palindrome() {



	// on ovde proverava da li je palindrom, glavni deo
	// samo A-Z , a-z i space moze da prodje
	const text = this.innerText.toLowerCase().replace(/[^a-z ]/g, "");  // da očisti taj input string.. 

	this.innerText = text;

	// on ovde reversuje tekst, da bi uporedio reversed text i običan tekst koji je unešen
	const reversedText = text.split("").reverse().join("");
	const isPalindrome = text === reversedText; // to je ovde, da proveri da li normalan tekst odgovara sa reversed tekstom...




	// promeni pozadinu kvadrata, i prikaze ispod message 
	if (isPalindrome) {
		this.style.backgroundColor = "#4CAF50";

		pali.className = "pali";
		pali.textContent = "Jeste palindrom";

	} else {
		this.style.backgroundColor = "#F44336";

		pali.className = "pali";
		pali.textContent = "Nije palindrom";


	}




}













