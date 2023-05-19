import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './MessageInput.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../../../redux/store/chatSlice';
import { sendMessage } from '../../../../api/apiRequests';
import { RootState } from '../../../../redux/store';
import { toast } from 'react-toastify';

export function MessageInput() {
  const {
    register,
    formState: {},
    handleSubmit,
    reset,
  } = useForm<{ message: string }>({ mode: 'onSubmit' });
  const dispatch = useDispatch();
  const idInstance = useSelector((state: RootState) => state.user.idInstance);
  const apiTokenInstance = useSelector((state: RootState) => state.user.apiTokenInstance);
  const chatId = useSelector((state: RootState) => state.chat.chatId);

  const onSubmit: SubmitHandler<{ message: string }> = async (data) => {
    if (idInstance && apiTokenInstance && chatId) {
      const result = await sendMessage(idInstance, apiTokenInstance, {
        chatId: chatId,
        message: data.message,
      });
      if (typeof result === 'string' && result.split(':')[0] === '466') {
        toast.error('invalid number');
      } else if (typeof result === 'string') {
        toast.error(result);
      }
      dispatch(addMessage({ isSenderMe: true, text: data.message }));
      reset();
    }
  };

  return (
    <div className={styles.message_input}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input_text}
          placeholder="Enter message"
          {...register('message', {
            required: true,
          })}
        ></input>
        <input type="submit" value="" className={styles.send}></input>
      </form>
    </div>
  );
}
