import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { addOwnerMutation } from '../../mutations/mutations';
import { graphql } from 'react-apollo';


class Signup extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: "",
                res_name:"",
                res_zipcode:"",
                phone: "",
                email: "",
                password: "",
                cuisine:"",
                message: ""
    
            }
            this.NameChangeHandler = this.NameChangeHandler.bind(this);
            this.resnameChangeHandler = this.resnameChangeHandler.bind(this);
            this.cuisineChangeHandler = this.cuisineChangeHandler.bind(this);
            this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
            this.emailChangeHandler = this.emailChangeHandler.bind(this);
            this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
            this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
            this.submitSignUp = this.submitSignUp.bind(this);
        }

    
        NameChangeHandler = (e) => {
            this.setState({
                name: e.target.value
            })
        }
    
        emailChangeHandler = (e) => {
            this.setState({
                email: e.target.value
            })
        }
        resnameChangeHandler = (e) => {
            this.setState({
                res_name: e.target.value
            })
        }
        cuisineChangeHandler = (e) => {
            this.setState({
                cuisine: e.target.value
            })
        }
        phoneChangeHandler = (e) => {
            this.setState({
                phone: e.target.value
            })
        }
        zipcodeChangeHandler = (e) => {
            this.setState({
                res_zipcode: e.target.value
            })
        }
    
        passwordChangeHandler = (e) => {
            this.setState({
                password: e.target.value
            })
        }
        submitSignUp = async (e) => {
            e.preventDefault();
            console.log("in submit signup")
            let response = await this.props.addOwnerMutation({
                variables : {
                    name : this.state.name,
                    res_name : this.state.res_name,
                    res_zipcode : this.state.res_zipcode,
                    cuisine : this.state.cuisine,
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
        }
    
       
    render() {
        const { handleSubmit } = this.props;
        let redirectVar = null;
        // if (cookie.load('cookie')) {
        //     redirectVar = <Redirect to="/profile" />
        // }
        if(this.props.authFlag == 200){
            redirectVar = <Redirect to="/login" />
        }
       
        return (
            <div>
                {redirectVar}
                <div class="home"> 
                    <div class="form-block">
                    <div class="u-margin-bottom block">
                        <h3>Create Your Account</h3>
                        <p>{this.props.message}</p>
                    </div>
                        <form onSubmit={this.submitSignUp}>
                        <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Name</label>
                                <input class="input1" type="text" name="name" onChange={this.NameChangeHandler}/>
                                </div>
                            </div>
                            <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Email Id</label>
                                <input class="input1" type="text" name="email" onChange={this.emailChangeHandler}/>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Restaurant Name</label>
                                <input class="input1" type="text" name="res_name" onChange={this.resnameChangeHandler}/>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Cuisine</label>
                                <input class="input1" type="text" name="cuisine" onChange={this.cuisineChangeHandler}/>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Restaurant Zipcode</label>
                                <input class="input1" type="text" name="res_zipcode" onChange={this.zipcodeChangeHandler}/>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Phone</label>
                                <input class="input1" type="text" name="phone" onChange={this.phoneChangeHandler}/>
                                </div></div>
                                <div class="s-row">
                                <div class="s1-block">
                                <label class="label1">Password</label>
                                <input class="input1" type="password" name="password" onChange={this.passwordChangeHandler}/>
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

export default graphql(addOwnerMutation, {name : "addOwnerMutation"})(Signup);