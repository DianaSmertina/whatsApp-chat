import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './MessageInput.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../../redux/store/chatSlice';
import { sendMessage } from '../../../../api/apiRequests';
import { RootState } from '../../../../redux/store';

export function MessageInput() {
  const {
    register,
    formState: {},
    handleSubmit,
  } = useForm<{ message: string }>({ mode: 'onSubmit' });
  const dispatch = useDispatch();
  const idInstance = useSelector((state: RootState) => state.user.idInstance);
  const apiTokenInstance = useSelector((state: RootState) => state.user.apiTokenInstance);
  const chatId = useSelector((state: RootState) => state.chat.chatId);

  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    if (idInstance && apiTokenInstance && chatId) {
      await sendMessage(idInstance, apiTokenInstance, {
        chatId: chatId,
        message: data.message,
      });
      dispatch(addMessage({ isSenderMe: true, text: data.message }));
    }
  };

  return (
    <div className={styles.message_input}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Enter message"
          {...register('message', {
            required: true,
          })}
        ></input>
        <input type="submit" value="Send"></input>
      </form>
    </div>
  );
}
