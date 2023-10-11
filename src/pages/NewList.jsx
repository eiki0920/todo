import React, { useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import url from "../const";
import "./newList.scss";

function NewList() {
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleTitleChange = (e) => setTitle(e.target.value);
  const onCreateList = () => {
    const data = {
      title,
    };

    axios
      .post(`${url}/lists`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation("/");
      })
      .catch((err) => {
        setErrorMessage(`リストの作成に失敗しました。${err}`);
      });
  };

  return (
    <div>
      <Header />
      <main className="new-list">
        <h2>リスト新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-list-form">
          <label htmlFor="title">
            タイトル
            <br />
            <input
              type="text"
              onChange={handleTitleChange}
              className="new-list-title"
              id="title"
            />
          </label>

          <br />
          <button
            type="button"
            onClick={onCreateList}
            className="new-list-button"
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
}

export default NewList;
