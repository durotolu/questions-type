import "./App.css";
import { Button, Divider, Input, Select, Space, Tooltip } from "antd";
import React, { useState } from "react";
import { PlusOutlined, EditOutlined, CloseOutlined } from "@ant-design/icons";
import CreateQuestion from "./CreateQuestion";
import Title from "antd/es/typography/Title";

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

function QuestionEdit({ question }: { question: any }) {
  const [choices, setChoices] = useState(question.choices);
  switch (question.type) {
    case "MultipleChoice":
    case "YesNo":
      return (
        <>
          <Input
            style={{ borderRadius: "5px" }}
            placeholder="Type here"
            size="large"
            value={question.question}
            onChange={(e) => {
              question.question = e.target.value;
            }}
          />
          <Title style={{ fontSize: "12px", paddingLeft: "30px" }}>
            Choice
          </Title>

          {choices.map(
            (
              choice: string | number | readonly string[] | undefined,
              index: number
            ) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <Button type="text" icon={<PlusOutlined />} />
                  <Input
                    style={{ borderRadius: "5px" }}
                    placeholder="Type here"
                    defaultValue={choice}
                    size="large"
                    onChange={(e) => {
                      choices[index] = e.target.value;
                    }}
                  />
                  <Button
                    type="text"
                    onClick={() => {
                      setChoices((prev: Array<string>) => [...prev, ""]);
                    }}
                    icon={<PlusOutlined />}
                  />
                </div>
              );
            }
          )}
        </>
      );
    default:
      return (
        <Input
          style={{ borderRadius: "5px" }}
          defaultValue={question.question}
          placeholder="Type here"
          size="large"
          onChange={(e) => {
            question.question = e.target.value;
          }}
        />
      );
  }
}

function Question({
  question,
  createQuestion,
}: {
  question: any;
  createQuestion: () => void;
}) {
  const [questionHolder, setQuestionHolder] = useState<any>();
  const [edit, setEdit] = useState<boolean>(false);

  const onChange = (value: string) => (question.type = value);

  return (
    <div>
      <>
        {!edit ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={{
                  fontWeight: "normal",
                  color: "#979797",
                  fontSize: "12px",
                  margin: "0",
                }}
              >
                {question.type}
              </p>
              <p style={{ margin: "0", maxWidth: "300px" }}>
                {question.question}
              </p>
            </div>
            <Tooltip title="edit">
              <Button
                type="text"
                shape="circle"
                onClick={() => {
                  setQuestionHolder({...question})
                  setEdit(!edit);
                }}
                icon={<EditOutlined />}
              />
            </Tooltip>
          </div>
        ) : (
          <>
            <Title style={{ fontSize: "12px" }}>Type</Title>
            <Select
              showSearch
              size={"large"}
              style={{ width: "100%", marginBottom: "12px" }}
              optionFilterProp="children"
              onChange={onChange}
              defaultValue={question.type}
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
            <QuestionEdit question={question} />
            <Space
              wrap
              style={{
                width: "100%",
                justifyContent: "space-between",
                marginTop: "12px",
              }}
            >
              <Button
                danger
                icon={<CloseOutlined />}
                type="text"
                onClick={() => {
                  question.question = questionHolder?.question
                  question.choices = questionHolder?.choices
                  question.type = questionHolder?.type
                  question.disqualify = questionHolder?.disqualify
                  question.maxChoice = questionHolder?.maxChoice
                  question.other = questionHolder?.other
                  setEdit(false);
                }}
              >
                Delete Question
              </Button>
              <Button
                type="primary"
                style={{ backgroundColor: "#087B2F" }}
                onClick={() => {
                  createQuestion();
                  setEdit(false);
                }}
              >
                Save
              </Button>
            </Space>
          </>
        )}
      </>
      <Divider />
    </div>
  );
}

function Questions({
  createQuestion,
  questions,
}: {
  createQuestion: () => void;
  questions?: Array<any>;
}) {
  const [addQuestion, setAddQuestion] = useState<boolean>(false);

  const AddQuestion = (questionDetails: any) => {
    let questionsState = questions;
    questionsState?.push(questionDetails);
    questions = questionsState;
    createQuestion();
  };

  return (
    <div>
      {questions?.map((question, index) => (
        <Question
          question={question}
          key={index}
          createQuestion={createQuestion}
        />
      ))}

      {addQuestion ? (
        <CreateQuestion
          setAddQuestion={setAddQuestion}
          AddQuestion={AddQuestion}
        />
      ) : (
        <Button
          style={{
            paddingLeft: "0",
            fontWeight: "bold",
            marginTop: "36px",
            color: "green",
          }}
          type="text"
          icon={<PlusOutlined style={{ fontWeight: "bold" }} />}
          onClick={() => setAddQuestion(true)}
        >
          Add a question
        </Button>
      )}
    </div>
  );
}

export default Questions;
