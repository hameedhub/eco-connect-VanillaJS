const urlRequest = `${API_URL}/api/v1/request/pickup`;

const form = document.querySelector('#requestPickup');
const submit = document.querySelector('input[name="submit"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submit.setAttribute('disabled', 'disabled');
 const formData = new FormData(form);
  makeRequest(formData);
});

const makeRequest =(request)=>{
    fetch(urlRequest, { method: 'POST', headers: { authorization: `Bearer ${token}` }, body: request })
    .then(res => res.json())
    .then((res) => {

        if(res.error){
            submit.removeAttribute('disabled');
            document.querySelector('#response').textContent=res.error
        }
        document.querySelector('#response').textContent=res.response
    });

    
}