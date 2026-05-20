import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';

export const metadata = {
  title: 'Imobiliare Market',
  description: 'Marketplace imobiliar construit cu Next.js si Laravel',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
