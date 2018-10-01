/**
 * @email: User Email
 * @password: User password
 * Firstly create a payload. Using this payload send email, password and repassword server side in api create-account for creating user account.
 */
export function createAccountApi(email, password, repassword, props) {
  const obj = {};
  const payload = {
    email,
    password,
    repassword,
  };
  const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
  const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';

  const promise = new Promise((resolve, reject) => {
    fetch(
        `${hyperText}://${window.location.hostname}${hostname}/api/create-account`,
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
            console.log('res!!', res);
            const userDetails = {
              id: res.result.id,
              email: res.result.email,
            };
            props.setUserDetails(userDetails);
            localStorage.setItem('isLoggedIn', true);
            obj.status = true;
            obj.emailToken = res.result.email_token;
            resolve(obj);
          }
        })
        .catch((err) => {
         console.log('error', err);
        });
  });
  return promise;
}
