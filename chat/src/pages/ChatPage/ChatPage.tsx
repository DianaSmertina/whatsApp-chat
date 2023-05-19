import styles from './ChatPage.module.scss';
import { useSelector } from 'react-redux';
import { CreateNewChat } from '../../components/Chat/CreateNewChat/CreateNewChat';
import { RootState } from '../../redux/store';
import { ChatSpace } from '../../components/Chat/ChatSpace/ChatSpace';
import { ToastContainer } from 'react-toastify';

export function ChatPage() {
  const chatId = useSelector((state: RootState) => state.chat.chatId);

  return (
    <main className={styles.main}>
      <ToastContainer />
      <div className={styles.container}>
        <CreateNewChat />
        {chatId && <ChatSpace />}
      </div>
    </main>
  );
}
