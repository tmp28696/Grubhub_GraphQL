var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var { Restaurant } = require('../models/res_signup');
var { Items } = require('../models/res_items');
var { mongoose } = require('.././db/mongoose');

var ownerType = new GraphQLObjectType({
  name: 'owner',
  fields: function () {
    return {
      name: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      res_name: {
        type: GraphQLString
      },
      res_zipcode: {
        type: GraphQLString
      },
      cuisine: {
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
        type: new GraphQLList(ownerType),
        resolve: function () {
          const users = Restaurant.find().exec()
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
  name: 'Mutation',
  fields: {
    ownerCuisineUpdate: {
      type: ownerType,
      args: {
        cuisine: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOneAndUpdate({ email: params.email }, { $set: { cuisine: params.cuisine } }, { new: true });
        if (!response) {
          throw new Error('Error');
        }
        console.log("response", response)
        return response;
      }
    },

    addOwner: {
      type: ownerType,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        },
        res_name: {
          type: GraphQLString
        },
        res_zipcode: {
          type: GraphQLString
        },
        cuisine: {
          type: GraphQLString
        },
        phone: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        },
      },
      resolve: function (root, params) {
        const owner = new Restaurant(params);
        const newUser = owner.save();
        console.log("new user ", newUser)
        if (!newUser) {
          throw new Error('Error')
        }
        return newUser
      }
    },

    login: {
      type: ownerType,
      args: {
        email: {
          type: GraphQLString
        },
        password: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOne({ email: params.email });
        console.log("response", response)
        if (!response) {
          throw new Error('Error');
        }
        return response
      }
    },

    ownerNameUpdate: {
      type: ownerType,
      args: {
        name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOneAndUpdate({ email: params.email }, { $set: { name: params.name } }, { new: true });
        if (!response) {
          throw new Error('Error');
        }
        console.log("response", response)
        return response;
      }
    },

    ownerRestaurantUpdate: {
      type: ownerType,
      args: {
        res_name: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOneAndUpdate({ email: params.email }, { $set: { res_name: params.res_name } }, { new: true });
        if (!response) {
          throw new Error('Error');
        }
        console.log("response", response)
        return response;
      }
    },

    ownerPhoneUpdate: {
      type: ownerType,
      args: {
        phone: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOneAndUpdate({ email: params.email }, { $set: { phone: params.phone } }, { new: true });
        if (!response) {
          throw new Error('Error');
        }
        console.log("response", response)
        return response;
      }
    },

    ownerPasswordUpdate: {
      type: ownerType,
      args: {
        password: {
          type: GraphQLString
        },
        email: {
          type: GraphQLString
        }
      },
      resolve: function (root, params) {
        const response = Restaurant.findOneAndUpdate({ email: params.email }, { $set: { password: params.password } }, { new: true });
        if (!response) {
          throw new Error('Error');
        }
        console.log("response", response)
        return response;
      }
    },

    addItem: {
      type: itemType,
      args: {
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
      },
      resolve: function (root, params) {
        const item = new Items(params);
        const newItem = item.save();
        console.log("new user ", newItem)
        if (!newItem) {
          throw new Error('Error')
        }
        return newItem
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
      // resolve: function (root, params) {
      //   console.log("email" + params.res_email)
      //   const response = Items.find({ res_email: params.res_email});
      //   // console.log(response)
      //   if (!response) {
      //     throw new Error('Error');
      //   }
        console.log("response", items)
        return items;
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });