export const CREATE_USER = `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      name
      locality
      role
    }
  }
`;

export const GET_USER = `
  query GetUser($id: String!) {
    user(id: $id) {
      id
      email
      name
      locality
      role
      activities {
        id
        name
      }
    }
  }
`;

export const CREATE_ACTIVITY = `
  mutation CreateActivity($input: CreateActivityInput!) {
    createActivity(input: $input) {
      id
      type
      name
      location
      startDate
      user {
        id
        name
      }
    }
  }
`;

export const GET_ACTIVITY = `
  query GetActivity($id: String!) {
    activity(id: $id) {
      id
      name
      type
      location
      user {
        id
        name
      }
    }
  }
`; 