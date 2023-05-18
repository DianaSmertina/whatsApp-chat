import styles from './CreateNewChat.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setRecipient } from '../../../redux/store/chatSlice';

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
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Phone number"
          {...register('phone', {
            required: true,
            pattern: /^\d+$/,
          })}
        ></input>
        {errors.phone && (
          <div>Enter phone number with country code, no spaces or other characters</div>
        )}
        <input type="submit" value="Find user"></input>
      </form>
    </div>
  );
}
