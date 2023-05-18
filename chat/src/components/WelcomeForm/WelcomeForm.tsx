import styles from './WelcomeForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getAccountStatus } from '../../api/apiRequests';
import { useNavigate } from 'react-router-dom';

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

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const accountStatus = await getAccountStatus(data.idInstance, data.apiTokenInstance);
    if (!accountStatus || typeof accountStatus === 'string') {
      toast.error(accountStatus);
    } else if (accountStatus.stateInstance != 'authorized') {
      toast.error(accountStatus.stateInstance);
    } else if (accountStatus.stateInstance === 'authorized') {
      navigate('/chat');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <input
        placeholder="idInstance"
        {...register('idInstance', {
          required: true,
        })}
      />
      {errors.idInstance && <div className={styles.error}>Please enter the idInstance</div>}
      <input
        placeholder="apiTokenInstance"
        {...register('apiTokenInstance', {
          required: true,
        })}
      ></input>
      {errors.apiTokenInstance && (
        <div className={styles.error}>Please enter the apiTokenInstance</div>
      )}
      <input type="submit" value="Submit"></input>
    </form>
  );
}
