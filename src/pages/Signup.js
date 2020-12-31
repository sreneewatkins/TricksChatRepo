import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../helpers/auth';
import '../styles.css';
//import { addUsername } from '../helpers/db';

export default class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            username: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            //can you do two awaits here?
          await signup(this.state.username, this.state.email, this.state.password); //this.state.username can't be put here bc signup only takes 2 args
        } catch (error) {
          this.setState({ error: error.message });
        }
      //  this.state.username.addUsername();
    }

    render() {
        return (
          <div>
            <form onSubmit={this.handleSubmit}>
              <h1>
                Sign Up to
              <Link to="/"> TricksChat</Link>
              </h1>
              <p>Fill in the form below to create an account.</p>
              <div>
                <input placeholder="Username" name="username" type="username" onChange={this.handleChange} value={this.state.username}></input>
              </div>
              <div>
                <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
              </div>
              <div>
                <input placeholder="Password" name="password" type="password" onChange={this.handleChange} value={this.state.password}></input>
              </div>
              <div>
                {this.state.error ? <p>{this.state.error}</p> : null}
                <button type="submit">Sign up</button>
              </div>
              <hr></hr>
              <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
          </div>
        )
    }
}
