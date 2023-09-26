import React, { useRef, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";

export const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/demoapp");
    },
    [login]
  );

  return (
    <section>
      <h2>Login</h2>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Senha" type="password" ref={passwordRef} />
        <button type="submit">Logar</button>
        <br></br>
        <Link to="/">Registrar</Link>
      </form>
    </section>
  );
};
