var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var { mongoose } = require('.././db/mongoose');
var {Buyer} = require('../models/buyer_signup');
var { Items } = require('../models/res_items');

var buyerType = new GraphQLObjectType({
    name: 'buyer',
    fields: function () {
      return {
        fname: {
          type: GraphQLString
        },
        lname: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        phone: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
      }
    }
  });

  var itemType = new GraphQLObjectType({
    name: 'item',
    fields: function () {
      return {
        res_email: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        },
        res_name: {
          type: GraphQLString
        },
        item_name: {
          type: GraphQLString
        },
        item_desc: {
          type: GraphQLString
        },
        item_price: {
          type: GraphQLString
        },
        menu_sec: {
          type: GraphQLString
        },
      }
    }
  });

  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
          type: new GraphQLList(buyerType),
          resolve: function () {
            const users = userModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        },
      }
    }
  });

  const mutation = new GraphQLObjectType({
      name : 'Mutation',
      fields: {
              addBuyer : {
                  type: buyerType,
                  args : {
                    fname : {
                          type : GraphQLString
                      },
                      lname : {
                          type : GraphQLString
                      },
                      email : {
                          type : GraphQLString
                      },
                      phone : {
                          type : GraphQLString
                      },
                      password : {
                        type : GraphQLString
                      }
                  },
                  resolve(root, params) {
                      console.log(params.email)
                      const buyer = new Buyer(params);
                      const newUser = buyer.save();
                      return newUser
                  }
              },

              addOwner : {
                  type: buyerType,
                  args : {
                    FirstName : {
                          type : GraphQLString
                      },
                      LastName : {
                          type : GraphQLString
                      },
                      Email : {
                          type : GraphQLString
                      },
                      Password : {
                          type : GraphQLString
                      },
                      RestaurantName : {
                        type: GraphQLString
                      },
                      Cuisine : {
                        type : GraphQLString
                      },
                      role : {
                        type : GraphQLString
                      }
                  },
                  resolve : function(root, params) {
                      const user = new userModel(params);
                      const newUser = user.save();
                    
                      if(!newUser) {
                          throw new Error('Error')
                      }
                      
                      return newUser
                  }
              },

              login : {
                    type : buyerType,
                    args : {
                      email : {
                        type : GraphQLString
                      },
                      password : {
                        type : GraphQLString
                      }
                    },
                    resolve : function(root, params) {
                      const response = Buyer.findOne({email : params.email});
                      console.log("response", response)
                      if(!response) {
                        throw new Error('Error');
                      } 
                      // console.log(response);
                      return response
                    }
              },

              buyerProfileUpdate : {
                type : buyerType,
                args : {
                  fname : {
                    type : GraphQLString
                  },
                  lname : {
                    type : GraphQLString
                  },
                  email : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  console.log("params", params)
                  const response = Buyer.findOneAndUpdate({email : params.email}, {$set: {fname : params.fname, lname : params.lname}},{new:true});
                  console.log(response)
                  if(!response) {

                    throw new Error('Error');
                  }
                  return response;
                }
              },

              buyerEmailUpdate : {
                type : buyerType,
                args : {
                  email2 : {
                    type : GraphQLString
                  },
                  email : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  console.log("params", params)
                  const response = Buyer.findOneAndUpdate({email : params.email2}, {$set: {email : params.email}},{new:true});
                  console.log(response)
                  if(!response) {

                    throw new Error('Error');
                  }
                  return response;
                }
              },

              buyerPhoneUpdate : {
                type : buyerType,
                args : {
                  phone : {
                    type : GraphQLString
                  },
                  email : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  console.log("params", params)
                  const response = Buyer.findOneAndUpdate({email : params.email}, {$set: {phone : params.phone}},{new:true});
                  console.log(response)
                  if(!response) {

                    throw new Error('Error');
                  }
                  return response;
                }
              },

              menu: {
                type: itemType,
                args: {
                  res_email: {
                    type: GraphQLString
                  }
                },async resolve(parent, args) {
                  console.log(args.res_email);
                  let response = await Items.find({
                      "res_email": args.res_email,
                  })
                 
          
                  var items = {
                    item_list : response
                  }
                  console.log("response", items)
                  return items;
                }
              }
      }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation : mutation});