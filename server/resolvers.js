const { authenticated, authorized } = require('./auth');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const resolvers = {
	JSON: {
		__serialize(value) {
			return GraphQLJSON.parseValue(value);
		}
	},
	Query: {
		allUsers: async (parent, args, ctx) => {
			console.log('ctx', ctx);
			console.log(parent);
			const users = await ctx.User.find();
			return users;
		},
		allPosts: async (parent, args, ctx) => {
			const posts = await ctx.Post.find().populate({ path: 'user' }).exec();
			return posts;
		},
		onePost: async (parent, args, ctx) => {
			const post = await ctx.Post.findById(args.id);
			return post;
		}
	},
	Mutation: {
		makePost: authenticated(async (parent, { body, title, user }, { Post, User }) => {
			const u = await User.findById(user);

			const p = await new Post({ body, title, user }).save();

			return { body, title, id: p.id, user: { name: u.name, role: u.role, email: u.email } };
		}),
		deletePost: async (parent, { id, user }, { Post }) => {
			const p = await Post.findById(id);
			console.log(p.user._id) 
			console.log(user)
			if(String(p.user._id)===String(user)){
				console.log("yes")
				await Post.findOneAndDelete(id)
			}
				
			
			return p;
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

			return { token, user };
		},
		signIn: async (parent, { email, password }, { User, createToken }) => {
			const user = await User.findOne({ email });

			if (!user) {
				throw new Error('nope');
			}

			const token = createToken({ id: user.id, role: user.role });
			return { token, user };
		}
	}
};
module.exports = { resolvers };
