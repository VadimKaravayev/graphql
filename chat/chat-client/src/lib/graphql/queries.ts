import { gql } from '@apollo/client';

export const messagesQuery = gql`
  query MessageQuery {
    messages {
      id
      user
      text
    }
  }
`;

export const addMessageMutation = gql`
  mutation AddMessageMutation($text: String!) {
    message: addMessage(text: $text) {
      id
      user
      text
    }
  }
`;

export const messageAddedSubscription = gql`
  subscription MessagedAddedSubscription {
    message: messageAdded {
      id
      user
      text
    }
  }
`;
