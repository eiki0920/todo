import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import url from "../const";
import Header from "../components/Header";
import "./newTask.scss";

function NewTask() {
  const [selectListId, setSelectListId] = useState();
  const [lists, setLists] = useState([]);
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [deadLine, setDeadLine] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [cookies] = useCookies();
  const navigation = useNavigate();
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDetailChange = (e) => setDetail(e.target.value);
  const handleSelectList = (id) => setSelectListId(id);
  const handleDeadLineChange = (e) => setDeadLine(e.target.value);
  const onCreateTask = () => {
    const data = {
      title,
      detail,
      done: false,
      limit: deadLine,
    };

    axios
      .post(`${url}/lists/${selectListId}/tasks`, data, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then(() => {
        navigation("/");
      })
      .catch((err) => {
        setErrorMessage(`タスクの作成に失敗しました。${err}`);
      });
  };

  useEffect(() => {
    axios
      .get(`${url}/lists`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setLists(res.data);
        setSelectListId(res.data[0]?.id);
      })
      .catch((err) => {
        setErrorMessage(`リストの取得に失敗しました。${err}`);
      });
  }, []);

  return (
    <div>
      <Header />
      <main className="new-task">
        <h2>タスク新規作成</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="new-task-form">
          <label htmlFor="task-select">
            リスト
            <br />
            <select
              onChange={(e) => handleSelectList(e.target.value)}
              className="new-task-select-list"
              id="task-select"
            >
              {lists.map((list) => (
                <option key={list.id} className="list-item" value={list.id}>
                  {list.title}
                </option>
              ))}
            </select>
          </label>

          <br />
          <label htmlFor="task-title">
            タイトル
            <br />
            <input
              type="text"
              onChange={handleTitleChange}
              className="new-task-title"
              id="task-title"
            />
          </label>

          <br />
          <label htmlFor="task-detail">
            詳細
            <br />
            <textarea
              type="text"
              onChange={handleDetailChange}
              className="new-task-detail"
              id="task-detail"
            />
          </label>
          <br />

          <label htmlFor="deadline">
            期限
            <br />
            <input
              type="datetime"
              id="deadline"
              className="new-task-deadline"
              onChange={handleDeadLineChange}
            />
          </label>

          <br />
          <button
            type="button"
            className="new-task-button"
            onClick={onCreateTask}
          >
            作成
          </button>
        </form>
      </main>
    </div>
  );
}

export default NewTask;
