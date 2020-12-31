import React, { Component } from "react";
import Header from "../components/Header";
import { auth } from "../services/firebase";
import { db } from "../services/firebase";
import "../styles.css";

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: auth().currentUser,
      chats: [],
      content: "",
      username: "",
      readError: null,
      writeError: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.myRef = React.createRef();
  }

  async componentDidMount() {
    this.setState({ readError: null });
    const chatArea = this.myRef.current;
    try {
      db.ref("chats").on("value", (snapshot) => {
        let chats = [];
        snapshot.forEach((snap) => {
          chats.push(snap.val());
        });
        chats.sort(function (a, b) {
          return a.timestamp - b.timestamp;
        });
        this.setState({ chats });
        chatArea.scrollBy(0, chatArea.scrollHeight);
        this.setState({ loadingChats: false });
        console.log("comp DID mount" + { chats });
      });
    } catch (error) {
      this.setState({ readError: error.message, loadingChats: false });
    }
  }

  handleChange(event) {
    this.setState({
      content: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ writeError: null });
    const chatArea = this.myRef.current;
    try {
      await db.ref("chats").push({
        content: this.state.content,
        timestamp: Date.now(),
        uid: this.state.user.uid,
        username: this.state.username,
      });
      this.setState({ content: "" });
      chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
      this.setState({ writeError: error.message });
    }
  }

  formatTime(timestamp) {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  }

  render() {
    return (
      <div>
        <Header />

        <div className="chat-area" ref={this.myRef}>

          {/* loading indicator */}
          {this.state.loadingChats ? (
            <div className="spinner-border text-success" role="status">
              <span className="sr-only">Loading...patience is a virtue...</span>
            </div>
          ) : (
            ""
          )}

          {/* chat area */}
          {this.state.chats.map((chat) => {
           
           return (
              <p
                key={chat.timestamp}
                className={
                  "chat-bubble " +
                  (this.state.user.uid === chat.uid ? "current-user" : "")
                }
              >
                {chat.content}
                <br />
                {/* <span className="chat-time float-right">{chat.uid} {this.formatTime(chat.timestamp)}</span>  */}
                <span className="chat-time float-left">
                  {this.state.user.uid === chat.uid
                    ? this.state.user.email
                    : this.formatTime(chat.timestamp)}{" "}
                </span>
                {/* {this.state.user.email} */}
              </p>
            );

          })}
        </div>

        <form onSubmit={this.handleSubmit} className="mx-3">
         
          <textarea
            className="form-control"
            name="content"
            placeholder="what's up"
            onChange={this.handleChange}
            value={this.state.content}
          ></textarea>
         
          {this.state.error ? (
            <p className="text-danger">{this.state.error}</p>
          ) : null}
         
          <button
            type="submit"
            className="btn btn-submit px-5 mt-4"
            disabled={!this.state.content}
          >
            Send 🕊️
          </button>

        </form>

        <div className="py-5 mx-3">
          Logged in as:{" "}
          <strong className="text-info">{this.state.user.email}</strong>
        </div>

      </div>
    );
  }
}

//old stuff from tutorial. new is above from github
// return (
//     <div>
//       <div className="chats">
//         {this.state.chats.map((chat) => {
//           return <p key={chat.timestamp}>{chat.content}</p>;
//         })}
//       </div>
//       <div>
//         Logged in as: <strong>{this.state.user.email}</strong>
//       </div>
//     </div>
//   );
