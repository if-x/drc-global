import * as React from "react";
import { FAQ } from "../../../../types/faq";
import { Language } from "../../../../types/language";
import { FAQ_QUESTIONS_EN } from "../../../data/content/faq-questions-en";
import { FAQ_QUESTIONS_ZH } from "../../../data/content/faq-questions-zh";
import PageHeading from "../../modules/page-heading/page-heading";
import TopLogo from "../../modules/top-logo/top-logo";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import Separator from "../../ui-library/separator/separator";
import QuestionAndAnswer from "../../ui-library/question-and-answer/question-and-answer";

const FAQContentByLang: Record<Language, FAQ[]> = {
  en: FAQ_QUESTIONS_EN,
  zh: FAQ_QUESTIONS_ZH,
};

interface FAQsProps {
  lang?: Language;
}

const FAQs: React.FC<FAQsProps> = ({ lang = "en" }) => {
  const FAQContent = FAQContentByLang[lang];

  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(4) }, mobile: { bottom: grid(2) } }}
      >
        <PageHeading />
      </MarginBox>

      <TopLogo />

      {FAQContent.map(({ question, answer }, index) => (
        <React.Fragment key={question}>
          {index > 0 && <Separator />}

          <QuestionAndAnswer
            question={question}
            answer={answer}
            isDefaultOpen={index === 0}
          />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default FAQs;
