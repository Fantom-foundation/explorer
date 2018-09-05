export function createAccountApi(email, password, repassword, password_hint, identiconsId, props) {
  const obj = {};
  const payload = {
    user: email,
    password,
    repassword,
    password_hint,
    icon: identiconsId,
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
            const object = {
              user: '',
              icon: '',
              address: '',
              seed: '',
              mnemonic: '',
              pubKey: '',
              hexPrivateKey: '',
              masterPrivateKey: '',
            };
            if (res.result.email) {
              object.user = res.result.email;
            } else {
              object.user = res.result.account_name;
            }
            object.icon = res.result.icon;
            props.setUserDetails(object);
            obj.status = true;
            resolve(obj);
          }
        })
        .catch((err) => {
         console.log('error', err);
        });
  });
  return promise;
}
