import "./App.css";
import { useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import type { MenuProps } from "antd";
import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import PersonalInformation from "./PersonalInformation";
import CoverImage from "./CoverImage";
import Profile from "./Profile";
import AdditionalQuestions from "./AdditionalQuestions";

const { Header, Content, Sider } = Layout;

const getApi =
  "http://127.0.0.1:4010/api/654.555531846718/programs/ut/application-form";

const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

type InformationDetail = {
  internalUse: boolean,
  show: boolean
};

type ProfileInformationDetail = {
  mandatory: boolean,
  show: boolean
};

export type PersonalInformationDetail = {
  currentResidence: InformationDetail,
  dateOfBirth: InformationDetail,
  emailId: InformationDetail,
  firstName: InformationDetail,
  gender: InformationDetail,
  idNumber: InformationDetail,
  lastName: InformationDetail,
  nationality: InformationDetail,
  phoneNumber: InformationDetail,
};

export type ProfileDetail = {
  education: ProfileInformationDetail,
  experience: ProfileInformationDetail,
  resume: ProfileInformationDetail,
};

export interface PersonalInformationQuestionsDetail extends PersonalInformationDetail {
  personalQuestions: Array<Object>, 
};

export interface ProfilenQuestionsDetail extends ProfileDetail {
  profileQuestions: Array<Object>, 
};

type Attributes = {
  coverImage: string, 
  customisedQuestions: Array<Object>, 
  personalInformation: PersonalInformationQuestionsDetail, 
  profile: ProfilenQuestionsDetail, 
};

export type Data = {
  attributes: Attributes,
  id: string, 
  type: string,
};

function Form() {
  const [data, setData] = useState<Data>();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const fetchUserData = () => {
    fetch(getApi)
      .then((response) => {
        return response.json();
      })
      .then(({ data }) => {
        setData(data);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="App">
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            items={items1}
          />
        </Header>
        <Layout>
          <Sider width={200} style={{ background: colorBgContainer }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Space
                direction="vertical"
                size={16}
                style={{ textAlign: "start", fontWeight: "bold" }}
              >
                <CoverImage coverImage={data?.attributes?.coverImage} />
                <PersonalInformation data={data} setData={setData} />
                <Profile data={data} setData={setData} />
                <AdditionalQuestions data={data} />
              </Space>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default Form;
