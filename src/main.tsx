import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { PaymentResultPage } from './components/PaymentResultPage.tsx';
import './index.css';

const paymentPath = window.location.pathname;
const screen = paymentPath === '/payment/return'
  ? <PaymentResultPage />
  : paymentPath === '/payment/cancel'
    ? <PaymentResultPage cancelled />
    : <App />;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {screen}
  </StrictMode>,
);
