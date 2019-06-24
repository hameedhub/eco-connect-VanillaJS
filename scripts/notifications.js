// Notification...
const urlNotification = `${API_URL}/api/v1/notifications`;
fetch(urlNotification, { method: 'GET', headers: { 'Content-Type': 'application/json'}})
    .then(res => res.json())
    .then((res) => {
        //Dom manipulation..
        const notification = res.data;
        notification.forEach(e => {
           let notify = document.querySelector('#notify');

            let alertDiv = document.createElement('div');
            alertDiv.setAttribute('class', 'alert alert-info alert-with-icon');
            let alertIcon = document.createElement('i');
            alertIcon.setAttribute('class', 'material-icons');
            alertIcon.setAttribute('data-notify', 'icon');
            alertIcon.textContent='add_alert';
            alertDiv.appendChild(alertIcon);
            let closeBtn = document.createElement('button');
            closeBtn.setAttribute('type', 'button');
            closeBtn.setAttribute('class', 'close');
            closeBtn.setAttribute('data-dismiss', 'alert');
            closeBtn.setAttribute('aria-label', 'Close');
            let closeIcon = document.createElement('i');
            closeIcon.setAttribute('class', 'material-icons');
            closeIcon.textContent='close';
            closeBtn.appendChild(closeIcon);
            alertDiv.appendChild(closeBtn);
            let spanMessage = document.createElement('span');
            spanMessage.setAttribute('data-notify', 'message');
            spanMessage.innerHTML=`${e.time}<br /> ${e.message} <br /> ${e.author}`;
            alertDiv.appendChild(spanMessage);

            notify.appendChild(alertDiv);
        });
     



});