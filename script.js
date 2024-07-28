window.addEventListener("DOMContentLoaded", () => {
  loadData();
});

const CRUD_API_LINK =
  "https://crudcrud.com/api/09054e0474e747afa4a9a081b7111d49/feedbackForm";

let oneStar = document.getElementById("one-star");
let twoStar = document.getElementById("two-star");
let threeStar = document.getElementById("three-star");
let fourStar = document.getElementById("four-star");
let fiveStar = document.getElementById("five-star");

const form = document.querySelector("form");
let nameInput = document.getElementById("name");
let ratingInput = document.getElementById("rating");
let ulEl = document.querySelector("ul");

// event occur when form is submitted
form.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
    let feedbackDetail = {
      name: nameInput.value,
      rating: ratingInput.value,
    };

    console.log(feedbackDetail);
    const data = await axios.post(CRUD_API_LINK, feedbackDetail);
    console.log(data);
    nameInput.value = "";
    ratingInput.value = 1;
    loadData();
  } catch (error) {
    console.log(error);
  }
});

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

    oneStar.innerText = one;
    twoStar.innerText = two;
    threeStar.innerText = three;
    fourStar.innerText = four;
    fiveStar.innerText = five;
  } catch (error) {
    console.log(error);
  }
}

// Delete item
async function deleteItem(id) {
  try {
    let data = await axios.delete(`${CRUD_API_LINK}/${id}`);
    console.log(data);
    loadData();
  } catch (error) {
    console.log(error);
  }
}

// Edit item
function edit(id, name, rating) {
  //poluted the input field
  nameInput.value = name;
  ratingInput.value = rating;
  deleteItem(id);
}
