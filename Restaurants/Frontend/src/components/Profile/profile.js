import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from 'react-router';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { login } from "../../actions";
import cookie from 'react-cookies';
import { ownerNameUpdate } from '../../mutations/mutations';
import { ownerRestaurantUpdate } from '../../mutations/mutations';
import { ownerCuisineUpdate } from '../../mutations/mutations';
import { ownerPhoneUpdate } from '../../mutations/mutations';
import { ownerPasswordUpdate } from '../../mutations/mutations';
import { graphql } from 'react-apollo';
import {flowRight as compose} from 'lodash';

//create the Navbar Component
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state={
            edit : null,
            password:"",
            res_name:"",
            name: "",
            email: "",
            email2:"",
            phone:"",
            res_zipcode:"",
            cuisine:"",
            
        }
        this.handlenameedit = this.handlenameedit.bind(this);
        this.handleemailedit = this.handleemailedit.bind(this);
        this.handlephoneedit = this.handlephoneedit.bind(this);
        this.handleresnameedit = this.handleresnameedit.bind(this);
        this.handlecuisineedit = this.handlecuisineedit.bind(this);
        this.handlecuisineclick = this.handlecuisineclick.bind(this);
        this.handlepasswordedit = this.handlepasswordedit.bind(this);
        this.updatename = this.updatename.bind(this);
        this.updateemail = this.updateemail.bind(this);
        this.updateemail2 = this.updateemail2.bind(this);
        this.updatephone = this.updatephone.bind(this);
        this.updatecuisine = this.updatecuisine.bind(this);
        this.updateresname = this.updateresname.bind(this);
        this.handleupdatename = this.handleupdatename.bind(this);
        this.handleupdateemail = this.handleupdateemail.bind(this);
        this.handleupdatephone = this.handleupdatephone.bind(this);
        this.handleupdateresname = this.handleupdateresname.bind(this);
    }
    componentDidMount(){
        try{
            console.log("in componentdidmount")
            var data1 = {
                email: localStorage.getItem('decoded_email')
            }
            console.log(data1.email)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/profile', data1) 
                    .then((response) => {
                        console.log(response.data.data);
                        console.log(response.data.data.cuisine);
                        sessionStorage.setItem('res_cuisine',response.data.data.cuisine)
                        sessionStorage.setItem('res_name',response.data.data.res_name)
                        console.log("inside axios",response.data.data);
                        this.setState({
                            name: response.data.data.name,
                            res_name: response.data.data.res_name,
                            res_zipcode: response.data.data.res_zipcode,
                            cuisine: response.data.data.cuisine,
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
    handleresnameedit() {
        this.setState({ edit: "resname" });
    }
    handlecuisineedit() {
        this.setState({ edit: "cuisine" });

    }
    handlepasswordedit() {
        this.setState({ edit: "password" });
    }
    updatename(e){
        this.setState({name: e.target.value})
    }
    updatecuisine(e){
        this.setState({cuisine: e.target.value})
    }
    updateemail(e){
        this.setState({email:e.target.value})
    }
    updateemail2(e){
        this.setState({email2:e.target.value})
    }
    updatephone(e){
        this.setState({phone: e.target.value})
    }
    updateresname(e){
        this.setState({res_name: e.target.value})
    }
    handleupdatename=(e)=>{
        e.preventDefault();
        console.log("in update name")
            let response = this.props.ownerNameUpdate({
                variables : {
                    name : this.state.name,
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

    handleupdateemail=(e)=>{
        e.preventDefault();
        console.log("in update name")
            let response = this.props.ownerNameUpdate({
                variables : {
                    name : this.state.name,
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

            handleupdatephone=(e)=>{
                e.preventDefault();
                console.log("in update name")
                    let response = this.props.ownerNameUpdate({
                        variables : {
                            name : this.state.name,
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

            handleupdateresname=(e)=>{
                e.preventDefault();
                console.log("in update name")
                    let response = this.props.ownerRestaurantUpdate({
                        variables : {
                            res_name : this.state.res_name,
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

                handlecuisineclick=(e)=>{
                    e.preventDefault();
                    console.log("in update name")
                        let response = this.props.ownerCuisineUpdate({
                            variables : {
                                cuisine : this.state.cuisine,
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
        sessionStorage.setItem('r_id',this.props.r_id)
        sessionStorage.setItem('res_name',this.props.resname)
        console.log(sessionStorage.getItem('r_id'));
        console.log(sessionStorage.getItem('res_name'));
        const edit = this.state.edit;
        let button;

        if (edit == "name") {

            button = (
                <div>
                <form onSubmit={this.handleupdatename}>
                <h3>Edit Name</h3>
                <p>Name</p>
                <input class="input1" type="text" onChange={this.updatename} name="name"/>
                <p>current Email</p>
                <input class="input1" type="text" onChange={this.updateemail} name="email"/>
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
                <h3>Edit Email</h3>
                <p>current Email</p>
                <input class="input1" type="text" onChange={this.updateemail2} name="email2"/>
                <p>New Email</p>
                <input class="input1" type="text" onChange={this.updateemail} name="email"/>
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
                <h3>Edit Phone</h3>
                <p>New Phone</p>
                <input class="input1" type="text" onChange={this.updatephone} name="phone"/>
                <p>current Email</p>
                <input class="input1" type="text" onChange={this.updateemail} name="email"/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }


        else if (edit == "resname") {
            button = (
                <div>
                <form onSubmit={this.handleupdateresname}>
                <h3>Edit Restaurant Name</h3>
                <p>New Name</p>
                <input class="input1" class="input1" type="text" onChange={this.updateresname} name="resname"/>
                <p>current Email</p>
                <input class="input1" class="input1" type="text" onChange={this.updateemail} name="email"/>
                <button type="submit">Update</button>
                <button>Cancel</button>
                </form>
                </div>
            )
        }

        else if (edit == "cuisine") {
            button = (
                <div>
                <form onSubmit={this.handlecuisineclick}>
                <h3>Edit Restaurant Name</h3>
                <p>New Cuisine</p>
                <input class="input1" class="input1" type="text" onChange={this.updatecuisine} name="cuisine"/>
                <p>current Email</p>
                <input class="input1" class="input1" type="text" onChange={this.updateemail} name="email"/>
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
                            <li class="account-nav-items-item"><a href="/profile"><span>Profile</span></a></li>
                            <li class="account-nav-items-item"><a href="/home"><span>Home</span></a></li>
                            <li class="account-nav-items-item"><a href="/menu"><span>Menu</span></a></li>
                            <li class="account-nav-items-item"><a href="/items"><span>Add/Delete Item</span></a></li>
                            <li class="account-nav-items-item"><a href="/updateitem"><span>Update Item</span></a></li>
                        </ul>
                    </div>
                    <div class="account-content u-block s-col2 s-box1 s-col-md-9">
                        <form role="form">
                            <div class="u-list ">
                                <div class="u-list-heading h5">Your Account</div>
                                <div class="u-clickable u-list">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1">Profile Image </div>
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
                                                <span class="span">{this.state.name}</span></div>
                                               
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
                                        <div class="s-list-item-primary u-mar1">Restaurant Image</div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">Patel Restaurant</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" role="button">Edit</div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Restaurant Name </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.res_name}</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" onClick={this.handleresnameedit} role="button">Edit</div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Cuisine </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.cuisine}</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" onClick={this.handlecuisineedit} role="button">Edit</div>
                                </div>
                            </div>
                            <div class="u-clickable u-list">
                                <div class="u-flex u-flex-justify u-flex-align">
                                    <div class="u-mar1">
                                        <div class="s-list-item-primary u-mar1">Password </div>
                                        <div class="s-list-item-secondary u-mar1">
                                            <span class="span">{this.state.password}</span></div>
                                    </div>
                                    <div class="edit" tabIndex="0" onClick={this.handlepasswordedit} role="button">Edit</div>
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


export default compose(graphql(ownerNameUpdate, {name : "ownerNameUpdate"}),
graphql(ownerRestaurantUpdate, {name : "ownerRestaurantUpdate"}),
graphql(ownerCuisineUpdate, {name : "ownerCuisineUpdate"}),
graphql(ownerPhoneUpdate, {name : "ownerPhoneUpdate"}),
graphql(ownerPasswordUpdate, {name : "ownerPasswordUpdate"}))(Profile);