const urlPickupHistory = `${API_URL}/api/v1/request/pickup/${phone}`;
fetch(urlPickupHistory, { method: 'GET', headers: { 'Content-Type': 'application/json', authorization: `Bearer ${token}` }})
    .then(res => res.json())
    .then((res) => {
      if (res.status === 401) {
        window.location.href = 'login.html';
      }
      if(res.status === 404){
        document.querySelector('#num_recyled').textContent=0;
      }
      else{
          // pickup History proccess
          const pickup = res.data;
        
          pickup.forEach(e => {
          // document tag 
          const pickupRow = document.querySelector('#historyRow');
          const pickAlert = document.createElement('div');
          pickAlert.setAttribute('class', 'alert alert-info alert-with-icon');
          const pickupIcon = document.createElement('i');
          pickupIcon.setAttribute('class', 'material-icons');
          pickupIcon.setAttribute('data-notify', 'icon');
          pickupIcon.textContent='local_shipping';
          pickAlert.appendChild(pickupIcon);
  
          const spanTime = document.createElement('span');
          spanTime.textContent=e.time;
          pickAlert.appendChild(spanTime);
          const spanMessage = document.createElement('span');
          spanMessage.setAttribute('data-notify', 'message')
          spanMessage.textContent=`Your pickup request for ${e.waste} waste was submitted. Address :  ${e.address} and the status is ${e.status} `;
          pickAlert.appendChild(spanMessage);
          pickupRow.appendChild(pickAlert);
        });
  
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
