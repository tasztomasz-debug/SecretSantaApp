let names = [];

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
        btn.textContent = "Usuń";
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
        const txt = document.createTextNode("Wynik losowania dla: ");
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
   Jesteś sw. Mikolajem dla:
        ${receiver}
    =================
   Wesolych, radosnych Swiat!
`;

        const blob = new Blob([fileContent], { type: "text/plain" });
        a.href = URL.createObjectURL(blob);
        a.download = `${giver}.txt`;
        a.textContent = giver;

        p.appendChild(a);
        resultsDiv.appendChild(p);
    });
}
