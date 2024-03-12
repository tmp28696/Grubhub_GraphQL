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
    mutation addOwner($FirstName: String, $LastName: String, $Email: String, $Password : String,$RestaurantName: String,$Cuisine:String, $role : String) {
            addOwner(FirstName: $FirstName, LastName: $LastName, Email: $Email, Password: $Password, RestaurantName: $RestaurantName, Cuisine:$Cuisine, role : $role) {
                FirstName,
                LastName,
                Email,
                Password,
                RestaurantName,
                Cuisine,
                role
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

const buyerProfileUpdate = gql`
    mutation buyerProfileUpdate($fname:String, $lname : String, $email : String) {
        buyerProfileUpdate(fname : $fname, lname : $lname, email : $email) {
            fname,
            lname,
            email
        }
    }
`;

const buyerEmailUpdate = gql`
    mutation buyerEmailUpdate($email2:String, $email : String) {
        buyerEmailUpdate(email : $email2, email : $email) {
            email2,
            email
        }
    }
`;

const buyerPhoneUpdate = gql`
    mutation buyerPhoneUpdate($phone:String, $email : String) {
        buyerPhoneUpdate(phone : $phone, email : $email) {
            phone,
            email
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

export {addBuyerMutation, addOwnerMutation, login, buyerProfileUpdate, buyerEmailUpdate, buyerPhoneUpdate, menu};