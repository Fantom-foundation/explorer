export function validateEmailApi(email) {
  const obj = {};
  const payload = {
    email,
  };
  const hostname = window.location.hostname === 'localhost' ? ':3000' : '';
  const hyperText = window.location.hostname === 'localhost' ? 'http' : 'https';

  const promise = new Promise((resolve, reject) => {
    fetch(
            `${hyperText}://${window.location.hostname}${hostname}/api/validate-email`,
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
              if (res.status === 202) {
                console.log('res!!', res);
                obj.emailErrorText = 'Email already exist';
                resolve(obj);
              } else {
                obj.emailErrorText = '';
                resolve(obj);
              }
            })
            .catch((err) => {
              console.log('error', err);
            });
  });
  return promise;
}
