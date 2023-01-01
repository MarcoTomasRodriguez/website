import Head from "next/head";
import type { ReactNode } from "react";

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
      <div style={{ overflowX: "hidden" }}>
        {header}
        {children}
      </div>
    </>
  );
};

export default Layout;
