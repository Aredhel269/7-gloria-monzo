import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    pass: "",
  });

  const [error, setError] = useState(""); // Estat per emmagatzemar errors
  const [response, setResponse] = useState(""); // Estat per emmagatzemar la resposta

  const { name, pass } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/autentication", {
        name,
        pass,
      });

      console.log(res.data);
      setResponse(res.data); // Emmagatzema la resposta a l'estat local
    } catch (err) {
      console.error(err.response.data);
      setError(err.response.data.error); // Emmagatzema l'error a l'estat local
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="pass"
            value={pass}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <input type="submit" value="Login" />
      </form>
      {error && <p>{error}</p>} {/* Mostra l'error si hi ha algun */}
      {response && <p>{response.message}</p>} {/* Mostra la resposta si hi ha algun */}
    </div>
  );
};

export default Login;
