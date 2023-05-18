import styles from './MessageBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect } from 'react';
import { deleteNotification, getNotification } from '../../../../api/apiRequests';
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
  const myMessages = useSelector((state: RootState) =>
    state.chat.messages.filter((el) => el.isSenderMe === true)
  );
  const isChatStarted = useSelector((state: RootState) => state.chat.isChatStarted);
  const idInstance = useSelector((state: RootState) => state.user.idInstance);
  const apiTokenInstance = useSelector((state: RootState) => state.user.apiTokenInstance);
  const dispatch = useDispatch();

  useEffect(() => {
    const myFunction = async () => {
      let response: string | Notification | undefined;
      if (idInstance && apiTokenInstance) {
        while ((response = await getNotification(idInstance, apiTokenInstance))) {
          if (
            typeof response === 'object' &&
            response.body.typeWebhook === 'incomingMessageReceived'
          ) {
            await deleteNotification(idInstance, apiTokenInstance, response.receiptId);
            dispatch(
              addMessage({
                isSenderMe: false,
                text: response.body.messageData.textMessageData.textMessage,
              })
            );
          }
          if (typeof response === 'object') {
            await deleteNotification(idInstance, apiTokenInstance, response.receiptId);
          }
        }
      }
    };

    // const myFunction = async () => {
    //   if (idInstance && apiTokenInstance) {
    //     fetch(
    //       `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
    //     )
    //       .then((response) => response.json())
    //       .then((data: Notification) => {
    //         if (data.receiptId) {
    //           fetch(
    //             `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${data.receiptId}`,
    //             {
    //               method: 'DELETE',
    //             }
    //           ).then((response) => {
    //             if (!response.ok) {
    //               throw new Error('Request failed');
    //             }
    //             if (data.body.typeWebhook === 'incomingMessageReceived') {
    //               dispatch(
    //                 addMessage({
    //                   isSenderMe: false,
    //                   text: data.body.messageData.textMessageData.textMessage,
    //                 })
    //               );
    //             }
    //           });
    //         }
    //       });
    //   }
    // };

    myFunction();
    // const interval = setInterval(myFunction, 20000);
    // return () => clearInterval(interval);
  }, [myMessages, isChatStarted]);

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
