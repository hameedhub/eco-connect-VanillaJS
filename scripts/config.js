const API_URL = 'https://ecoconnect.herokuapp.com';

const logout = ()=>{
    sessionStorage.clear();
    window.location ='login.html';
}