import { ToastContainer } from 'react-toastify';
import { WelcomeForm } from '../../components/WelcomeForm/WelcomeForm';

export function WelcomePage() {
  return (
    <main>
      <ToastContainer />
      <WelcomeForm />
    </main>
  );
}
