const { ApolloServer, gql } = require('apollo-server');
//see md file for more
var interfaceEG =`
{
	tablet(input:ipad){
	  type
	  browser
	  ... on IpadPro{
		appleGuard
	  }
		 }
	tab2:tablet(input:kindle){
	  type
	  browser
	  ... on Kindle{
		reader
	  }
		 }
	 tab3:tablet(input:nexus){
	  type
	  browser
	  ... on Nexus2{
	   control
	  }
		 }
  }
OUTPUTS
{
	"data": {
	  "tablet": {
		"type": "ipad",
		"browser": "Chrome",
		"appleGuard": 3
	  },
	  "tab2": {
		"type": "kindle",
		"browser": "Chrome",
		"reader": "Acrobat"
	  },
	  "tab3": {
		"type": "nexus",
		"browser": "Chrome",
		"control": true
	  }
	}
  }
  MORE EFFICENT 3 fragments
  {
	tablet(input:nexus){
	  type
	  browser
	  ... on IpadPro{
		appleGuard
	  }
	  ... on Kindle{
		reader
	  }
	  ... on Nexus2{
	   control
	  }
		 }
   
  }
  outputs
  {
	"data": {
	  "tablet": {
		"type": "nexus",
		"browser": "Chrome",
		"control": true
	  }
	}
  }

  UNION
  {
	searchResult(id:"1"){
	  ...on Human{
		age
		name
	  }
	  ...on Animal{
	  species
	}
	}
  }
  OUTPUT
  {
	"data": {
	  "searchResult": [
		{
		  "species": "dog"
		}
	  ]
	}
  }
`
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
		species: String
	}

	union SearchResult = Human | Animal
# unions & interfaces allow us to group together different types
#unions -returns many different types with nothing in common, can only be custom types
# whatever is in the interface must be in the type as well
# __resolveType has no args =>parent,ctx,path    resolves to type as String eg "IpadPro"
enum TabletType{
	ipad
	kindle
	nexus
}
interface Tablet{
browser:String	
type:TabletType
}
type IpadPro implements Tablet{
	browser:String
	type:TabletType
	appleGuard:Int
}
type Kindle implements Tablet{
	browser:String
	type:TabletType
	reader:String
}
type Nexus2 implements Tablet{
	browser:String
	type:TabletType
	control:Boolean
}
	type Query {
		searchResult(id:ID!):[SearchResult]
		tablet(input:TabletType):Tablet!
		human(id: ID!): Human
		animal(id: ID!): Animal
		allHumans: [Human]!
	}

	type Mutation {
		newHuman(input: NewHumanInput!): Human
	}
`;

const resolvers = {
	Query: {
		searchResult(parent,args){
let Array =[]
const a = myArray.find((a) => a.id === args.id);
const b =animalArray.find((a) => a.id === args.id);
if(a) Array.push(a)
if(b) Array.push(b)
return Array
		},
		tablet(parent,args,ctx){
return{
	type:args.input,
	browser:"Chrome",
	reader:"Acrobat",
	appleGuard:3,
	control:true
}
		},
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
		},
		animal(parent,args){
			const { id, species } = animalArray.find((a) => a.id === args.id);
			return { id, species };
		},
		
	},
	Human: {
		pet(parent, args) {
			console.log(parent);
			
			const { pet } = myArray.find((a) => a.id === parent.id);
			const { id, species } = animalArray.find((a) => a.id === pet);
			return { id, species };
		}
	},
	SearchResult:{
__resolveType(parent){
	if(parent.species){
		return "Animal"
	}else{
		return "Human"
	}
}
	},
	Tablet:{
__resolveType(parent,ctx){
switch(parent.type){
	case "ipad":
		return "IpadPro"
	case "kindle":
		return "Kindle"
	default:
		return "Nexus2"
}
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