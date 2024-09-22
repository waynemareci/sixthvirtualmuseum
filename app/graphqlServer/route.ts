import { Neo4jGraphQL } from "@neo4j/graphql";
import neo4j from "neo4j-driver";
import { createYoga } from "graphql-yoga";


const typeDefs = `
  type JWT @jwt {
    roles: [String!]!
  }
      type WorkOfArt {
    workOfArtId: ID!
    creationDate: Date!
    fileName: String!
    title: String!
    medium: String!
    creator: [Artist!]! @relationship(type: "CREATED_BY", direction: OUT)
    style: [Style!]! @relationship(type: "CATEGORIZED_AS", direction: OUT)
  }
  
  type Artist {
    artistId: ID!
    name: String!
    nationality: String
    birthYear: Date!
    birthPlace: Point!
    works: [WorkOfArt!]! @relationship(type: "CREATED", direction: OUT)
    styles: [Style!]! @relationship(type: "ASSOCIATED_WITH", direction: OUT)
  }

  type Style {
    styleId: ID!
    name: String!
  }

  type Business {
    businessId: ID!
    waitTime: Int! @customResolver
    name: String!
    address: String!
    city: String!
    state: String!
    location: Point!
    averageStars: Float!
     #@authentication
     @cypher(
       statement: "MATCH (this)<-[:REVIEWS]-(r:Review) RETURN avg(r.stars) as avgStars"  
       columnName: "avgStars"
     )
    recommended(first: Int = 1): [Business!]!
      @cypher(
        statement: """
        MATCH (this)<-[:REVIEWS]-(:Review)<-[:WROTE]-(u:User)
        MATCH (u)-[:WROTE]->(:Review)-[:REVIEWS]->(rec:Business)
        WITH rec, COUNT(*) AS score
        RETURN rec ORDER BY score DESC LIMIT $first
        """
        columnName: "rec"
      )        
    reviews: [Review!]! @relationship(type: "REVIEWS", direction: IN)
    categories: [Category!]! @relationship(type: "IN_CATEGORY", direction: OUT)
  }

  type User {
    userId: ID!
    name: String!
    reviews: [Review!]! @relationship(type: "WROTE", direction: OUT)
  }
  #extend type User @authorization(
  #  validate: [
  #    { operations: [CREATE, UPDATE, DELETE], where: { jwt:{ roles_INCLUDES: "admin"}}}
  #    { operations: [READ], where: { node: { userId: "$jwt.sub"}}}
      #{ where: { jwt:{ roles_INCLUDES: "admin"}}}
  #  ]
    #filter: [
    #  { operations: [READ], where: {node: {userId: "$jwt.sub"}}}
    #]
  #)
  
  type Review {
    reviewId: ID!
    stars: Float!
    date: Date!
    text: String
    user: User! @relationship(type: "WROTE", direction: IN)
    business: Business! @relationship(type: "REVIEWS", direction: OUT)
  }
  #extend type Review @authorization(
  #  validate: [
      #{ where: { jwt:{ roles_INCLUDES: "user"}}},
      #{ where: { jwt:{ roles_INCLUDES: "admin"}}},
  #    { operations: [CREATE, UPDATE] when: [AFTER], where: { node: {user: {userId: "$jwt.sub" }}}}
  #  ] 
  #)

  type Category {
    name: String!
    #businesses: [Business!]! @relationship(type: "IN_CATEGORY", direction: IN)  
  }

  enum BusinessOrdering {
    name_asc
    name_desc
  }

  type Query  {
    #allBusinesses: [Business!]!
    #businessBySearchTerm(
    #  search: String!
    #  first: Int = 10
    #  offset: Int = 0
    #  orderBy: BusinessOrdering = name_asc
    #): [Business!]!
    #userById(id: ID!): User
    #creatorOfObject(objectId: ID): [Object]
    qualityBusiness: [Business] 
      @cypher(        
        statement: """
          MATCH (b:Business)<-[:REVIEWS]-(r:Review WHERE r.stars >=4)
          WITH b, count(r) as numberOfReviews4AndAbove
          WHERE apoc.util.validatePredicate(NOT ($jwt.roles IS NOT NULL AND 'user' IN $jwt.roles), "@neo4j/graphql/FORBIDDEN", [0]) AND numberOfReviews4AndAbove >= 2
          RETURN b
        """
        columnName: "b"
      )
    fuzzyBusinessByName(searchString: String): [Business]
      @cypher(
        statement: """
          CALL
          db.index.fulltext.queryNodes('businessNameIndex', $searchString+'~')
          YIELD node RETURN node
        """,
        columnName: "node"
      )
  }
`;


const resolvers = {
  
  Business: {
    waitTime: (obj: any, args: any, context: any, info: any) => {
     // waitTime: () => {
      const options = [0, 5, 10, 15, 30, 45];
      return options[Math.floor(Math.random() * options.length)];
    },

  },
  
};

// Read our Neo4j connection credentials from environment variables (see .env.local)
//const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env;

// Create a Neo4j driver instance to connect to Neo4j AuraDB
const driver = neo4j.driver(

  "neo4j+s://25a4f391.databases.neo4j.io",
  neo4j.auth.basic("neo4j", "qHXXyaWYLwwyKqW0V6fYmKHwmJxCgHaM8Mjl7tn87C4")
  /*
  NEO4J_URI as string,
  neo4j.auth.basic(NEO4J_USERNAME as string, NEO4J_PASSWORD as string)
  */
);

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  resolvers,
  driver,
  debug: true,
  features: {
    authorization: {
      //key: "JwdnwNN2BDv1BGGJRn1jM420XZA8Z4Yn"

      key: {
        url: "https://dev-spxf3pmvngdhjouv.us.auth0.com/.well-known/jwks.json",
      },

    },
  },

});

// Building the Neo4j GraphQL schema is an async process
const initServer = async () => {
  console.log("Building GraphQL server");
  return await neoSchema.getSchema();
};

// Note the use of the top-level await here in the call to initServer()
const { handleRequest } = createYoga({
  schema: initServer(),
  graphqlEndpoint: "/graphqlServer",
  fetchAPI: { Response },
  context: async ({ request }) => ({ token: request.headers.get('Authorization') }),
});

export { handleRequest as GET, handleRequest as POST }
