import {gql} from 'apollo-boost';

const addBuyerMutation = gql`
    mutation addBuyer($fname: String, $lname: String, $email: String, $phone : String, $password : String) {
            addBuyer(fname: $fname, lname: $lname, email: $email, phone: $phone, password : $password) {
                fname,
                lname,
                email,
                phone,
                password
            }
        }
`;

const addOwnerMutation = gql`
    mutation addOwner($name: String, $email: String, $res_name: String, $res_zipcode : String,$cuisine: String, $phone:String, $password : String) {
            addOwner(name: $name, email: $email, res_name: $res_name, res_zipcode: $res_zipcode, cuisine: $cuisine, phone:$phone, password : $password) {
                name,
                email,
                res_name,
                res_zipcode,
                cuisine,
                phone,
                password
            }
        }        
`;

const login = gql`
    mutation login($email : String, $password : String) {
        login(email : $email, password : $password) {
          email,
          password
        }
    }
`;

const ownerNameUpdate = gql`
    mutation ownerNameUpdate($name:String, $email : String) {
        ownerNameUpdate(name : $name, email : $email) {
            name,
            email
        }
    }
`;

const ownerRestaurantUpdate = gql`
    mutation ownerRestaurantUpdate($res_name:String, $email : String) {
        ownerRestaurantUpdate(res_name : $res_name, email : $email) {
            res_name,
            email
        }
    }
`;

const ownerCuisineUpdate = gql`
    mutation ownerCuisineUpdate($cuisine:String, $email : String) {
        ownerCuisineUpdate(cuisine : $cuisine, email : $email) {
            cuisine,
            email
        }
    }
`;

const ownerPhoneUpdate = gql`
    mutation ownerPhoneUpdate($phone:String, $email : String) {
        ownerPhoneUpdate(phone : $phone, email : $email) {
            phone,
            email
        }
    }
`;

const ownerPasswordUpdate = gql`
    mutation ownerPasswordUpdate($password:String, $email : String) {
        ownerPasswordUpdate(password : $password, email : $email) {
            password,
            email
        }
    }
`;

const addItem = gql`
    mutation addItem($res_email:String, $cuisine : String, $res_name : String, $item_name : String, $item_desc : String, $item_price : String, $menu_sec : String) {
        addItem(res_email : $res_email, cuisine : $cuisine, res_name : $res_name, item_name : $item_name, item_desc : $item_desc, item_price : $item_price, menu_sec : $menu_sec) {
            res_email,
            cuisine,
            res_name,
            item_name,
            item_desc,
            item_price,
            menu_sec
        }
    }
`;

const menu = gql`
    mutation menu($res_email:String ) {
        menu(res_email : $res_email) {
            res_email,
            cuisine,
            res_name,
            item_name,
            item_desc,
            item_price,
            menu_sec
        }
    }
`;


export {ownerCuisineUpdate, addOwnerMutation, login, ownerNameUpdate, ownerRestaurantUpdate, ownerPhoneUpdate, ownerPasswordUpdate,addItem, menu};