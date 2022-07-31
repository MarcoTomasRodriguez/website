import { ReactNode } from "react";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

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
      </Head>
      {header}
      {children}
    </>
  );
};

export default Layout;
