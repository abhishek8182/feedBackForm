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

loadData();
// console.log(form)
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  let feedbackDetail ={
    name: nameInput.value,
    rating: ratingInput.value,
  }

  console.log(feedbackDetail);
  axios.post('https://crudcrud.com/api/121418ffb27449b2b1248b18b4390588/feedbackForm', feedbackDetail)
  .then (res => {
    console.log(res);
    nameInput.value = "";
    ratingInput.value = 1;
    loadData();
  })
  .catch(err=>console.log(err))

})

function loadData(){
  ulEl.innerHTML = "";
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;

  axios.get('https://crudcrud.com/api/121418ffb27449b2b1248b18b4390588/feedbackForm')
  .then((res)=>{
    console.log(res.data)
    res.data.forEach(element => {
      let liEl = document.createElement('li');
      liEl.innerHTML = `${element.name} - ${element.rating} - <button onclick="deleteItem('${element._id}')">Delete</button> - <button onclick="edit('${element._id}', '${element.name}', '${element.rating}')">Edit</button>`

      ulEl.append(liEl)

      if(element.rating == 1){
        one++;
      }else if(element.rating == 2){
        two++;
      }else if(element.rating == 3){
        three++;
      }else if(element.rating == 4){
        four++;
      }else{
        five++;
      }
      
    });

    oneStar.innerText = one;
    twoStar.innerText = two;
    threeStar.innerText = three;
    fourStar.innerText = four;
    fiveStar.innerText = five;
  })
}

function deleteItem(id){
  axios.delete(`https://crudcrud.com/api/121418ffb27449b2b1248b18b4390588/feedbackForm/${id}`)
  .then(res => {
    console.log(res);
    loadData();
  })
  .catch(err => console.log(err));
}

function edit(id, name, rating) {
  nameInput.value = name;
  ratingInput.value = rating;
  deleteItem(id);
}
// 9794083253 vikash mishra
// btn.addEventListener('click', (e)=>{
//   e.preventDefault();
//   console.log("form submit")
//   let userDetails = {
//     name:nameInput.value,
//     rating: ratingInput.value,
//   }
//    async function post(){
//     try{
//       axios.post('https://crudcrud.com/api/155f28db0faa4ccdaeffa7694a423655/feedbackForm',userDetails)
//     .then(function (response) {
//     console.log(response);
//     console.log(userDetails)
//     nameInput.value = ""
//     ratingInput.value = 1
//     loadData();
//   })
//     }
//     catch(error){
//       console.log(error);

//     }
//   }
//   post();
//   // .catch(function (error) {
//   // });

//   // location.reload()

// })


// let one= 0;
// let two= 0;
// let three = 0;
// let four = 0;
// let five = 0;

// window.addEventListener('DOMContentLoaded',loadData)
  
  
// function loadData(){
//   ulEl.innerHTML =""
//   axios.get("https://crudcrud.com/api/155f28db0faa4ccdaeffa7694a423655/feedbackForm")
//   .then((response)=>{
//     response.data.forEach((el)=>{
//       if(el.rating == 1){
//         one++;
//       }else if(el.rating ==2){
//         two++;
//       }else if(el.rating ==3){
//         three++;
//       }else if(el.rating == 4){
//         four++;
//       }else{
//         five++;
//       }
//       displayUserOnScreen(el)
      
//     })
//     oneStar.innerText = one;
//     twoStar.innerText = two;
//     threeStar.innerText = three;
//     fourStar.innerText = four;
//     fiveStar.innerText = five;
//     // console.log(response.data)
//   })
//   .catch((error)=>{
//     console.log(error)
//   })
// }

// function displayUserOnScreen(userDetails) {
//   const userItem = document.createElement("li");
//   userItem.appendChild(
//     document.createTextNode(
//       `${userDetails.name} - ${userDetails.rating}`
//     )
//   );

//   const deleteBtn = document.createElement("button");
//   deleteBtn.appendChild(document.createTextNode("Delete"));
//   userItem.appendChild(deleteBtn);

//   const editBtn = document.createElement("button");
//   editBtn.appendChild(document.createTextNode("Edit"));
//   userItem.appendChild(editBtn);

//   const userList = document.querySelector("ul");
//   userList.appendChild(userItem);

//   deleteBtn.addEventListener("click", function (event) {
//     userList.removeChild(event.target.parentElement);
//     // localStorage.removeItem(userDetails.email);
     
//     axios.delete(`https://crudcrud.com/api/155f28db0faa4ccdaeffa7694a423655/feedbackForm/${userDetails._id}`)
//     .then(response=>{console.log(response)
//       loadData();
//     })
//     .catch(error=>console.log(error))
//     // console.log(userDetails._id)
//     // location.reload()
    

//   });

//   editBtn.addEventListener("click", function (event) {
//     userList.removeChild(event.target.parentElement);
//     // localStorage.removeItem(userDetails.email);
    
//     nameInput.value = userDetails.name;
//     ratingInput.value = userDetails.rating;

//     axios.delete(`https://crudcrud.com/api/155f28db0faa4ccdaeffa7694a423655/feedbackForm/${userDetails._id}`)
//     .then(response=>console.log(response))
//     .catch(error=>console.log(error))


//   });
// }

