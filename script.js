window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

const CRUD_API_LINK =
  "https://crudcrud.com/api/ad3081fa6d30462e9d414bad116990f9/feedbackForm";

const form = document.querySelector("form");
let ulEl = document.querySelector("ul");

let editId = null; // Store the id of the item being edited

// Event occurs when the form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdate();
});

async function addOrUpdate() {
  try {
    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;

    if (editId) {
      // If editId is not null, update the existing item
      await axios.put(`${CRUD_API_LINK}/${editId}`, { name, rating });
      editId = null; // Reset editId after updating
    } else {
      // Otherwise, create a new item
      await axios.post(CRUD_API_LINK, { name, rating });
    }

    form.reset();
    loadData();
  } catch (error) {
    console.log(error);
  }
}

// Load Data
async function loadData() {
  try {
    ulEl.innerHTML = "";
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;

    const res = await axios.get(CRUD_API_LINK);

    res.data.forEach((element) => {
      let liEl = document.createElement("li");

      liEl.innerHTML = `${element.name} - ${element.rating} - <button onclick="deleteItem('${element._id}')">Delete</button> - <button onclick="edit('${element._id}', '${element.name}', '${element.rating}')">Edit</button>`;

      ulEl.append(liEl);

      if (element.rating == 1) {
        one++;
      } else if (element.rating == 2) {
        two++;
      } else if (element.rating == 3) {
        three++;
      } else if (element.rating == 4) {
        four++;
      } else {
        five++;
      }
    });

    document.getElementById("one-star").innerText = one;
    document.getElementById("two-star").innerText = two;
    document.getElementById("three-star").innerText = three;
    document.getElementById("four-star").innerText = four;
    document.getElementById("five-star").innerText = five;
  } catch (error) {
    console.log(error);
  }
}

// Delete item
async function deleteItem(id) {
  try {
    await axios.delete(`${CRUD_API_LINK}/${id}`);
    loadData();
  } catch (error) {
    console.log(error);
  }
}

// Edit item
function edit(id, name, rating) {
  // Populate the input fields with the selected item’s data
  document.getElementById("name").value = name;
  document.getElementById("rating").value = rating;
  editId = id; // Set the editId to the id of the item being edited
}
