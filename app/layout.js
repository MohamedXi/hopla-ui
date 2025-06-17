import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

export const metadata = {
  title: 'Hopla UI',
  description: 'Bibliothèque de composants React moderne et accessible',
};

const navbar = (
  <Navbar
    logo={<b>Hopla UI</b>}
  />
);

const footer = <Footer>© {new Date().getFullYear()} Hopla UI. Tous droits réservés.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html lang="fr" dir="ltr" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:title" content="Hopla UI: Documentation" />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/yourusername/hopla-ui/blob/main"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
