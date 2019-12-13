import { useCallback } from "react";

/**
 * @email: User Email
 * @password: User password
 * Firstly create a payload. Using this payload send email, password and repassword server side in api create-account for creating user account.
 */
export function getAccountApi(address, offset, count, callback) {
  const obj = {};
  const payload = {
    address,
    offset,
    count
  };
  // const hostname = window.location.hostname === "localhost" ? ":3000" : "";
  // const hyperText = window.location.hostname === "localhost" ? "http" : "https";

  const promise = new Promise((resolve, reject) => {
    fetch(
      `http://18.222.120.223:3100/api/v1/get-account?address=${payload.address}&offset=10&count=10&trxsFilter=from`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
        // body: JSON.stringify(payload)
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("res!!", res);
        if (res.meta.success) {
          console.log("res!!", res);
          callback(res);
          // const userDetails = {
          //   id: res.result.id,
          //   email: res.result.email
          // };
          // props.setUserDetails(userDetails);
          // localStorage.setItem("isLoggedIn", true);
          // obj.status = true;
          // obj.emailToken = res.result.email_token;
          // resolve(obj);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  });
  return promise;
}
