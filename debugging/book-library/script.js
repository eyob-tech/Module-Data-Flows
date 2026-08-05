const myLibrary = [];

window.addEventListener("load", function (e) {
  populateStorage();
  render();
});

function populateStorage() {
  if (myLibrary.length == 0) {
    const book1 = new Book("Robison Crusoe", "Daniel Defoe", "252", true);
    const book2 = new Book(
      "The Old Man and the Sea",
      "Ernest Hemingway",
      "127",
      true
    );
    myLibrary.push(book1);
    myLibrary.push(book2);
  }
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const checkInput = document.getElementById("check");

//check the right input from forms and if its ok -> add the new book (object in array)
//via Book function and start render function
function submit() {
  if (
  titleInput.value == "" ||
  authorInput.value == "" ||
  pagesInput.value == ""
) {
  alert("Please fill all fields!");
  return false;
}

if (Number(pagesInput.value) < 1 || !Number.isInteger(Number(pagesInput.value))) {
  alert("Pages must be a whole number of 1 or more");
  return false;
}
 else {
    let book = new Book(
      titleInput.value.trim(),
      authorInput.value.trim(),
      Number(pagesInput.value),
      checkInput.checked
    );
    myLibrary.push(book);
    render();
  }
}

function Book(title, author, pages, check) {
  this.title = title;
  this.author = author;
  this.pages = Number(pages);
  this.check = check;
}

function showMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.className = "alert alert-info";
  document.body.prepend(msg);
  setTimeout(() => msg.remove(), 2000);
}

function render() {
  const table = document.getElementById("display");
  const tbody = table.querySelector("tbody");
  tbody.innerHTML = "";
  //insert updated row and cells
  const length = myLibrary.length;
  for (let i = 0; i < length; i++) {
    const row = tbody.insertRow();
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);
    const pagesCell = row.insertCell(2);
    const wasReadCell = row.insertCell(3);
    const deleteCell = row.insertCell(4);
    titleCell.textContent = myLibrary[i].title;
    authorCell.textContent = myLibrary[i].author;
    pagesCell.textContent = myLibrary[i].pages;

    //add and wait for action for read/unread button
    const changeButton = document.createElement("button");
    changeButton.className = "btn btn-success";
    wasReadCell.appendChild(changeButton);
    changeButton.innerText = myLibrary[i].check ? "Yes" : "No";

    changeButton.addEventListener("click", function () {
      myLibrary[i].check = !myLibrary[i].check;
      render();
    });

    //add delete button to every row and render again
    const delButton = document.createElement("button");
    deleteCell.appendChild(delButton);
    delButton.className = "btn btn-warning";
    delButton.innerHTML = "Delete";
    delButton.addEventListener("click", function () {
      const deletedTitle = myLibrary[i].title;
      myLibrary.splice(i, 1);
      render();
      showMessage(`You've deleted title: ${deletedTitle}`);
    });
  }
}
