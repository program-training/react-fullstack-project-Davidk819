import "./UserLogin.css";
import { useContext, useState } from "react";
import { UsePageContext } from "../ContextPage/ContextPage";
import { TokenContext } from "../ContextToken/ContextToken";
interface LoginResponse {
  message: string;
  responseObj: {
    user: {
      id: string;
      email: string;
      password: string;
    };
    token: string;
  };
}

export default function LoginForm() {
  const contextToken = useContext(TokenContext);
  if (!contextToken) return null;
  const { token, setToken } = contextToken;
  const context = useContext(UsePageContext);
  if (!context) return null;
  const { setCurrentPage } = context;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
       
        return res.json();
      })
      .then((resBody: LoginResponse) => setToken(resBody.responseObj.token))

      .catch((error) => console.error("Error not user:", error));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <button onClick={() => setCurrentPage("Home")}>Home</button>
      <form className="form" onSubmit={handleSubmit}>
        
        <div className="input-span">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-span">
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="span"></div>
        <input className="submit" type="submit" value="Log in" />
      </form>
      <div className="span">
        Don't have an account?{" "}
        <button onClick={() => setCurrentPage("UserRegistration")}>
          Sign up
        </button>
      </div>
    </div>
  );
}
