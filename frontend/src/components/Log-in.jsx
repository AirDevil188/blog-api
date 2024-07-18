import { useContext, useState } from "react";
import { UserContext } from "../App";

const LogIn = () => {
  const [error, setError] = useState(null);
  const { userObject, setUserObject } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const options = {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    try {
      const response = await fetch(`http://localhost:8080/log-in`, options);
      if (response.ok) {
        const newUser = {
          user: {
            username: formData.get("username"),
            password: formData.get("password"),
          },
        };
        setUserObject(newUser);
        const token = await response.json();
        localStorage.setItem("token", String(Object.values(token)));
        setError(null);
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
      <div className="main-wrapper">
        <section className="log-in-section">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username: </label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <input type="password" name="password" id="password" />
            </div>
            <button>LOG IN</button>
          </form>
        </section>
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

export default LogIn;
