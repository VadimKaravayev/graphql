type MessageInputProps = {
  onSend: (text: string) => void;
};

function MessageInput({ onSend }: MessageInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSend(e.currentTarget.value);
      e.currentTarget.value = '';
    }
  };

  return (
    <div className="box has-background-white">
      <input
        type="text"
        className="input has-background-white has-text-dark"
        placeholder="Say someting..."
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default MessageInput;
