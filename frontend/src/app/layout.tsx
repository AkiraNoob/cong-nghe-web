import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from '~/context/UserContext';
import ThemeRegistry from '~/theme/ThemeRegistry';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeRegistry>
            <UserContextProvider>{children}</UserContextProvider>
          </ThemeRegistry>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
