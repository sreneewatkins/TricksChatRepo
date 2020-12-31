import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { addUsername } from "../helpers/db";
// import { addUName } from "../helpers/auth";
// import { db } from "../services/firebase";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addError: null,
      username: "",
      mountError: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      username: event.target.value,
    });
    console.log("We just handled the username input change");
  }

  //attempting to check the chats for a certain uid to match the username with that 
//   async componentDidMount() {
//     this.setState({ mountError: null });
//    // const chatArea = this.myRef.current;
//     try {
//       db.ref("chats").on("value", (snapshot) => {
//         let chats = [];
//         snapshot.forEach((snap) => {
//         chats.push(snap.val());
//         console.log({chats});
//         });
//         // chats.sort(function (a, b) {
//         //   return a.timestamp - b.timestamp;
//         // });
//        // this.setState({ chats });
//       //  chatArea.scrollBy(0, chatArea.scrollHeight);
//       //  this.setState({ loadingChats: false });
//       });
//     } catch (error) {
//       this.setState({ mountError: error.message, loadingChats: false });
//     }
//   }

  //which async should I use? I'm leaning towards the second one
    // async handleSubmit(event) {
    //   event.preventDefault();
    //   console.log("we are handling the SUBMIT on the profile page");
    //   this.setState({ addError: "" });
    //   try {
    //     await addUName(this.state.username);
    //   } catch (error) {
    //     this.setState({ addError: error.message });
    //   }
    //   //reset input box to empty after click
    //   //this.setState({ username: "" }); or change input back - chack animal list
    // }

  //  this is one seems better?
//   async handleSubmit(event) {
//     event.preventDefault();
//     console.log("we are handling the SUBMIT on the profile page");
//     this.setState({ addError: "" });
//     try {
//       await db.ref("chats").push({
//         username: this.state.user.username,
//       });
//     } catch (error) {
//       this.setState({ addError: error.message });
//     }
//   }

  //or is it this one?!!!
  async handleSubmit(event) {
    event.preventDefault();
    console.log("we are handling the SUBMIT on the profile page");
    this.setState({ addError: "" });
    try {
      await addUsername(this.state.username);
    } catch (error) {
      this.setState({ addError: error.message });
    }
    this.setState({ username: "" }); 
  }

  render() {
    return (
      <div className="home">
        <Header></Header>
        <section>
          <div className="jumbotron jumbotron-fluid py-5">
            <div className="container text-center py-5">
              <h1 className="display-4">TricksChat Profile Page</h1>
              <p className="lead">
                A great place to share your thoughts with friends
              </p>
              <div className="mt-4">
                {/* <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                    <Link className="btn px-5" to="/login">Login to Your Account</Link> */}
                <div>
                  <input
                    placeholder="Username"
                    name="username"
                    type="username"
                    onChange={this.handleChange}
                    value={this.state.username}
                  ></input>
                </div>
                {/* <input placeholder="Firstname" name="firstname" type="firstname" onChange={this.handleChange} value={this.state.firstname}><br/></input> */}
                {/* onClick={this.handleSubmit} */}
                <button onClick={this.handleSubmit}> Add ME </button>
                <div>
                    <Link className="btn px-5" to="/chat">Let's go CHAT</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer></Footer>
      </div>
    );
  }
}
