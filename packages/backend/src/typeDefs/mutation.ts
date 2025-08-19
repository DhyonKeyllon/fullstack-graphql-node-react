import gql from 'graphql-tag'

export default gql`
  type User {
    name: String!
    email: String!
    company: String
  }

  type LoginResponse {
    success: Boolean!
    message: String!
    user: User
  }

  type Mutation {
    mutationTest(test: Boolean): Boolean
    login(email: String!, password: String!): LoginResponse!
  }
`
