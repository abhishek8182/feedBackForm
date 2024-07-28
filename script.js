window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

const CRUD_API_LINK =
  "https://crudcrud.com/api/29204912207b4611946470390f3737e5/feedbackForm";

const form = document.querySelector("form");
let ulEl = document.querySelector("ul");

// event occur when form is submitted
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdate();
});

async function addOrUpdate() {
  try {
    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;

    await axios.post(CRUD_API_LINK, { name, rating });
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

    //console.log(res); //get object with data property

    //console.log(res.data); //get data in array

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
  //polluted the input field
  document.getElementById("name").value = name;
  document.getElementById("rating").value = rating;
  deleteItem(id);
}
