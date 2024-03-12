import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { login } from "../../actions";
import cookie from 'react-cookies';
import { buyerProfileUpdate } from '../../mutation/mutation';
import { buyerPhoneUpdate } from '../../mutation/mutation';
import { buyerEmailUpdate } from '../../mutation/mutation';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';



//create the Navbar Component
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: null,
            fname: "",
            lname: "",
            email: "",
            email2:"",
            phone: "",
            password: ""

        }
        this.handlenameedit = this.handlenameedit.bind(this);
        this.handleemailedit = this.handleemailedit.bind(this);
        this.handlephoneedit = this.handlephoneedit.bind(this);
        // this.handleresnameedit = this.handleresnameedit.bind(this);
        //this.handlecuisineclick = this.handlecuisineclick.bind(this);
        this.handlepasswordedit = this.handlepasswordedit.bind(this);
        this.updatefirstname = this.updatefirstname.bind(this);
        this.updatelastname = this.updatelastname.bind(this);
        this.updateemail = this.updateemail.bind(this);
        this.updateemail2 = this.updateemail2.bind(this);
        this.updatephone = this.updatephone.bind(this);
        this.handleupdatename = this.handleupdatename.bind(this);
        this.handleupdateemail = this.handleupdateemail.bind(this);
        this.handleupdatephone = this.handleupdatephone.bind(this);

    }
    componentDidMount(){
       try{
            console.log("in componentdidmount")
            var data = {
                email: localStorage.getItem('decoded_email')
            }
            console.log(data.email)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/profile', data) 
                    .then((response) => {
                        console.log("inside axios",response.data.data);
                    this.setState({
                        fname: response.data.data.fname,
                        lname: response.data.data.lname,
                        email: response.data.data.email,
                        phone: response.data.data.phone,
                        password: response.data.data.password,
                    })
                    
                });}catch(e){}
            }
    handlenameedit() {
        this.setState({ edit: "name" });
    }
    handleemailedit() {
        this.setState({ edit: "email" });
    }
    handlephoneedit() {
        this.setState({ edit: "phone" });
    }
    handlepasswordedit() {
        this.setState({ edit: "password" });
    }
    updatefirstname(e) {
        this.setState({ fname: e.target.value })
    }
    updatelastname = (e) => {
        this.setState({ lname: e.target.value });
    }
    updateemail(e) {
        this.setState({ email: e.target.value })
    }
    updateemail2(e) {
        this.setState({ email2: e.target.value })
    }
    updatephone(e) {
        this.setState({ phone: e.target.value })
    }
    handleupdatename = (e) => {
        e.preventDefault();
        console.log("in update name")
            let response = this.props.buyerProfileUpdate({
                variables : {
                    fname : this.state.fname,
                    lname : this.state.lname,
                    email : this.state.email,
                }
                
            }).then(res => {
                this.setState({
                   messsage: "User profile updated Successfully."
                })
                console.log("The received response is : ", res);
            }).catch(e => {
                this.setState({
                    messsage: "error"
                })
            })

            console.log("response",response)
        
    }

    handleupdateemail = (e) => {
        e.preventDefault();
        console.log("in update email")
            let response = this.props.buyerEmailUpdate({
                variables : {
                    email2 : this.state.email2,
                    email : this.state.email,
                }
                
            }).then(res => {
                this.setState({
                   messsage: "User profile updated Successfully."
                })
                localStorage.setItem('decoded_email', res.data.buyerEmailUpdate.email);

                console.log("The received response is : ", res);
            }).catch(e => {
                this.setState({
                    messsage: "error"
                })
            })

            console.log("response",response)
        
    }


    handleupdatephone = (e) => {
        e.preventDefault();
        console.log("in update email")
            let response = this.props.buyerPhoneUpdate({
                variables : {
                    phone : this.state.phone,
                    email : this.state.email,
                }
                
            }).then(res => {
                this.setState({
                   messsage: "User profile updated Successfully."
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
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }
        
        const edit = this.state.edit;
        let button;

        if (edit == "name") {

            button = (
                <div>
                    <form onSubmit={this.handleupdatename}>
                        <h3>Edit Name</h3><br />
                        <p>First Name</p><br />
                        <input type="text" onChange={this.updatefirstname} name="firstname" /><br />
                        <p>Last Name</p><br />
                        <input type="text" onChange={this.updatelastname} name="lastname" /><br />
                        <p>Current Email</p><br />
                        <input type="text" onChange={this.updateemail} name="email" /><br />
                        <button type="submit">Update</button>
                        <button>Cancel</button>
                    </form>
                </div>
            )
        }
        

        else if (edit == "email") {
            button = (
                <div>
                    <form onSubmit={this.handleupdateemail}>
                        <h3>Edit Email</h3><br />
                        <p>Current Email</p><br />
                        <input type="text" onChange={this.updateemail2} name="email2" /><br />
                        <p>New Email</p><br />
                        <input type="text" onChange={this.updateemail} name="email" /><br />
                        <button type="submit">Update</button>
                        <button>Cancel</button>
                    </form>
                </div>
            )
        }

        else if (edit == "phone") {
            button = (
                <div>
                    <form onSubmit={this.handleupdatephone}>
                        <h3>Edit Phone</h3><br />
                        <p>New Phone</p><br />
                        <input type="text" onChange={this.updatephone} name="phone" /><br />
                        <p>Current Email</p><br />
                        <input type="text" onChange={this.updateemail} name="email" /><br />
                        <button type="submit">Update</button>
                        <button>Cancel</button>
                    </form>
                </div>
            )
        }



        else if (edit == "password") {
            button = (
                <div>
                <form>
                <h3>Edit Password</h3><br/>
                <p>New Password</p><br/>
                <input type="text" name="password"/><br/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }
        return (
            <div>
                {redirectVar}
                <div class="s-row">
                    <div class="s-col1 s-col2 u-dimension-2  s-box1">
                        <h3 class="account-nav-header">Your Account</h3>
                        <ul class="account-nav-items">
                        <li class="account-nav-items-item"><Link to="/profile"><span>Profile</span></Link></li>
                            <li class="account-nav-items-item"><Link to="/home"><span>Home</span></Link></li>
                            <li class="account-nav-items-item"><Link to="/pastorders"><span>Past Orders</span></Link></li>
                            <li class="account-nav-items-item"><Link to="/upcomingorders"><span>Upcoming Orders</span></Link></li>
                        </ul>
                    </div>
                    <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                        <form role="form">
                            <div class="u-list ">
                                <div class="u-list-heading h5">Your Account</div>
                                <div class="u-clickable u-list">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1">Profile Image</div>
                                            <div class="s-list-item-secondary u-mar1">
                                                <span class="span">Image</span></div>
                                        </div>
                                        <div class="edit" tabIndex="0" role="button">Edit</div>
                                    </div>
                                </div>
                                <div class="u-clickable">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1">Name </div>
                                            <div class="s-list-item-secondary u-mar1">
                                                <span class="span">{this.state.fname}</span><span class="span">{this.state.lname}</span></div>
                                        </div>
                                        <div class="edit" tabIndex="0" onClick={this.handlenameedit} role="button">Edit</div>
                                    </div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Email Id </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.email}</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" onClick={this.handleemailedit} role="button">Edit</div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Phone </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.phone}</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" onClick={this.handlephoneedit} role="button">Edit</div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Password </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.password}</span></div>
                                    </div>
                                    {/* <div class="edit" tabIndex="0" onClick={this.handlepasswordedit} role="button">Edit</div> */}
                                </div>
                            </div>
                        </form>
                        <div class="u-clickable u-list">
                            <div class="u-flex u-flex-justify u-flex-align">
                                <div class="u-mar1">
                                    {button}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default compose(graphql(buyerProfileUpdate, {name : "buyerProfileUpdate"}),
graphql(buyerPhoneUpdate, {name : "buyerPhoneUpdate"}),
graphql(buyerEmailUpdate, {name : "buyerEmailUpdate"}))(Profile);