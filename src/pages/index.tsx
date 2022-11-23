import fs from "fs";
import path from "path";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Divider, Stack } from "@mantine/core";
import AppShell from "@components/AppShell";
import Header from "@components/Header";
import Projects, { Project } from "@components/sections/Projects";
import Experiences, { Experience } from "@components/sections/Experiences";
import Languages, { Language } from "@components/sections/Languages";
import Recommendations, {
  Recommendation,
} from "@components/sections/Recommendations";
import Contact from "@components/sections/Contact";
import About from "@components/sections/About";

type HomeProps = {
  experience: Experience[];
  projects: Project[];
  languages: Language[];
  recommendations: Recommendation[];
};

const Home: NextPage<HomeProps> = ({
  experience,
  projects,
  languages,
  recommendations,
}) => {
  const { t } = useTranslation("index");

  return (
    <AppShell
      title="Marco Tomas Rodriguez"
      description="Website"
      header={<Header />}
    >
      <About
        introduction={t("about.introduction")}
        profession={t("about.profession")}
      />
      <Stack id="experience" sx={{ padding: "2rem" }}>
        <Experiences title={t("experience.title")} experiences={experience} />
        <Divider id="projects" size="sm" mt={28} mb={28} />
        <Projects title={t("projects.title")} projects={projects} />
        <Divider id="languages" size="sm" mt={28} mb={28} />
        <Languages title={t("languages.title")} languages={languages} />
        <Divider id="recommendations" size="sm" mt={28} mb={28} />
        <Recommendations
          title={t("recommendations.title")}
          recommendations={recommendations}
        />
        <Contact title={t("contact.title")} body={t("contact.body")} />
      </Stack>
    </AppShell>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  // TODO: Read with fs.
  const translations = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "public/locales", locale, "index.json"),
      "utf-8"
    )
  );

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
      experience: translations.experience.content || [],
      projects: translations.projects.content || [],
      languages: translations.languages.content || [],
      recommendations: translations.recommendations.content || [],
    },
  };
};

export default Home;
