import * as React from "react";
import { Language } from "../../../../../types/language";
import { Theme } from "../../../../../types/theme";
import Button from "../../../ui-library/button/button";
import { grid } from "../../../ui-library/design-tokens/grid";
import { Device } from "../../../ui-library/design-tokens/media-queries";
import Heading from "../../../ui-library/text/heading";

const heading: Record<Language, string> = {
  en: "DRC Smart Contract Audit",
  zh: "DRC合约源码审核",
};

const description: Record<Language, string> = {
  en: "Based on the DRC smart contract audit review conducted by Decenter, the codebase does not contain any critical or other issues.",
  zh: "根据Decenter进行的DRC智能合约审核，合约源代码不包含任何关键或其他问题",
};

const buttonText: Record<Language, string> = {
  en: "DOWNLOAD DRC AUDIT",
  zh: "下载DRC合约审核",
};

interface ContractAuditProps {
  lang?: Language;
}

const ContractAudit: React.FC<ContractAuditProps> = ({ lang = "en" }) => {
  return (
    <>
      <Heading component="h2" textAlign="center" margin={{ bottom: grid(2) }}>
        {heading[lang]}
      </Heading>

      <div
        css={(theme: Theme) => ({
          color: theme.text,
          marginBottom: grid(3),
          [Device.DesktopTablet]: {
            textAlign: "center",
          },
        })}
      >
        {description[lang]}
      </div>

      <div css={{ display: "flex", justifyContent: "center" }}>
        <Button
          to="/files/drc-audit-report.pdf"
          target="_blank"
          css={{
            width: "100%",
            [Device.DesktopTablet]: {
              maxWidth: grid(34.5),
            },
          }}
        >
          {buttonText[lang]}
        </Button>
      </div>
    </>
  );
};

export default ContractAudit;
