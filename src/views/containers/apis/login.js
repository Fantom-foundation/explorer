/**
 * @email: User email
 * @password: User password
 * In this api we authenticate user by sending email, password in payload.
 * fetch response from api authetication which is either true or false.
 */
import Alert from 'react-s-alert';
export function loginApi(email, password, props) {
  const obj = {};
  if (email === '' || password === '') {
    Alert.error('Fields cann\'t be empty', {
      position: 'top',
      timeout: 2000,
    });
    return;
  }
  const payload = {
    email,
    password,
  };
  const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
  const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';

  const promise = new Promise((resolve, reject) => {
    fetch(
        `${hyperText}://${window.location.hostname}${hostname}/api/authenticate-user`,
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
          if (res.status === 201) {
            obj.status = false;
            Alert.error(res.message, {
              position: 'top',
              timeout: 2000,
            });
            resolve(obj);
          } else if (res.status === 203) {
            obj.status = false;
            resolve(obj);
            Alert.error(res.message, {
              position: 'top',
              timeout: 2000,
            });
          } else if (res.status === 202) {
            obj.status = false;
            resolve(obj);
            Alert.error(res.message, {
              position: 'top',
              timeout: 2000,
            });
          } else if (res.status === 200) {
            const userDetails = {
              id: res.user.id,
              email: res.user.email,
            };
            props.setUserDetails(userDetails);
            localStorage.setItem('isLoggedIn', true);
            obj.status = true;
            resolve(obj);
            setTimeout(() => {
              props.history.push('/');
            }, 1000);
          }
        })
        .catch((err) => {
          obj.status = false;
          reject(obj);
        });
  });
  return promise;
}
