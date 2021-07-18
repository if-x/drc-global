import * as React from "react";
import { FAQS } from "../../../../constants/elements";
import { DR_FAQ_QUESTIONS } from "../../../../data/content/dr-faq-questions";
import QuestionAndAnswer from "../../../ui-library/question-and-answer/question-and-answer";
import Separator from "../../../ui-library/separator/separator";

const DrFaqs: React.FC = () => {
  return (
    <div id={FAQS}>
      {DR_FAQ_QUESTIONS.map(({ id, question, answer }, index) => (
        <React.Fragment key={question}>
          <Separator />
          <QuestionAndAnswer
            id={id}
            question={question}
            answer={answer}
            isDefaultOpen={index === 0}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default DrFaqs;
