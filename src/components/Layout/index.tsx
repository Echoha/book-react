import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps, Space } from "antd";
import { Layout as AntdLayout, Breadcrumb, Dropdown, Menu } from "antd";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

import styles from "./index.module.css";

const { Header, Content, Sider } = AntdLayout;

const ITEMS = [
  {
    // icon: React.createElement(icon),
    label: "图书管理",
    key: "book",

    children: [
      { label: "图书列表", key: "/book" },
      { label: "图书添加", key: "/book/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "借阅管理",
    key: "borrow",

    children: [
      { label: "借阅列表", key: "/borrow" },
      { label: "借阅添加", key: "/borrow/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "分类管理",
    key: "category",

    children: [
      { label: "分类列表", key: "/category" },
      { label: "分类添加", key: "/category/add" },
    ],
  },
  {
    // icon: React.createElement(icon),
    label: "用户管理",
    key: "user",

    children: [
      { label: "用户列表", key: "/user" },
      { label: "用户添加", key: "/user/add" },
    ],
  },
];

const USER_ITEMS: MenuProps["items"] = [
  {
    label: "用户中心",
    key: "1",
  },
  {
    label: "登出",
    key: "2",
  },
];

// export function Layout({ children }: { children: ReactNode }) {
export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };
  const activeMenu = router.pathname;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <AntdLayout>
          <Header className={styles.header}>
            <Image
              src="/logo.svg"
              width={30}
              height={30}
              alt="logo"
              className={styles.logo}
            />
            三木图书管理系统
            <span className={styles.user}>
              <Dropdown menu={{ items: USER_ITEMS }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    用户名
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </span>
          </Header>
          <AntdLayout className={styles.sectionInner}>
            <Sider width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["/book"]}
                defaultOpenKeys={["book"]}
                selectedKeys={[activeMenu]}
                style={{ height: "100%", borderRight: 0 }}
                items={ITEMS}
                onClick={handleMenuClick}
              />
            </Sider>
            <AntdLayout className={styles.sectionContent}>
              <Content className={styles.content}>{children}</Content>
            </AntdLayout>
          </AntdLayout>
        </AntdLayout>
      </main>
    </>
  );
};
