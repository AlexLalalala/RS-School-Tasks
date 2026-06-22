import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/index.css';
import type { Metadata, Viewport } from 'next';
import Providers from '@/Providers';
import NavigationBar from '@components/NavigationBar';
import Flyout from '@components/Flyout';

export const metadata: Metadata = {
  title: 'Steam Deal Search',
  description: 'Task for React course from RS School',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Providers>
            <NavigationBar />
            {children}
            <Flyout />
          </Providers>
        </div>
      </body>
    </html>
  );
}
