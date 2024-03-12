import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { login } from '../../mutation/mutation';
import { graphql } from 'react-apollo';
import { assertAbstractType } from "../../../../Backend/node_modules/graphql";

//create the Navbar Component
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: false,
            message: ""
        }
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    componentWillMount() {
        this.setState({
            authFlag: false
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
        console.log(this.state.email)
    }
    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }


    submitLogin = (e) => {
        var headers = new Headers();
        // //prevent page from refresh
        e.preventDefault();
        // const data = {
        //     email : this.state.email,
        //     password : this.state.password
        // }
        // console.log(data);
        // //set the with credentials to true
        // axios.defaults.withCredentials = true;
        // //make a post request with the user data
        // axios.post('http://localhost:3001/login',data)
        //     .then(response => {
        //         console.log("Status Code : ",response);
        //         if(response.data.status == 200){
        //             this.setState({
        //                 authFlag : true
        //             })
        //         }
        //         else if(response.data.status == 201){
        //             this.setState({
        //                 authFlag : false,
        //                 msg : "Invalid username and password "
        //             })
        //         }
        //     }
        //     );

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
        // console.log(response);
        // this.props.history.push('/profile');
    }

    render() {
        let redirectVar = null;
     
        if (this.state.authFlag == true) {
            redirectVar = <Redirect to="/profile" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <div class="u-margin-bottom block">
                        <h3>Sign in with your Account</h3>
                        <p>{this.state.message}</p>
                    </div>
                    <div class="form-block">
                        <form onSubmit={this.submitLogin}>
                            <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Email</label>
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

// function validate(values) {

//     const errors = {};

//     if (!values.email) {
//         errors.email = "Enter an email";
//     }
//     if (!values.password) {
//         errors.password = "Enter Password";
//     }
//     return errors;
// }
// const mapStateToProps = state => {
//     return {
//         authFlag: state.login.authFlag,
//         message: state.login.message,
        
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         onSubmitHandle: (data) => {
//             const value = {
//                 email: data.email,
//                 password: data.password,
//                 msg: data.msg
//             }
//             console.log(data)
//             axios.defaults.withCredentials = true;
//             axios.post('http://localhost:3001/login', value)
//                 .then((response) => {
//                     console.log(response)
//                     console.log(response.data.message)
                    
//                     localStorage.setItem('token', response.data.token);
//                     const decoded = jwt_decode(response.data.token);
//                     console.log(decoded);
//                     localStorage.setItem('decoded_email', decoded.email);
//                     // localStorage.setItem('decoded_id', decoded.id);
//                     // localStorage.setItem('decoded_fname', decoded.fname);
//                     sessionStorage.setItem('login_email', response.data.data.email);
//                     sessionStorage.setItem('res_cuisine', response.data.data.cuisine);
//                     console.log(response.data.data.email)
//                     dispatch({ type: 'LOGIN', payload: response.data, statusCode: 200})
//                 })
//                 .catch((error) => {
                    
//                     // var err = error;
//                     // console.log(JSON.parse(error));
//                     //  dispatch({ type: 'SIGNUP', payload: error.response.data, statusCode: error.response.status })
//                 });
//         }
//     }
// }


export default graphql(login, {name : "login"})(Login);
