//the state
const state = {
  bank: [],
  odds: [],
  evens: [],
};
//logic functions
function addNumber(number) {
  //check if the input is not a number. if it is a number returns true and prevent blank spaces
  if (!isNaN(number) && number !== "") {
    state.bank.push(Number(number));
    render();
  }
}
function sortByOne() {
  //cant be empty or function stops
  if (state.bank.length === 0) return;

  //shift() removes the first number from bank array
  const num = state.bank.shift();
  if (num % 2 === 0) {
    //to define an even number, teue otherwise is odd
    state.evens.push(num);
  } else {
    state.odds.push(num);
  }
  render();
}
function sortAll() {
  //while loop to create a continuos cycle
  while (state.bank.length > 0) {
    sortByOne(); //trigering each time the sortOne function above
  }
}
//components (functions)
//note: components must return HTML strings or DOM elem declared on state
function numberForm() {
  return `
    <form id="addNumberForm" style="display: flex; gap: 10px; align-items: center;">
      <label>Add a number to the bank</label>
      <input type="number" name="number" required />
      <button type="submit">Add number</button>
      <button type="button" id="sortOne">Sort One</button>
      <button type="button" id="sortAll">Sort All</button>
    </form>
  `;
}
function numberBank() {
  return `
    <section id="bank">
    <h2>Number Bank</h2>
    <div style="border: 1px solid #ccc; padding: 10px; min-height: 10px;">
        ${state.bank.join(", ")}
      </div>
      <div style="margin-top: 10px; display: flex; gap: 10px;"></div>
       </section>`;
}
function sortedDisplay() {
  return `
    <section id="sortedNumbers">
      <div>
        <h2>Evens</h2>
        <div style="border: 1px solid #ccc; padding: 10px; min-height: 10px;">
          ${state.evens.join(", ")}
        </div>
      </div>
      <div>
        <h2>Odds</h2>
        <div style="border: 1px solid #ccc; padding: 10px; min-height: 10px;">
          ${state.odds.join(", ")}
        </div>
      </div>
    </section>
  `;
}
function sortedNumbers() {
  return `
    <section id="sorted">
    <div>
    <h2>Evens</h2>
    <p>${state.evens.join(", ")}</P> 
    <div>
    <h2>Odds</h2>
    <p>${state.odds.join(", ")}</p>
    </div>
    </section>`;
}
//rendering
function render() {
  const root = document.querySelector("body");
  root.innerHTML = `
    <main style="padding: 20px; font-family: sans-serif;">
      <h1>Odds and Evens</h1>
      ${numberForm()}
      <hr />
      ${numberBank()}
      <hr />
      ${sortedDisplay()}
    </main>
  `;
  //   //take whatever is in root, it add the bank, and then the sortedNumbers (the col for evens and odds)
  //   root.innerHTML += numberBank();
  //   root.innerHTML += sortedNumbers();

  //reattach even listeners after rendering
  document
    .getElementById("addNumberForm")
    .addEventListener("submit", (event) => {
      event.preventDefault();
      const num = event.target.number.value;
      addNumber(num);
    });

  document.getElementById("sortOne").addEventListener("click", sortByOne);
  document.getElementById("sortAll").addEventListener("click", sortAll);
}
render();
