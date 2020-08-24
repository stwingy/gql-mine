const { authenticated, authorized } = require('./auth');
const resolvers = {
	Query: {
		allUsers: async (parent, args, ctx) => {
			const users = await ctx.User.find();
			return users;
		}
	},
	Mutation: {
		createUser: async (parent, { name, email, password }, { User, createToken }) => {
			const checkUser = await User.findOne({ name });
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
            const user = await User.findOne({email,password})
      
            if (!user) {
              throw new Error('nope')  
            }
      
            const token = createToken(user)
            return {token, user}
          }
	}
};
module.exports = { resolvers };
