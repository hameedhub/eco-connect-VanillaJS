//session storage data
const token = sessionStorage.getItem('token');
const firstname = sessionStorage.getItem('firstname');
const lastname = sessionStorage.getItem('lastname');
const phone = sessionStorage.getItem('phone');
const email = sessionStorage.getItem('email');
const gender = sessionStorage.getItem('gender');
const city = sessionStorage.getItem('city');
const state = sessionStorage.getItem('state');
const usertype = sessionStorage.getItem('usertype');
// Url
const url = `${API_URL}/api/v1/request/pickup/${phone}`;
fetch(url, { method: 'GET', headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }})
    .then(res => res.json())
    .then((res) => {
      if (res.status === 401) {
        window.location.href = 'login.html';
      }
      if(res.status === 404){
        document.querySelector('#num_recyled').textContent=0;
      }
      else{
        let pending =[]; let successful=[];

        res.data.forEach(e=>{
          if(e.status === null || 'pending'){
            pending.push(e);
          }
          if(e.status === 'successful'){
            successful.push(e);
          }
        });
        document.querySelector('#num_recyled').textContent=successful.length;
        document.querySelector('#num_pending').textContent=pending.length;
      }

     
});

//DOM manipulation
document.querySelector('title').textContent=`${firstname} ${lastname} - eco-connect`;
document.querySelector('#fullname').textContent=`${firstname} ${lastname}`;
document.querySelector('#phone').textContent=`Customer ID: ${phone}`;

// profile page
document.querySelector('input[name="firstName"]').value =firstname;
document.querySelector('input[name="lastName"]').value= lastname;
document.querySelector('input[name="phone"]').value= phone;
document.querySelector('input[name="email"]').value= email;
document.querySelector('input[name="city"]').value=city;
document.querySelector('input[name="state"]').value= state;
