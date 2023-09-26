import React, { useCallback, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePocket } from "../contexts/PocketContext";

export const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { register } = usePocket();
  const navigate = useNavigate();

  const handleOnSubmit = useCallback(
    async (evt) => {
      evt?.preventDefault();
      await register(emailRef.current.value, passwordRef.current.value);
      navigate("/sign-in");
    },
    [register]
  );

  return (
    <section>
      <h2>Registro</h2>
      <form onSubmit={handleOnSubmit}>
        <input placeholder="Email" type="email" ref={emailRef} />
        <input placeholder="Senha" type="password" ref={passwordRef} />
        <button type="submit">Criar</button>
        <br></br>
        <Link to="/sign-in">Ir para login</Link>
        <br></br>
        <Link to="/demoapp">Ir Calendario</Link>
      </form>
    </section>
  );
};
