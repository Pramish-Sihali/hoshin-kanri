import type { Metadata } from 'next';
import './globals.css';
import AuthProvider from '../components/AuthProvider';
// import { Poppins } from 'next/font/google';
// import { Roboto } from 'next/font/google';
// import { Open_Sans } from 'next/font/google';
import { Nunito } from 'next/font/google';


// const poppins = Poppins({ 
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
//   display: 'swap',
// });

// const opensans = Open_Sans({ 
//   subsets: ['latin'],
//   display: 'swap',
// });

const nunito = Nunito({ 
  subsets: ['latin'],
  display: 'swap',
});

// const roboto = Roboto({ 
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '700'],
//   display: 'swap',
// });

export const metadata: Metadata = {
  title: 'Strategic Policy Deployment',
  description: 'Strategic policy deployment application using Hoshin Kanri principles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}