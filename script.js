let oneStar = document.getElementById('one-star')
let twoStar = document.getElementById('two-star')
let threeStar = document.getElementById('three-star')
let fourStar = document.getElementById('four-star')
let fiveStar = document.getElementById('five-star')

const form = document.querySelector('form');
let nameInput = document.getElementById('name');
let ratingInput = document.getElementById('rating');
let btn = document.getElementById('btn');
let ulEl = document.querySelector('ul');

btn.addEventListener('click', (e)=>{
  e.preventDefault();
  let userDetails = {
    name:nameInput.value,
    rating: ratingInput.value,
  }

  axios.post('https://crudcrud.com/api/1dc488ebbc9645658feb329a9d9c284a/feedbackForm',userDetails);
  // console.log(userDetails)
  nameInput.value = ""
  ratingInput.value = 1
  location.reload()
  // loadData();
})


let one= 0;
let two= 0;
let three = 0;
let four = 0;
let five = 0;

window.addEventListener('DOMContentLoaded',loadData)
  
  
function loadData(){
  axios.get("https://crudcrud.com/api/1dc488ebbc9645658feb329a9d9c284a/feedbackForm")
  .then((response)=>{
    response.data.forEach((el)=>{
      if(el.rating == 1){
        one++;
      }else if(el.rating ==2){
        two++;
      }else if(el.rating ==3){
        three++;
      }else if(el.rating == 4){
        four++;
      }else{
        five++;
      }
      displayUserOnScreen(el)
      
    })
    oneStar.innerText = one;
    twoStar.innerText = two;
    threeStar.innerText = three;
    fourStar.innerText = four;
    fiveStar.innerText = five;
    // console.log(response.data)
  })
  .catch((error)=>{
    console.log(error)
  })
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.name} - ${userDetails.rating}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

  deleteBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // localStorage.removeItem(userDetails.email);
     
    axios.delete(`https://crudcrud.com/api/1dc488ebbc9645658feb329a9d9c284a/feedbackForm/${userDetails._id}`)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))
    // console.log(userDetails._id)
    location.reload()

  });

  editBtn.addEventListener("click", function (event) {
    userList.removeChild(event.target.parentElement);
    // localStorage.removeItem(userDetails.email);
    
    nameInput.value = userDetails.name;
    ratingInput.value = userDetails.rating;

    axios.delete(`https://crudcrud.com/api/1dc488ebbc9645658feb329a9d9c284a/feedbackForm/${userDetails._id}`)
    .then(response=>console.log(response))
    .catch(error=>console.log(error))


  });
}

