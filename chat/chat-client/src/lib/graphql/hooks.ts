import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
  addMessageMutation,
  messagesQuery,
  messageAddedSubscription,
} from './queries';

export function useAddMessage() {
  const [mutate] = useMutation(addMessageMutation);

  const addMessage = async (text: string) => {
    const {
      data: { message },
    } = await mutate({
      variables: { text },
    });
    return message;
  };
  return { addMessage };
}

export function useMessages() {
  const { data } = useQuery(messagesQuery);
  useSubscription(messageAddedSubscription, {
    onData: ({ client, data }) => {
      console.log('[onData] data', data);
      const newMessage = data.data.message;
      client.cache.updateQuery({ query: messagesQuery }, (oldData) => {
        return { messages: [...oldData.messages, newMessage] };
      });
    },
  });
  return {
    messages: data?.messages ?? [],
  };
}
