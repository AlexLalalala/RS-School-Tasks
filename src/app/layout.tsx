import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NextJS',
  description: 'Task for React course from RS School',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Steam Deal Search</title>
      </head>
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
