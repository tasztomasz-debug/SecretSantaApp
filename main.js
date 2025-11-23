let names = [];

window.onload = function () {
    alert(
        "Dodaj imiona uczestników po kolei wpisując w pole tekstowe i klikając 'Dodaj imię'.\n\n" +
            "Po uzupełnieniu listy naciśnij przycisk 'Losuj!', który wygeneruje pliki tekstowe oznaczone imionami uczestników.\n\n" +
            "Rozdaj pliki uczestnikom, ale nie podglądaj zawartości ;-)\n\n" +
            "Miłej zabawy i wesołych świąt!)"
    );
};

function addName() {
    const input = document.getElementById("nameInput");
    const name = input.value.trim();
    if (name && !names.includes(name)) {
        names.push(name);
        renderList();
        input.value = "";
    }
}

function removeName(index) {
    names.splice(index, 1);
    renderList();
}

function renderList() {
    const list = document.getElementById("namesList");
    list.innerHTML = "";
    names.forEach((name, index) => {
        const li = document.createElement("li");
        li.textContent = name + " ";
        const btn = document.createElement("button");
        btn.textContent = "X";
        btn.className = "delete-btn";
        btn.onclick = () => removeName(index);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
}

function draw() {
    if (names.length < 2) {
        alert("Dodaj co najmniej 2 osoby, żeby losować!");
        return;
    }

    let shuffled, valid;
    do {
        shuffled = shuffle([...names]);
        valid = true;
        for (let i = 0; i < names.length; i++) {
            if (names[i] === shuffled[i]) {
                valid = false; // ktoś wylosował siebie
                break;
            }
        }
    } while (!valid);

    const results = names.map((name, i) => ({
        giver: name,
        receiver: shuffled[i],
    }));

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    results.forEach(({ giver, receiver }) => {
        const p = document.createElement("p");

        // Zwykły tekst "Plik dla:"
        const txt = document.createTextNode("Plik dla:");
        p.appendChild(txt);

        // Hyperlink tylko z imieniem
        const a = document.createElement("a");
        const fileContent = `
              
              * 
             /|\\
            /*o \\
           /**O* \\
          /****o* \\
              |
      =================
   Jestes sw. Mikolajem dla:

    --> ${receiver} <--

      =================
   Wesolych, radosnych Swiat!
`;

        const blob = new Blob([fileContent], { type: "text/plain" });

        a.href = URL.createObjectURL(blob);
        a.download = `Plik_dla_${giver}_Secret_Santa.txt`;
        a.textContent = giver;

        p.appendChild(a);
        resultsDiv.appendChild(p);
    });
}
document
    .getElementById("nameInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addName();
        }
    });
