import React from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../authSlice";
import "./header.scss";

function Header() {
  const auth = useSelector((state) => state.auth.isSignIn);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [, , removeCookie] = useCookies();
  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigation("/signin");
  };

  return (
    <header className="header">
      <h1>Todoアプリ</h1>
      {auth ? (
        <button
          onClick={handleSignOut}
          className="sign-out-button"
          type="button"
        >
          サインアウト
        </button>
      ) : (
        <div />
      )}
    </header>
  );
}

export default Header;
