import * as React from "react";
import AnimateHeight from "react-animate-height";
import { FAQ } from "../../../../types/faq";
import { Theme } from "../../../../types/theme";
import { routingHistory } from "../../../utils/dom/history";
import AccordionHeading from "../accordion-heading/accordion-heading";
import { grid } from "../design-tokens/grid";
import styles from "./question-and-answer.styles";

interface QuestionAndAnswerProps extends FAQ {
  isDefaultOpen?: boolean;
}

const QuestionAndAnswer: React.FC<QuestionAndAnswerProps> = ({
  id,
  question,
  answer,
  isDefaultOpen,
}) => {
  const [isOpen, setOpen] = React.useState<boolean>(isDefaultOpen || false);

  React.useEffect(() => {
    const history = routingHistory();
    if (history) {
      const hash = history.location.hash;

      if (hash.startsWith("#")) {
        const element = hash.slice(1);
        if (element === id) {
          setOpen(true);
        }
      }
    }
  }, []);

  return (
    <div id={id}>
      <AccordionHeading isOpen={isOpen} onClick={() => setOpen(!isOpen)}>
        <span dangerouslySetInnerHTML={{ __html: question }} />
      </AccordionHeading>

      <AnimateHeight duration={200} height={isOpen ? "auto" : 0}>
        <div
          css={(theme: Theme) => ({
            color: theme.text,
            paddingBottom: grid(3),
          })}
        >
          {answer.map((a) => (
            <p
              key={a.slice(0, 30)}
              css={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: a }}
            />
          ))}
        </div>
      </AnimateHeight>
    </div>
  );
};

export default QuestionAndAnswer;
