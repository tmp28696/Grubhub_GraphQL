import cookie from 'react-cookies';
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import { addBuyerMutation } from '../../mutation/mutation';
import { graphql } from 'react-apollo';
//import jwt_decode from 'jwt-decode';

//create the Navbar Component
class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            email: "",
            phone:"",
            password: "",
            message: ""

        }
        this.fNameChangeHandler = this.fNameChangeHandler.bind(this);
        this.lNameChangeHandler = this.lNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitSignUp = this.submitSignUp.bind(this)
    }

    fNameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
        console.log(this.state.fname)
    }

    lNameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
        })
        console.log(this.state.lname)
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    phoneChangeHandler = (e) => {
        this.setState({
            phone: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }
    submitSignUp = async (e) => {
        
        e.preventDefault();
        // const data = {
        //     fName: this.state.fName,
        //     lName: this.state.lName,
        //     email: this.state.email,
        //     phone: this.state.phone,
        //     pwd: this.state.password,
     // }
        // console.log(data);
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/signup', data)
        //     .then(response => {
        //         console.log("Status Code : ", response.status);
        //         if (response.status === 400) {
        //             this.setState({
        //              msg : response.data.message
        //             })
        //         if(response.status==200){
        //             this.setState({
        //                 authFlag: true
        //             })
        //         }
        //         }
        //     })
            // .catch(error => {
            //     this.setState({
            //         msg: error.response.data.error
            //     })
            // });
        console.log("in submit signup")
            let response = await this.props.addBuyerMutation({
                variables : {
                    fname : this.state.fname,
                    lname : this.state.lname,
                    email : this.state.email,
                    phone : this.state.phone,
                    password : this.state.password,
                   
                }
            }).then(res => {
                this.setState({
                   messsage: "User added Successfully."
                })
                console.log("The received response is : ", res);
            }).catch(e => {
                this.setState({
                    messsage: "error"
                })
            })

            console.log("response",response)
            
            // this.props.history.push('/login');
    }

    render() {
        console.log("hey")
        const { handleSubmit } = this.props;
        let redirectVar=null
        if(this.props.authFlag == 200){
            redirectVar = <Redirect to="/login" />
        }

        return (
            <div>
                {redirectVar}
                <div>
                    <div class="u-margin-bottom block">
                        <h3>Create Your Account</h3>
                        <p>{this.props.message}</p>
                    </div>
                    <div class="form-block">
                        <form onSubmit={this.submitSignUp}>
                            <div class="s-row">
                                <div class="s-block">
                                <label class="label1">First Name</label>
                                <input class="input1" type="text" name="fname" onChange={this.fNameChangeHandler}/>
                                </div>
                                <div class="s-block">
                                <label class="label1">Last Name</label>
                                <input class="input1" type="text" name="lname" onChange={this.lNameChangeHandler}></input>
                                </div>
                            </div>
                            <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Email</label>
                                <input class="input1" type="text" name="email" onChange={this.emailChangeHandler}></input>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Phone</label>
                                <input class="input1" type="text" name="phone" onChange={this.phoneChangeHandler}></input>
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
                                    <button class="s-btn-primary s-btn" type="submit">Create your account</button>
                                </div></div>
                        </form>
                        <div class="mr block">
                            <p>or</p>
                            <p>Have account already?<a href="/login">Log In</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default graphql(addBuyerMutation, {name : "addBuyerMutation"})(Signup);

