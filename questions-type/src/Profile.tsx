import "./App.css";
import { Checkbox, Divider, Switch } from "antd";
import React from "react";
import { Card, Space } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Data, ProfileDetail } from "./Form";
import Questions from "./Questions";

const titles = [
  {
    title: "Education",
    value: "education",
  },
  {
    title: "Experience",
    value: "experience",
  },
  {
    title: "Resume",
    value: "resume",
  },
];

function Profile({
  data,
  setData,
}: {
  data?: Data;
  setData: (value: Data) => void;
}) {
  const profile = data?.attributes?.profile;

  const onChange = (e: CheckboxChangeEvent, value: string) => {
    const dataState = data;
    if (dataState) {
      dataState.attributes.profile[value as keyof ProfileDetail].mandatory =
        e.target.checked;
      setData({ ...dataState });
    }
    createQuestion();
  };
  const onSwitch = (checked: boolean, value: string) => {
    const dataState = data;
    if (dataState) {
      dataState.attributes.profile[value as keyof ProfileDetail].show = checked;
      setData({ ...dataState });
    }
    createQuestion();
  };

  const createQuestion = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          ...data,
          attributes: {
            ...data?.attributes,
            profile,
          },
        },
      }),
    };
    fetch(
      "http://127.0.0.1:4010/api/705.4721938053891/programs/aut/application-form",
      requestOptions
    ).then((data) => console.log(data));
  };

  return (
    <Card
      title="Profile"
      style={{ minWidth: 500 }}
      headStyle={{ background: "#D0F7FA", textAlign: "start" }}
    >
      {titles.map(({ title, value }) => (
        <div key={value}>
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ margin: "0" }}>
              <>
                {title}{" "}
                {title === "Phone" && (
                  <span style={{ fontWeight: "normal" }}>
                    (without dial code)
                  </span>
                )}
              </>
            </p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                style={{ fontWeight: "normal" }}
                checked={profile?.[value as keyof ProfileDetail].mandatory}
                onChange={(e) => onChange(e, value)}
              >
                Internal
              </Checkbox>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "24px",
                }}
              >
                <Switch
                  checked={profile?.[value as keyof ProfileDetail].show}
                  onChange={(checked) => onSwitch(checked, value)}
                />
                <p
                  style={{
                    fontWeight: "normal",
                    margin: "0",
                    paddingLeft: "16px",
                  }}
                >
                  Hide
                </p>
              </div>
            </div>
          </Space>
          {value !== "resume" && <Divider />}
        </div>
      ))}
      <Divider />
      <Questions
        createQuestion={createQuestion}
        questions={profile?.profileQuestions}
      />
    </Card>
  );
}

export default Profile;
