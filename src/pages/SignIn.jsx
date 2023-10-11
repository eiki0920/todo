import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import "./signin.scss";
import { signIn } from "../authSlice";
import url from "../const";

function SignIn() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email, password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigation("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth) return <Navigate to="/" />;

  return (
    <div>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <label className="email-label" htmlFor="mail">
            メールアドレス
            <br />
            <input
              type="email"
              className="email-input"
              onChange={handleEmailChange}
              id="mail"
            />
          </label>

          <br />
          <label className="password-label" htmlFor="password">
            パスワード
            <br />
            <input
              type="password"
              className="password-input"
              onChange={handlePasswordChange}
              id="password"
            />
          </label>

          <br />
          <button type="button" className="signin-button" onClick={onSignIn}>
            サインイン
          </button>
        </form>
        <Link to="/signup">新規作成</Link>
      </main>
    </div>
  );
}

export default SignIn;
