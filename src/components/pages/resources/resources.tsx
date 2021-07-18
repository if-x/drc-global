import * as React from "react";
import { Language } from "../../../../types/language";
import PageHeading from "../../modules/page-heading/page-heading";
import Container from "../../ui-library/container/container";
import { grid } from "../../ui-library/design-tokens/grid";
import MarginBox from "../../ui-library/margin-box/margin-box";
import LinksSection from "../../ui-library/links-section/links-section";
import {
  communityResourceLinks,
  informationResourceLink,
  marketResourceLinks,
  mediaPostLinks,
} from "../../../data/resource-link-sections";
import LogoDivider from "./logo-divider/logo-divider";

const headings = {
  community: {
    en: "Discussion and Community",
    zh: "讨论 - 社区",
  },
  media: {
    en: "Press and Media",
    zh: "媒体 - 新闻",
  },
  market: {
    en: "Marketplace and Data",
    zh: "市场 - 数据",
  },
  information: {
    en: "Information and Media",
    zh: "信息媒体",
  },
};

interface ResourcesProps {
  lang?: Language;
}

const Resources: React.FC<ResourcesProps> = ({ lang = "en" }) => {
  return (
    <Container>
      <MarginBox
        margin={{ desktop: { bottom: grid(5) }, mobile: { bottom: grid(4) } }}
      >
        <PageHeading />
      </MarginBox>

      <LogoDivider />

      <MarginBox margin={{ bottom: grid(3) }}>
        <LinksSection
          heading={headings.community[lang]}
          links={communityResourceLinks}
        />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(3) }}>
        <LinksSection heading={headings.media[lang]} links={mediaPostLinks} />
      </MarginBox>

      <MarginBox margin={{ bottom: grid(3) }}>
        <LinksSection
          heading={headings.market[lang]}
          links={marketResourceLinks}
        />
      </MarginBox>

      <LinksSection
        heading={headings.information[lang]}
        links={informationResourceLink}
      />
    </Container>
  );
};

export default Resources;
