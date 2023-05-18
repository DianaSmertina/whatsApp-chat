import styles from './MessageBlock.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';

export function MessageBlock() {
  const messages = useSelector((state: RootState) => state.chat.messages);

  return (
    <div className={styles.message_block}>
      {messages.map((el, i) => {
        return (
          <div key={i} className={el.isSenderMe ? styles.me : styles.correspondent}>
            {el.text}
          </div>
        );
      })}
    </div>
  );
}
