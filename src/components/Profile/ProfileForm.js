import React from "react";
import AuthContext from "../../contexts/auth-context";

import classes from "./ProfileForm.module.sass";

const ProfileForm = () => {
  const authCtx = React.useContext(AuthContext);
  const passwordInputRef = React.useRef();

  const [isLoading, setIsLoading] = React.useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const enteredPassword = passwordInputRef.current.value;
    // TODO: Add Validation

    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_FIREBASE_PROJECT_API_KEY}`;

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Process Failed!";
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        // console.log(data);
        authCtx.login(data.idToken);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          // minLength="7"
          ref={passwordInputRef}
        />
      </div>
      {!isLoading && (
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      )}
      {isLoading && <p>Loading</p>}
    </form>
  );
};

export default ProfileForm;
