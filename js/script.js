const noteText = document.getElementById("noteTxt");
addBtn = document.getElementById("addNote");
notesElem = document.getElementById("notes");
emptyList = document.getElementById("emptyList");
noNotes = document.getElementById("noNotes");
searchInp = document.getElementById("searchInp");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

addBtn.addEventListener("click", () => {
  if (noteText.value == "") {
    alert("Type something!");
  } else {
    notes.unshift({ value: noteText.value, highlighted: false });
    noteText.value = "";
    updateList();
    saveItems();
  }
});

function deleteNote(index) {
  notes.splice(index, 1);
  updateList();
  saveItems();
}

function completedNote(index) {
  notes[index].highlighted = !notes[index].highlighted;
  updateList();
  saveItems();
}

function updateList() {
  emptyList.remove();
  noNotes.remove();
  notesElem.innerHTML = "";

  notes.forEach((note, index) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const span = document.createElement("span");
    span.textContent = note.value;

    const completedBtn = document.createElement("button");
    completedBtn.textContent = `✓`;
    completedBtn.setAttribute("title", "Task completed");
    completedBtn.setAttribute("type", "button");
    completedBtn.classList.add("btn");
    completedBtn.classList.add("btn-success");
    completedBtn.onclick = () => completedNote(index);

    if (notes[index].highlighted) {
      li.classList.add("highlight");
      completedBtn.classList.add("btn-warning");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "⨉";
    deleteBtn.setAttribute("title", "Delete note");
    deleteBtn.setAttribute("type", "button");
    deleteBtn.classList.add("btn");
    deleteBtn.classList.add("btn-danger");
    deleteBtn.onclick = () => deleteNote(index);

    li.appendChild(completedBtn);
    li.appendChild(deleteBtn);
    li.appendChild(span);

    notesElem.appendChild(li);
  });

  if (notes.length < 1) {
    notesElem.appendChild(emptyList);
  }
}

function saveItems() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function searchNote() {
  var filter = searchInp.value.toUpperCase();
  var liElem = notesElem.getElementsByTagName("li");
  var found = false;

  for (var i = 0; i < liElem.length; i++) {
    var span = liElem[i].getElementsByTagName("span")[0];
    var txtValue = span.textContent || span.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      liElem[i].style.display = "";
      found = true;
      noNotes.remove();
    } else {
      liElem[i].style.display = "none";
    }
  }

  if (!found) {
    notesElem.appendChild(noNotes);
  } else {
    noNotes.remove();
  }
}

updateList();
