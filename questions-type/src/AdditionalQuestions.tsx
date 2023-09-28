import "./App.css";
import React from "react";
import { Card } from "antd";
import { Data } from "./Form";
import Questions from "./Questions";

function AdditionalQuestions({
  data,
}: {
  data?: Data;
}) {
  const customisedQuestions = data?.attributes?.customisedQuestions;

  const createQuestion = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          ...data,
          attributes: {
            ...data?.attributes,
            customisedQuestions,
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
      title="Additional questions"
      style={{ minWidth: 500 }}
      headStyle={{ background: "#D0F7FA", textAlign: "start" }}
    >
      <Questions
        createQuestion={createQuestion}
        questions={customisedQuestions}
      />
    </Card>
  );
}

export default AdditionalQuestions;
