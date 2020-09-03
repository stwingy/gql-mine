const { ApolloServer, gql } = require('apollo-server');


const typeDefs = gql`
# enums work on type or input
enum GenderTypes{  
	male
	female
	trans
}
	input NewHumanInput {
		name: String!
		gender:GenderTypes!
	}

	type Human {
		name: String!
		id: ID!
		gender:GenderTypes!
        age:Int
		pet: Animal
	}

	type Animal {
		id: ID!
		species: String!
	}

	type Query {
		human(id: ID!): Human
		allHumans: [Human]!
	}

	type Mutation {
		newHuman(input: NewHumanInput!): Human
	}
`;

const resolvers = {
	Query: {
		human(parent, args, ctx) {
			const { id, name, pet,age,gender } = myArray.find((a) => a.id === args.id);

			return {
				id,
                name,
                age,
				pet,
				gender
			};
		},
		allHumans(parent, args, ctx) {
			return ctx.array;
		}
	},
	Human: {
		pet(parent, args) {
			console.log(parent);
			
			const { pet } = myArray.find((a) => a.id === parent.id);
			const { id, species } = animalArray.find((a) => a.id === pet);
			return { id, species };
		}
	},
	Mutation: {
		newHuman(parent, args, ctx) {
			const {name,gender} = args.input;
			const id = ctx.count;
			myArray.push({ name,gender, id });
			return { name, id };
		}
	}
};

let count = -1;
const myArray = [
	{ id: '10', name: 'john', pet: '1',age:56,gender:"male" },
	{ id: '20', name: 'Andrew', pet: '2',age:55,gender:"male"  },
	{ id: '30', name: 'Mark', pet: '3',age:51,gender:"trans"  }
];
const animalArray = [ { id: '1', species: 'dog' }, { id: '2', species: 'cat' }, { id: '3', species: 'mouse' } ];
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context() {
		const array = [ ...myArray ];
		count++;

		// const token = req.headers.authorization;
		// console.log(token);
		// const user = getUserFromToken(token);
		// //console.log('user', user);
		return { array, count };
	}
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});



// multiple queries******************And fragments
// human(id:"10"){
//     id
//     name
//     age
//     pet{
//       id
//       species
//     }
//   }
//    anotherhuman: human(id:"20"){
//    ...humanFields
   
//   }
// }
// fragment humanFields on Human{
//   id
//   name
//   age
//    pet{
//       id
//       species
//     }
// }

//   outputs*************************
// {
//     "data": {
//       "human": {
//         "id": "10",
//         "name": "john",
//         "age": 56,
//         "pet": {
//           "id": "1",
//           "species": "dog"
//         }
//       },
//       "anotherhuman": {
//         "id": "20",
//         "name": "Andrew",
//         "age": 55,
//         "pet": {
//           "id": "2",
//           "species": "cat"
//         }
//       }
//     }
//   }