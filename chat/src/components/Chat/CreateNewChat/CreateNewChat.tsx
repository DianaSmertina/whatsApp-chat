import styles from './CreateNewChat.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { clearMessages, setRecipient } from '../../../redux/store/chatSlice';

export function CreateNewChat() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ phone: string }>({ mode: 'onChange' });
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<{ phone: string }> = (data) => {
    const chatId = data.phone + '@c.us';
    dispatch(
      setRecipient({
        chatId: chatId,
      })
    );
    dispatch(clearMessages());
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input
          className={styles.input_text}
          placeholder="Phone number"
          {...register('phone', {
            required: true,
            pattern: /^\d+$/,
          })}
        ></input>
        <input type="submit" value="" className={styles.submit}></input>
      </form>
      {errors.phone && (
        <div className={styles.error}>
          Enter phone number with country code, no spaces or other characters
        </div>
      )}
    </div>
  );
}
