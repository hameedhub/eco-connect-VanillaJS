// signup route
const url =`${API_URL}/api/v1/signup`
const submit = document.querySelector('input[name="submit"]');

const validatePassword = () => {
    const password = document.querySelector('input[name="password"]').value;
    const repeatPassword = document.querySelector('input[name="repeatPassword"]').value;
    if (password != repeatPassword) {
        document.querySelector('#message').textContent = 'Password not matched';
        submit.setAttribute('disabled', 'disabled');
    } else {
        document.querySelector('#message').textContent = '';
        submit.removeAttribute('disabled');
  
    }
  };
// serializing the form data...
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  submit.setAttribute('disabled', 'disabled');
  const firstname = document.querySelector('input[name="firstName"]').value;
  const lastname = document.querySelector('input[name="lastName"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  let email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;
  let e = document.querySelector('select[name="gender"]');
  const gender = e.options[e.selectedIndex].value;
  let i = document.querySelector('select[name="city"]');
  const city = i.options[i.selectedIndex].value;
  let s = document.querySelector('select[name="state"]');
  const state = s.options[s.selectedIndex].value;
  const usertype = 'client';
  if(email===""){
    user = JSON.stringify({
        firstname, lastname, phone, password, gender, city, state, usertype
      });
  }else{
    user = JSON.stringify({
        firstname, lastname, phone, email, password, gender, city, state, usertype
      });
  }

  signup(user);
});

const signup = (user) => {
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: user })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        submit.removeAttribute('disabled');
        return message.textContent = res.error;
      }
      message.textContent = 'Registeration was successful';
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('firstname', res.data.firstname);
      sessionStorage.setItem('lastname', res.data.lastname);
      sessionStorage.setItem('phone', res.data.phone);
      sessionStorage.setItem('email', res.data.email);
      sessionStorage.setItem('usertype', res.data.usertype);
      sessionStorage.setItem('gender', res.data.gender);
      sessionStorage.setItem('city', res.data.city);
      sessionStorage.setItem('state', res.data.state);
      const usertype = sessionStorage.getItem('usertype');
      if (usertype === 'client') {
        window.location.href = 'dashboard.html';
      } else if (usertype === '') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
 });
};