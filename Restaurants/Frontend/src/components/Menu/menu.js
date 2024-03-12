import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import '../../App.css';
import axios from 'axios';
import { array } from 'prop-types';
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { menu } from '../../mutations/mutations';
import { graphql } from 'react-apollo';



//create the Navbar Component
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            menusection: [],
            section:{}
           
        }
    }
  
    componentDidMount(e) {
        //e.preventDefault();
        console.log("in componentdidmount")
        console.log(localStorage.getItem('decoded_email'))
        var email = localStorage.getItem('decoded_email')
        this.props.menu({
            variables : {
                res_email: localStorage.getItem('decoded_email')
         }
        }).then(res => {
            console.log("response")
            console.log(res)
        //     var result = response.data.data
        //     var section = {}
        //     var array = []
        //     var i = 0;
        //     result.forEach(function (item) {
        //         if (Object.keys(section).includes(response.data.data[i].menu_sec)) {
        //             array = [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price]
        //             section[response.data.data[i].menu_sec].push(array)
                    
        //         } 
        //         else {
        //             section[response.data.data[i].menu_sec] =[ [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price],]
        //         }
        
        //         i++;
        //     });
        //     console.log("section",section)
        //     this.setState({
        //         menusection: Object.keys(section),
        //         section: section
        //     })
        //    console.log("menu", this.state.menusection)
        });
        
    



        // var data={
        //     res_email:localStorage.getItem('decoded_email')
        // }
        // axios.defaults.withCredentials = true;
        // axios.post('http://localhost:3001/menu',data)
        //     .then((response) => {
        //         console.log("response")
        //         console.log(response.data.data)
        //         var result = response.data.data
        //         var section = {}
        //         var array = []
        //         var i = 0;
        //         result.forEach(function (item) {
        //             if (Object.keys(section).includes(response.data.data[i].menu_sec)) {
        //                 array = [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price]
        //                 section[response.data.data[i].menu_sec].push(array)
                        
        //             } 
        //             else {
        //                 section[response.data.data[i].menu_sec] =[ [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price],]
        //             }
            
        //             i++;
        //         });
        //         console.log("section",section)
        //         this.setState({
        //             menusection: Object.keys(section),
        //             section: section
        //         })
        //        console.log("menu", this.state.menusection)
        //     });
    }


    render() {
        let redirectVar = null;
        if (localStorage.getItem('decoded_email') == null) {
            console.log("in cookie if")
            redirectVar = <Redirect to="/login" />
        }

        console.log(this.state.menusection)
        let details = Object.keys(this.state.section).map(menuType => {
            return (
                <div class="u-clickable u-list">
                    <div class="u-list-heading h5">
                        <div>{menuType}</div></div>
                        {
                            this.state.section[menuType].map(item => {
                                console.log("item",item)
                            return (
                                <div class="u-clickable u-list">
                                    <div class="u-flex u-flex-justify u-flex-align">
                                        <div class="u-mar1">
                                            <div class="s-list-item-primary u-mar1">{item[0]}</div>
                                            <div class="s-list-item-secondary u-mar1">
                                                <span class="span">{item[1]}</span></div>
                                        </div>
                                        <div class="edit" tabIndex="0">${item[2]}</div>
                                        <div class="edit"  role="button"><Link to="/updateitem">Update</Link></div>
                                    </div>
                                    </div> 
                          
                            )
                        })
                    }
                    </div>
               
            )
        })


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
                                <div class="u-list-heading h5">
                                    <div>Menu</div>
                                </div>
                                {details}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         menusection: state.menu.menusection,
//         section: state.menu.section
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         oncomponentDidMount: (data) => {
//             var value = {
//                 res_email:data.res_email
//             }
//             console.log(value)
//             axios.defaults.withCredentials = true;
//             axios.post('http://localhost:3001/menu',value, { headers: { Authorization: localStorage.getItem('token') }})
//             .then((response) => {
//                 console.log("response")
//                 console.log(response.data.data)
//                 var result = response.data.data
//                 var section = {}
//                 var array = []
//                 var i = 0;
//                 result.forEach(function (item) {
//                     if (Object.keys(section).includes(response.data.data[i].menu_sec)) {
//                         array = [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price]
//                         section[response.data.data[i].menu_sec].push(array)
                        
//                     } 
//                     else {
//                         section[response.data.data[i].menu_sec] =[ [response.data.data[i].item_name, response.data.data[i].item_desc, response.data.data[i].item_price],]
//                     }
            
//                     i++;
//                 });
//                 console.log(section)
//                dispatch({ type: 'MENU', payload: section, statusCode: 200})                       
//              })
//                 .catch((error) => {

//                 });
//         }


//     }
// }

// export default reduxForm({
//     form: "menu"
// })(connect(mapStateToProps, mapDispatchToProps)(Menu));
export default graphql(menu, {name : "menu"})(Menu);