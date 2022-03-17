const ulRef = document.querySelector("ul");
const inputRef = document.querySelector("#todo-task");
const selectRef = document.querySelector("#todo-status");
const editItemIdRef = document.querySelector("#edit-item-id");
const submitButtonRef = document.querySelector("#submit-button");
const cancelButtonRef = document.querySelector("#cancel-button");

const url = "http://localhost:3000";

const getStatusName = (status) =>
  status === 1
    ? "IMCOMPLETE"
    : status === 2
    ? "PROGRESS"
    : status === 3
    ? "PENDING  "
    : "COMPLETE";

const handleResetForm = () => {
  inputRef.value = "";
  selectRef.value = "";
  editItemIdRef.value = "";
  submitButtonRef.textContent = "Add Item";
};

const handleSelectEditItem = ({ id, task, status }) => {
  editItemIdRef.value = id;
  inputRef.value = task;
  selectRef.value = status;
  submitButtonRef.textContent = "Edit Item";
};

const handleGetItems = async () => {
  const res = await fetch(`${url}/todo`);
  const todos = await res.json();

  while (ulRef.firstChild) {
    ulRef.removeChild(ulRef.firstChild);
  }

  inputRef.value = "";

  todos.forEach((todo) => {
    const spanRef = document.createElement("span");
    const liRef = document.createElement("li");
    spanRef.textContent = `${todo.task} - ${getStatusName(todo.status)}`;
    liRef.appendChild(spanRef);

    const editButtonRef = document.createElement("button");
    editButtonRef.textContent = "edit";
    liRef.appendChild(editButtonRef);
    editButtonRef.addEventListener("click", () =>
      handleSelectEditItem({
        id: todo.id,
        task: todo.task,
        status: todo.status,
      })
    );

    const deleteButtonRef = document.createElement("button");
    deleteButtonRef.textContent = "delete";
    liRef.appendChild(deleteButtonRef);
    deleteButtonRef.addEventListener("click", () => handleDeleteItem(todo.id));

    ulRef.appendChild(liRef);
  });
};

window.addEventListener("load", handleGetItems);

const handleAddItem = async () => {
  const value = inputRef.value;
  const status = selectRef.value;
  await fetch(`${url}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task: value, status }),
  });
  await handleGetItems();
};

const handleEditItem = async () => {
  const id = editItemIdRef.value;
  const task = inputRef.value;
  const status = selectRef.value;
  await fetch(`${url}/todo/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, status }),
  });
  await handleGetItems();
};

const handleDeleteItem = async (id) => {
  await fetch(`${url}/todo/${id}`, {
    method: "DELETE",
  });
  await handleGetItems();
};

submitButtonRef.addEventListener("click", async () => {
  if (submitButtonRef.textContent === "Edit Item") {
    await handleEditItem();
  } else {
    await handleAddItem();
  }
  handleResetForm();
});

cancelButtonRef.addEventListener("click", handleResetForm);
