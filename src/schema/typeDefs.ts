import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String!
    subjects: [String!]!
    attendance: Int!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    token: String
  }

  # Pagination result type
  type EmployeePagination {
    docs: [Employee!]!
    totalDocs: Int!
    totalPages: Int!
    page: Int!
    limit: Int!
  }

  type Query {
    employees(
      page: Int
      limit: Int
      sortField: String
      sortOrder: Int
      filter: String
    ): EmployeePagination!

    employee(id: ID!): Employee
  }

  type Mutation {
    addEmployee(
      name: String!
      age: Int!
      class: String!
      subjects: [String!]!
      attendance: Int!
    ): Employee!

    updateEmployee(
      id: ID!
      name: String
      age: Int
      class: String
      subjects: [String!]
      attendance: Int
    ): Employee!

    register(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User!

    login(username: String!, password: String!): User!
  }
`;

export default typeDefs;
