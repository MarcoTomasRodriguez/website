import type { ReactNode } from "react";
import Head from "next/head";

type LayoutProps = {
  title: string;
  description: string;
  header: React.ReactElement;
  children: ReactNode;
};

const Layout = ({ title, description, header, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {header}
      {children}
    </>
  );
};

export default Layout;
