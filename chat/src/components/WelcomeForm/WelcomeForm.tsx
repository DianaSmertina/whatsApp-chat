import styles from './WelcomeForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAccountStatus } from '../../api/apiRequests';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/store/userSlice';

interface FormFields {
  idInstance: string;
  apiTokenInstance: string;
}

export function WelcomeForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    mode: 'onSubmit',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const accountStatus = await getAccountStatus(data.idInstance, data.apiTokenInstance);
    if (!accountStatus || typeof accountStatus === 'string') {
      toast.error(accountStatus);
    } else if (accountStatus.stateInstance != 'authorized') {
      toast.error(accountStatus.stateInstance);
    } else if (accountStatus.stateInstance === 'authorized') {
      dispatch(
        setUser({
          idInstance: data.idInstance,
          apiTokenInstance: data.apiTokenInstance,
        })
      );
      navigate('/chat');
    }
  };

  return (
    <div className={styles.form_container}>
      <div className={styles.headers_block}>
        <h1>Welcome to WhatsApp chat</h1>
        <h2>To continue enter your idInstance and apiTokenInstance</h2>
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={styles.text_input}
          placeholder="idInstance"
          {...register('idInstance', {
            required: true,
          })}
        />
        {errors.idInstance && <div className={styles.error}>Please enter the idInstance</div>}
        <input
          className={styles.text_input}
          placeholder="apiTokenInstance"
          {...register('apiTokenInstance', {
            required: true,
          })}
        ></input>
        {errors.apiTokenInstance && (
          <div className={styles.error}>Please enter the apiTokenInstance</div>
        )}
        <input type="submit" value="Submit" className="button"></input>
      </form>
    </div>
  );
}
