const url = `${API_URL}/api/v1/login`;

const form = document.querySelector('form');
const submit = document.querySelector('input[name="submit"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submit.setAttribute('disabled', 'disabled');
  phone = document.querySelector('input[name="phone"]').value;
  password = document.querySelector('input[name="password"]').value;
  user = JSON.stringify({ phone, password });
  console.log(user);
  login(user);
});

const login = (user) => {
    console.log(user);
  fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: user })
    .then(res => res.json())
    .then((res) => {
      if (res.error) {
        const p = document.querySelector('#message');
        submit.removeAttribute('disabled');
        p.textContent = res.error;
        return false;
      }
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('firstname', res.data.firstname);
      sessionStorage.setItem('lastname', res.data.lastname);
      sessionStorage.setItem('phone', res.data.phone);
      sessionStorage.setItem('email', res.data.email);
      sessionStorage.setItem('usertype', res.data.usertype);
      sessionStorage.setItem('gender', res.data.city);
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