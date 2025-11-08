// src/app/layout.js
import ClientLayout from './ClientLayout';
import './globals.css';

export const metadata = {
  title: 'Dream Forge Foundation',
  description: 'NGO Project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}