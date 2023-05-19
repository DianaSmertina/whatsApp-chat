import styles from './MessageBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { addMessage } from '../../../../redux/store/chatSlice';

interface Notification {
  receiptId: number;
  body: Reply;
}

interface Reply {
  idMessage: string;
  instanceData: object;
  messageData: { typeMessage: string; textMessageData: { textMessage: string } };
  senderData: object;
  timestamp: number;
  typeWebhook: string;
}

export function MessageBlock() {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const idInstance = useSelector((state: RootState) => state.user.idInstance);
  const apiTokenInstance = useSelector((state: RootState) => state.user.apiTokenInstance);
  const dispatch = useDispatch();

  useEffect(() => {
    const myFunction = async () => {
      if (idInstance && apiTokenInstance) {
        fetch(
          `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
        )
          .then((response) => response.json())
          .then((data: Notification) => {
            if (data.receiptId) {
              fetch(
                `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data.receiptId}`,
                {
                  method: 'DELETE',
                }
              ).then((response) => {
                if (!response.ok) {
                  throw new Error('Request failed');
                }
                if (data.body.typeWebhook === 'incomingMessageReceived') {
                  dispatch(
                    addMessage({
                      isSenderMe: false,
                      text: data.body.messageData.textMessageData.textMessage,
                    })
                  );
                } else {
                  myFunction();
                }
              });
            } else return;
          });
      }
    };

    const interval = setInterval(myFunction, 5000);
    return () => clearInterval(interval);
  }, [messages]);

  return (
    <div className={styles.message_block}>
      {messages.map((el, i) => {
        return (
          <div
            className={`${el.isSenderMe ? styles.container_my : styles.container_reply} ${
              styles.message_container
            }`}
            key={i}
          >
            <div
              className={`${el.isSenderMe ? styles.my_message : styles.reply_message} ${
                styles.message
              }`}
            >
              {el.text}
            </div>
          </div>
        );
      })}
    </div>
  );
}
