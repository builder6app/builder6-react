import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://unpkg.com/amis@6.5.0/sdk/sdk.js" />
        <link rel="stylesheet" href="https://unpkg.com/amis@6.5.0/sdk/sdk.css" />
        <link rel="stylesheet" href="https://unpkg.com/amis@6.5.0/sdk/helper.css" />
        <link rel="stylesheet" href="https://unpkg.com/amis@6.5.0/sdk/iconfont.css" />        
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
