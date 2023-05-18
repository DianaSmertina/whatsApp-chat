import styles from './ChatSpace.module.scss';
import { MessageInput } from './MessageInput/MessageInput';
import { MessageBlock } from './MessagesBlock/MessageBlock';

export function ChatSpace() {
  return (
    <div className={styles.chat_space}>
      <MessageBlock />
      <MessageInput />
    </div>
  );
}
