import type { User } from '../types';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { useMessages, useAddMessage } from '../lib/graphql/hooks';

type ChatProps = {
  user: User;
};

function Chat({ user }: ChatProps) {
  const { messages } = useMessages();
  const { addMessage } = useAddMessage();

  const handleSend = async (text: string) => {
    const message = await addMessage(text);
    console.log('Messaged added', message);
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title is-4 has-text-dark">{`Chatting as ${user}`}</h1>
        <MessageList user={user} messages={messages} />
        <MessageInput onSend={handleSend} />
      </div>
    </section>
  );
}

export default Chat;
