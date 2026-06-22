import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '@/index.css';
import type { Metadata, Viewport } from 'next';
import Providers from '@/Providers';
import NavigationBar from '@components/NavigationBar';
import Flyout from '@components/Flyout';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Steam Deal Search',
  description: 'Task for React course from RS School',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang="en">
      <body>
        <div id="root">
          <NextIntlClientProvider>
            <Providers>
              <NavigationBar />
              {children}
              <Flyout />
            </Providers>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
