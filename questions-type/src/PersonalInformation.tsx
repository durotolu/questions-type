import "./App.css";
import { Checkbox, Divider, Switch } from "antd";
import React from "react";
import { Card, Space } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { Data, PersonalInformationDetail } from "./Form";
import Questions from "./Questions";

const infoTitles = [
  {
    title: "Phone",
    value: "phoneNumber",
  },
  {
    title: "Nationality",
    value: "nationality",
  },
  {
    title: "Current Residence",
    value: "currentResidence",
  },
  {
    title: "ID Number",
    value: "idNumber",
  },
  {
    title: "Date of Birth",
    value: "dateOfBirth",
  },
  {
    title: "Gender",
    value: "gender",
  },
];

function PersonalInformation({
  data,
  setData,
}: {
  data?: Data;
  setData: (value: Data) => void;
}) {
  const personalInformation = data?.attributes?.personalInformation;

  const onChange = (e: CheckboxChangeEvent, value: string) => {
    const dataState = data;
    if (dataState) {
      dataState.attributes.personalInformation[
        value as keyof PersonalInformationDetail
      ].internalUse = e.target.checked;
      setData({ ...dataState });
    }
    createQuestion();
  };
  const onSwitch = (checked: boolean, value: string) => {
    const dataState = data;
    if (dataState) {
      dataState.attributes.personalInformation[
        value as keyof PersonalInformationDetail
      ].show = checked;
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
            personalInformation,
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
      title="Personal Information"
      style={{ minWidth: 500, boxShadow: "3px 3px 14px 0px rgba(190, 190, 190, 0.30)" }}
      headStyle={{ background: "#D0F7FA", textAlign: "start" }}
    >
      <div>
        <p style={{ margin: "0" }}>First Name</p>
      </div>
      <Divider />
      <div>
        <p style={{ margin: "0" }}>Last Name</p>
      </div>
      <Divider />
      <div>
        <p style={{ margin: "0" }}>Email</p>
      </div>

      {infoTitles.map(({ title, value }) => (
        <div key={value}>
          <Divider />
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
                checked={
                  personalInformation?.[
                    value as keyof PersonalInformationDetail
                  ].internalUse
                }
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
                  checked={
                    personalInformation?.[
                      value as keyof PersonalInformationDetail
                    ].show
                  }
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
        </div>
      ))}
      <Divider />
      <Questions
        createQuestion={createQuestion}
        questions={personalInformation?.personalQuestions}
      />
    </Card>
  );
}

export default PersonalInformation;
