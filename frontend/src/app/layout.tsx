import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContextProvider from '~/context/UserContext';
import ThemeRegistry from '~/theme/ThemeRegistry';
import './globals.css';
import Providers from './provider';

export const metadata: Metadata = {
  title: 'Codepro',
  description: 'Learn code to become pro',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
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
