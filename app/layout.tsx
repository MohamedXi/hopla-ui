import * as React from 'react';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

export const metadata = {
  title: 'Hopla UI',
  description: 'Bibliothèque de composants React moderne et accessible',
};

const banner = <Banner storageKey="hopla-ui-banner">Hopla UI - Bibliothèque de composants React</Banner>;

const navbar = (
  <Navbar 
    logo={<span style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>Hopla UI</span>}
  />
);

const footer = <Footer>MIT {new Date().getFullYear()} © Hopla UI.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" content="Hopla UI: Documentation" />
      </Head>
      <body>
        <Layout 
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
