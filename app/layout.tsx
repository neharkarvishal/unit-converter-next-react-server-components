import './globals.css';
import Header from 'components/header';
import Footer from 'components/footer';

export const metadata = {
  title: 'Unit Converter React Server Components Demo',
  description: 'Unit Converter',
  themeColor: '#ffa52a',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Header />

          <div className="page">
            {children}

            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}
