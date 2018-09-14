import Alert from 'react-s-alert';
export function emailTokenApi(props) {
    console.log('props details', props);
  const email = props.userDetails.email;
  const payload = {
    email,
    hostName: window.location.hostname,
  };
  const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
  const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';
  fetch(
     `${hyperText}://${
       window.location.hostname
     }${hostname}/api/email-token`,
    {
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
   )
     .then((res) => res.json())
     .then((res) => {
       if (res.status === 200) {
         console.log('Resend Verify email link : ', res.registrationUrl);
         Alert.success('Email has been sent', {
           position: 'top',
           timeout: 2000,
         });
       }
       if (res.status === 201) {
         Alert.error(res.message, {
           position: 'top',
           timeout: 2000,
         });
       }
       if (res.status === 203) {
         Alert.error(res.message, {
           position: 'top',
           timeout: 2000,
         });
       }
       if (res.status === 205) {
         Alert.error(res.message, {
           position: 'top',
           timeout: 2000,
         });
       }
       if (res.status === 209) {
         Alert.error(res.message, {
           position: 'top',
           timeout: 2000,
         });
       }
     })
     .catch((err) => {
       console.log('err', err);
     });
}
