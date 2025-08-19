import gql from 'graphql-tag'

export default gql`
  type User {
    id: ID
    name: String!
    email: String!
    company: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User
    token: String
  }

  type Mutation {
    mutationTest(test: Boolean): Boolean
    login(email: String!, password: String!): LoginResponse!
  }
`
