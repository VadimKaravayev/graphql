import { useEffect, useRef } from 'react';
import type { User, Message } from '../types';

type MessageListPros = {
  user: User;
  messages: Message[];
};

function MessageList({ user, messages }: MessageListPros) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="box has-background-white"
      style={{ height: '50vh', overflowY: 'scroll' }}
    >
      <table>
        <tbody>
          {messages.map((message) => (
            <MessageRow key={message.id} user={user} message={message} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
type MessageRowProps = {
  user: User;
  message: Message;
};
function MessageRow({ user, message }: MessageRowProps) {
  return (
    <tr>
      <td className="py-1">
        <span className={message.user === user ? 'tag is-primary' : 'tag'}>
          {message.user}
        </span>
      </td>
      <td className="pl-4 py-1">{message.text}</td>
    </tr>
  );
}

export default MessageList;
