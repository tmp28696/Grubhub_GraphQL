import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import cookie from 'react-cookies'
import { login } from '../../mutations/mutations';
import { graphql } from 'react-apollo';

//create the Navbar Component
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email : "",
            password : "",
            authFlag : false,
            message:""
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    componentWillMount(){
        this.setState({
            authFlag : false
        })}

    emailChangeHandler = (e) => {
        this.setState({
        email : e.target.value
     })
     }
     passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    

    submitLogin = (e) => {
        e.preventDefault();
        let response = this.props.login({
            variables : {
                email : this.state.email,
                password : this.state.password,
             }
        }).then(res => {
            this.setState({
               messsage: "User logged in Successfully.",
               authFlag: true
            })
            localStorage.setItem('decoded_email', res.data.login.email);
            console.log("The received response is : ", res, this.state.authFlag, res.data.login.email);
        }).catch(e => {
            this.setState({
                messsage: "error"
            })
        })
    }

    render() {
        let redirectVar = null;
        
        if (this.state.authFlag == true) {
            redirectVar = <Redirect to="/profile" />
        }

        return (
            <div>
                 {redirectVar}
                <div >
                    <div class="form-block">
                        <div class="u-margin-bottom block">
                            <h3>Sign in with your Account</h3>
                            <p>{this.state.message}</p>
                        </div>
                        <form onSubmit={this.submitLogin}>
                            <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Email id</label>
                                <input class="input1" type="text" name="email" onChange={this.emailChangeHandler}></input>
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Password</label>
                                <input class="input1" type="password" name="password" onChange={this.passwordChangeHandler}></input>
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <input class="m" type="checkbox"></input>
                                    <label class="m label1">Keep me signed in</label>
                                </div></div>
                            <div class="s-row">
                                <div class="s1-block">
                                    <button class="s-btn-primary s-btn" type="submit">Log In</button>
                                </div></div>
                        </form>
                        <div class="mr block">
                            <p>or</p>
                            <p>Create new account. <a href="/signup">Sign Up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default graphql(login, {name : "login"})(Login);