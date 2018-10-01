/**
 * @verifyEmailTokenApi is a method which calls verify-token api which provide us a response that token is valid or not valid.
 */

import Alert from 'react-s-alert';

export function verifyEmailTokenApi(props) {
 const object = {};
 const searchToken = props.location.search;
 const payload = {
   email_token: searchToken,
 };
 const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
 const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';
 const promise = new Promise((resolve, reject) => {
   fetch(`${hyperText}://${window.location.hostname}${hostname}/api/verify-token`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(payload),
   })
         .then((res) => res.json())
         .then((res) => {
           if (res.status === 200) {
             object.text = 'success';
             resolve(object);
             Alert.success(res.message, {
               position: 'top',
               timeout: 2000,
             });
           } else if (res.status === 202) {
             object.text = 'reject';
             resolve(object);
           } else if (res.status === 203) {
             object.text = 'reject';
             resolve(object);
           } else if (res.status === 205) {
             object.text = 'reject';
             resolve(object);
           } else if (res.status === 207) {
             object.text = 'reject';
             resolve(object);
           } else if (res.status === 401) {
             object.text = 'reject';
             resolve(object);
           }
         })
         .catch((err) => {
           console.log('err', err);
         });
 });
 return promise;
}