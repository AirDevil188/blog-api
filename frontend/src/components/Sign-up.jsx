import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../App";

const SignUp = () => {
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const options = {
      method: "POST",
      body: new URLSearchParams(formData),
    };
    try {
      const response = await fetch("http://localhost:8080/sign-up", options);
      if (response.ok) {
        return await response.json();
      } else {
        throw {
          json: setError(await response.json()),
        };
      }
    } catch (err) {
      return err;
    }
  };
  return (
    <>
      <div>
        <form method="post" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username: </label>
            <input type="text" id="username" name="username" />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password">Confirm Password: </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
            />
          </div>
          <button type="submit">Create Account</button>
        </form>

        <section>
          {error &&
            error[0].errors.map((err, index) => {
              {
                return <div key={`${err}-${index}`}>{err.msg}</div>;
              }
            })}
        </section>
      </div>
    </>
  );
};

export default SignUp;
