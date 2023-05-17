import styles from './WelcomeForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

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

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
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
