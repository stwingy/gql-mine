const { authenticated, authorized } = require('./auth');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const resolvers = {
	JSON: {

		__serialize(value) {
			return GraphQLJSON.parseValue(value);
		} },
	Query: {
		allUsers: async (parent, args, ctx) => {
			const users = await ctx.User.find();
			return users;
		},
		allPosts: async (parent, args, ctx) => {
			const posts = await ctx.Post.find();
			return posts;
		},
		onePost: async (parent, args, ctx) => {
			const post = await ctx.Post.findById(args.id);
			return post;
		}
	},
	Mutation: {
		makePost: async(parent,{body},{Post})=>{
const p = await new Post({body}).save()
return p
		},
		createUser: async (parent, { name, email, password }, { User, createToken }) => {
			const checkUser = await User.findOne({ email });
			if (checkUser) {
				throw new Error('User already exists');
			}
			const user = await new User({
				name,
				email,
				password
			}).save();
			const token = createToken({ id: user.id, role: user.role });
			console.log(token);
			return { token, user };
        },
        signIn:async(parent, {email,password}, {User, createToken})=> {
            const user = await User.findOne({email})
      console.log("user",user,"email",email)
            if (!user) {
              throw new Error('nope')  
            }
      
            const token = createToken(user)
            return {token, user}
          }
	}
};
module.exports = { resolvers };
