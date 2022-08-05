import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Image,
  List,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconArrowDown,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconMail,
  IconX,
} from "@tabler/icons";
import type { GetStaticProps, NextPage } from "next";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import Link from "next/link";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import Typewriter from "../components/Typewriter";

type Badge = {
  text: string;
  color: "red" | "green" | "blue" | "gray" | "yellow";
};

type Experience = {
  title: string;
  company: string;
  years: string;
  points?: string[];
  logo?: string;
  badges: Badge[];
};

type Project = {
  title: string;
  description: string;
  websiteUrl?: string;
  repositoryUrl?: string;
  badges: Badge[];
};

type Language = {
  language: string;
  level: string;
};

type EmailForm = {
  name: string;
  email: string;
  message: string;
};

type HomeProps = {
  experience: Experience[];
  projects: Project[];
  languages: Language[];
};

const Home: NextPage<HomeProps> = ({ experience, projects, languages }) => {
  const { t } = useTranslation("index");

  const [displayProfession, setDisplayProfession] = useState(false);

  useEffect(() => {
    const timeToPrintIntroduction = t("about.introduction").length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 100);
  }, [t]);

  const form = useForm<EmailForm>({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
    },
  });

  const sendEmail = async ({ name, email, message }: EmailForm) => {
    const response = await fetch("https://formspree.io/f/myybqbdp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, _replyto: email, message }),
    });

    if (!response.ok) {
      showNotification({
        title: "Error",
        message: "Could not send email",
        icon: <IconX size={18} />,
        color: "red",
      });
    }

    showNotification({
      title: "Success",
      message: "Email sent",
      icon: <IconCheck size={18} />,
      color: "teal",
    });
  };

  return (
    <AppShell
      title="Marco Tomas Rodriguez"
      description="Website"
      header={<Header />}
    >
      <Box
        id="about"
        sx={{ backgroundColor: "#3f51b5", height: "100vh", width: "100vw" }}
      >
        <Center sx={{ height: "100vh", color: "#fff" }}>
          <Stack>
            <Title order={1} align="center">
              <Typewriter>{t("about.introduction")}</Typewriter>
            </Title>
            <Title order={2} align="center">
              {displayProfession && (
                <Typewriter>{t("about.profession")}</Typewriter>
              )}
            </Title>
          </Stack>
          <Link href="#experience">
            <ActionIcon
              sx={{
                position: "absolute",
                left: "50%",
                right: "50%",
                bottom: "2.5rem",
                marginLeft: "-0.75rem",
              }}
              className="animate-bounce"
              size="xl"
              color="white"
              variant="transparent"
            >
              <IconArrowDown />
            </ActionIcon>
          </Link>
        </Center>
      </Box>
      <Stack id="experience" sx={{ padding: "2rem" }}>
        <Box>
          <Title order={2}>{t("experience.title")}</Title>
          <Space h="xl" />
          <Stack>
            {experience.map((experience, index) => (
              <Card key={index} shadow="md" p={24}>
                <Group spacing={16} mb={8}>
                  <Image
                    width={64}
                    height={64}
                    radius="sm"
                    src={experience.logo || "/img/default-company.png"}
                    alt={`${experience.company} logo`}
                  />
                  <div>
                    <Title order={3}>{experience.title}</Title>
                    <Text size="sm">{experience.company}</Text>
                    <Text size="sm">{experience.years}</Text>
                  </div>
                </Group>
                <List ml={8}>
                  {experience.points?.map((point, index) => (
                    <List.Item key={index}>{point}</List.Item>
                  ))}
                </List>
                <Group spacing={6} mt={12}>
                  {experience.badges.map((badge, index) => (
                    <Badge key={index} color={badge.color}>
                      {badge.text}
                    </Badge>
                  ))}
                </Group>
              </Card>
            ))}
          </Stack>
        </Box>
        <Divider id="projects" size="sm" mt={28} mb={28} />
        <Box>
          <Title order={2}>{t("projects.title")}</Title>
          <Space h="xl" />
          <Stack>
            {projects.map((project, index) => (
              <Card shadow="sm" p={24}>
                <Title order={3} mb={4}>
                  {project.title}
                </Title>
                <Text>{project.description}</Text>
                <Group spacing={6} mt={12}>
                  {project.badges.map((badge, index) => (
                    <Badge color={badge.color}>{badge.text}</Badge>
                  ))}
                </Group>
                {(project.websiteUrl || project.repositoryUrl) && (
                  <>
                    <Divider mt={12} mb={12} />
                    <Group>
                      {project.websiteUrl && (
                        <Link href={project.websiteUrl} passHref={true}>
                          <Text size="sm" weight={700} component="a">
                            Website
                          </Text>
                        </Link>
                      )}
                      {project.repositoryUrl && (
                        <Link href={project.repositoryUrl} passHref={true}>
                          <Text size="sm" weight={700} component="a">
                            Repository
                          </Text>
                        </Link>
                      )}
                    </Group>
                  </>
                )}
              </Card>
            ))}
          </Stack>
        </Box>
        <Divider id="languages" size="sm" mt={28} mb={28} />
        <Box>
          <Title order={2}>{t("languages.title")}</Title>
          <Space h="xl" />
          <Stack>
            {languages.map((language, index) => (
              <Card key={index} shadow="sm" p={24}>
                <Title order={3} mb={4}>
                  {language.language}
                </Title>
                <Text>{language.level}</Text>
              </Card>
            ))}
          </Stack>
        </Box>
        <Box id="contact" sx={{ padding: "2rem" }}>
          <Grid>
            <Grid.Col span={7}>
              <Center sx={{ height: "90vh" }}>
                <Stack>
                  <Title order={2} align="center">
                    {t("contact.title")}
                  </Title>
                  <Text align="center">{t("contact.body")}</Text>
                  <Group position="center" align="center">
                    <Link
                      href="https://github.com/MarcoTomasRodriguez"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit GitHub profile"
                    >
                      <ActionIcon>
                        <IconBrandGithub />
                      </ActionIcon>
                    </Link>
                    <Link
                      href="https://www.linkedin.com/in/marcotomasrodriguez"
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Visit LinkedIn profile"
                    >
                      <ActionIcon>
                        <IconBrandLinkedin />
                      </ActionIcon>
                    </Link>
                    <Link
                      href="mailto:marcotomasrodriguez@gmail.com"
                      aria-label="Send email"
                    >
                      <ActionIcon>
                        <IconMail />
                      </ActionIcon>
                    </Link>
                  </Group>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col span={5}>
              <form onSubmit={form.onSubmit(sendEmail)}>
                <Center sx={{ height: "90vh", width: "100%" }}>
                  <Stack sx={{ width: "100%", padding: "2rem" }}>
                    <TextInput
                      label="Name"
                      placeholder="Aspen Collins"
                      {...form.getInputProps("name")}
                    />
                    <TextInput
                      label="Email"
                      placeholder="aspen@enterprise.com"
                      {...form.getInputProps("email")}
                    />
                    <Textarea
                      label="Message"
                      placeholder="Your message"
                      minRows={9}
                      maxRows={9}
                      {...form.getInputProps("message")}
                    />
                    <Button color="blue" variant="filled" type="submit">
                      Submit
                    </Button>
                  </Stack>
                </Center>
              </form>
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>
    </AppShell>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  const translations = await (
    await fetch(
      `https://www.marcotomasrodriguez.com/locales/${locale}/index.json`
    )
  ).json();

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
      experience: translations.experience.content || [],
      projects: translations.projects.content || [],
      languages: translations.languages.content || [],
    },
  };
};

export default Home;
