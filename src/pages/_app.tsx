// Import Next/Redux
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { SpeedInsights } from '@vercel/speed-insights/next';

// Style Global
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <SpeedInsights />
    </Provider>
  );
}
