import "./App.css";
import { Button, Input, Select, Space } from "antd";
import React, { useState } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

function QuestionInput({
  type,
  questionDetails,
  setQuestionDetails,
}: {
  type: string;
  questionDetails: any;
  setQuestionDetails: (value: any) => void;
}) {
  const [choices, setChoices] = useState([""]);
  console.log(questionDetails)
  switch (type) {
    case "MultipleChoice":
    case "YesNo":
      return (
        <>
          <Input
            style={{ borderRadius: "5px" }}
            placeholder="Type here"
            size="large"
            onChange={(e) => {
              setQuestionDetails({
                ...questionDetails,
                question: e.target.value,
                type,
              });
            }}
          />
          <Title style={{ fontSize: "12px", paddingLeft: "30px" }}>
            Choice
          </Title>
          {choices.map((choice, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}
              >
                <Button type="text" icon={<PlusOutlined />} />
                <Input
                  style={{ borderRadius: "5px" }}
                  placeholder="Type here"
                  size="large"
                  onChange={(e) => {
                    choices[index] = e.target.value
                    questionDetails.choices = choices
                  }}
                />
                <Button
                  type="text"
                  onClick={() => setChoices([...choices, ""])}
                  icon={<PlusOutlined />}
                />
              </div>
            );
          })}
        </>
      );
    default:
      return (
        <Input
          style={{ borderRadius: "5px" }}
          placeholder="Type here"
          size="large"
          onChange={(e) => {
            setQuestionDetails({
              ...questionDetails,
              question: e.target.value,
              type,
            });
          }}
        />
      );
  }
}

function CreateQuestion({
  AddQuestion,
  setAddQuestion,
}: {
  AddQuestion: (value: any) => void;
  setAddQuestion: (value: boolean) => void;
}) {
  const [selectedType, setSelectedType] = useState<string>("Paragraph");
  const [questionDetails, setQuestionDetails] = useState({
    choices: [],
    disqualify: false,
    // id : "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    maxChoice: 0,
    other: false,
    question: "",
    type: "Paragraph",
  });

  const onChange = (value: string) => {
    setSelectedType(value);
  };

  return (
    <div style={{ margin: "24px 0" }}>
      <>
        <Title style={{ fontSize: "12px" }}>Type</Title>
        <Select
          showSearch
          size={"large"}
          style={{ width: "100%" }}
          optionFilterProp="children"
          onChange={onChange}
          filterOption={filterOption}
          options={[
            {
              value: "Paragraph",
              label: "Paragraph",
            },
            {
              value: "ShortAnswer",
              label: "Short answer",
            },
            {
              value: "YesNo",
              label: "Yes/No",
            },
            {
              value: "Dropdown",
              label: "Dropdown",
            },
            {
              value: "MultipleChoice",
              label: "Multiple choice",
            },
            {
              value: "Date",
              label: "Date",
            },
            {
              value: "Number",
              label: "Number",
            },
            {
              value: "FileUpload",
              label: "File upload",
            },
            {
              value: "Video",
              label: "Video question",
            },
          ]}
        />
      </>
      <>
        <Title style={{ fontSize: "12px" }}>Question</Title>
        <QuestionInput
          type={selectedType}
          questionDetails={questionDetails}
          setQuestionDetails={setQuestionDetails}
        />
      </>

      <Space
        wrap
        style={{
          justifyContent: "space-between",
          width: "100%",
          marginTop: "36px",
        }}
      >
        <Button danger icon={<CloseOutlined />} type="text" onClick={() => setAddQuestion(false)}>
          Delete Question
        </Button>
        <Button
          type="primary"
          style={{backgroundColor: "#087B2F"}}
          onClick={() => {
            AddQuestion(questionDetails);
            setAddQuestion(false);
          }}
        >
          Save
        </Button>
      </Space>
    </div>
  );
}

export default CreateQuestion;
