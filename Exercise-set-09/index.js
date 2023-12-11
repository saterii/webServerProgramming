const { ApolloServer } = require('@apollo/server')
const AlbumAPI = require("./datasources/AlbumAPI")
const { startStandaloneServer } = require('@apollo/server/standalone')


const typeDefs = `#graphql
  type Album {
    _id: ID!,
    artist: String!,
    title: String,
    year: Int,
    genre: String!
  }
  type Query {
    albums: [Album]
  }
  type Mutation {
    removeAlbum(albumId: ID!): Boolean
  }
`

const resolvers = {
  Query: {
    albums: (_parent, _args, { dataSources }) => {
      return dataSources.albumApi.getAlbums()
    }
  },
  Mutation: {
    removeAlbum: (_parent, { albumId }, { dataSources }) => {
      return dataSources.albumApi.removeAlbum(albumId);
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const start = async () => { 
  const { url } = await startStandaloneServer(server, {
    context: async () => {
      return {
        dataSources: {
          albumApi: new AlbumAPI(),
        }
      }
    }
  })
  console.log(`Server running at ${url}`)
}
start()
