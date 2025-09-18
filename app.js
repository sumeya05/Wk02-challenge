const BASE_URL = "http://localhost:3000/characters";
const animalList = document.getElementById("animal-list");
const nameEl = document.getElementById("animal-name");
const imgEl = document.getElementById("animal-image");
const voteCountEl = document.getElementById("vote-count");
const voteButton = document.getElementById("vote-button");
const resetButton = document.getElementById("reset-button");
const form = document.getElementById("animal-form");
let currentAnimal = null;

// Fetch and display list
fetch(BASE_URL)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((animal) => renderAnimalListItem(animal));
  });

function renderAnimalListItem(animal) {
  const btn = document.createElement("button");
  btn.textContent = animal.name;
  btn.addEventListener("click", () => showAnimalDetails(animal));
  animalList.appendChild(btn);
}

function showAnimalDetails(animal) {
  currentAnimal = { ...animal };
  nameEl.textContent = animal.name;
  imgEl.src = animal.image;
  voteCountEl.textContent = animal.votes;
}

voteButton.addEventListener("click", () => {
  if (currentAnimal) {
    currentAnimal.votes += 1;
    voteCountEl.textContent = currentAnimal.votes;
  }
});

resetButton.addEventListener("click", () => {
  if (currentAnimal) {
    currentAnimal.votes = 0;
    voteCountEl.textContent = 0;
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("new-name").value;
  const image = document.getElementById("new-image").value;

  const newAnimal = {
    name,
    image,
    votes: 0,
  };

  fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnimal),
  })
    .then((res) => res.json())
    .then((animal) => {
      renderAnimalListItem(animal);
      form.reset();
    });
});
