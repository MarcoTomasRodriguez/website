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
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import AppShell from "../components/AppShell";
import Header from "../components/Header";
import Typewriter from "../components/Typewriter";

type EmailForm = {
  name: string;
  email: string;
  message: string;
};

const Home: NextPage = () => {
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
      <Box sx={{ backgroundColor: "#3f51b5", height: "100vh", width: "100vw" }}>
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
      <Stack sx={{ padding: "2rem" }} id="experience">
        <Box>
          <Title order={2}>Professional Experience</Title>
          <Space h="xl" />
          <Stack>
            <Card shadow="md" p={24}>
              <Group spacing={16} mb={8}>
                <Image
                  width={64}
                  height={64}
                  radius="sm"
                  src="https://www.marcotomasrodriguez.com/_next/image?url=%2Fimg%2Fbluesensor-logo.png&w=3840&q=75"
                />
                <div>
                  <Title order={3}>Software Engineer</Title>
                  <Text size="sm">BlueSensor</Text>
                  <Text size="sm">Oct 2020 - Present</Text>
                </div>
              </Group>
              <List withPadding>
                <List.Item>Test</List.Item>
              </List>
              <Group spacing={6} mt={12}>
                <Badge color="yellow">Javascript</Badge>
                <Badge color="green">MongoDB</Badge>
              </Group>
            </Card>
          </Stack>
        </Box>
        <Divider id="projects" size="sm" mt={28} mb={28} />
        <Box>
          <Title order={2}>Projects</Title>
          <Space h="xl" />
          <Stack>
            <Card shadow="sm" p={24}>
              <Title order={3} mb={4}>
                Kubernetes
              </Title>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reiciendis adipisci similique eos enim quis sapiente nulla,
                vitae quam necessitatibus mollitia odio et, eligendi eius non
                illo dolorem corrupti doloribus qui.
              </Text>
              <Group spacing={6} mt={12}>
                <Badge color="cyan">Go</Badge>
              </Group>
              <Divider mt={12} mb={12} />
              <Link href="google.com" passHref={true}>
                <Text weight={700} component="a">
                  Go to repository
                </Text>
              </Link>
            </Card>
          </Stack>
        </Box>
        <Divider id="languages" size="sm" mt={28} mb={28} />
        <Box>
          <Title order={2}>Languages</Title>
          <Space h="xl" />
          <Stack>
            <Card shadow="sm" p={24}>
              <Title order={3} mb={4}>
                German
              </Title>
              <Text>Upper Intermediate</Text>
            </Card>
          </Stack>
        </Box>
        <Box sx={{ padding: "2rem" }}>
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
    },
  };
};

export default Home;
