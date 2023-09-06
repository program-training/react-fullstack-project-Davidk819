import { useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";

export default function SignupForm() {
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { setCurrentPage } = context;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        authorization: "test-token",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error("Error not user:", error));
  };

  return (
    <div>
      <button onClick={() => setCurrentPage("Home")}>Home</button>
      <div className="form-box">
        <form className="form" onSubmit={handleSubmit}>
          <span className="title">Sign up</span>
          <span className="subtitle">
            Create a free account with your email.
          </span>
          <div className="form-container">
            <input
              type="email"
              className="input"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Sign up</button>
        </form>
        <div className="form-section">
          <p>
            Have an account? <button onClick={() => setCurrentPage("UserLogin")}>Log in</button>
          </p>
        </div>
      </div>
    </div>
  );
}
