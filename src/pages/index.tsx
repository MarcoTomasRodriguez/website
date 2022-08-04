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
        </Center>
      </Box>
      <Stack sx={{ padding: "2rem" }}>
        <Box id="experience">
          <Title order={1}>Professional Experience</Title>
          <Space h="md" />
          <Stack>
            <Card shadow="md" sx={{ padding: "1.25rem" }}>
              <Group>
                <Image
                  width={56}
                  height={56}
                  radius="sm"
                  src="https://www.marcotomasrodriguez.com/_next/image?url=%2Fimg%2Fbluesensor-logo.png&w=3840&q=75"
                />
                <div>
                  <Title order={2}>Software Engineer</Title>
                  <Text size="xs" weight={700}>
                    BlueSensor
                  </Text>
                  <Text size="xs" weight={700}>
                    Oct 2020 - Present
                  </Text>
                </div>
              </Group>
              <List withPadding>
                <List.Item>Test</List.Item>
              </List>
              <Badge color="yellow">Javascript</Badge>
            </Card>
          </Stack>
        </Box>
        <Divider />
        <Box id="projects">
          <Title order={1}>Projects</Title>
          <Space h="md" />
          <Stack>
            <Card shadow="sm">
              <Title order={2}>Kubernetes</Title>
              <Text>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reiciendis adipisci similique eos enim quis sapiente nulla,
                vitae quam necessitatibus mollitia odio et, eligendi eius non
                illo dolorem corrupti doloribus qui.
              </Text>
              <Badge color="cyan">Go</Badge>
              <Space h="sm" />
              <Divider />
              <Space h="sm" />
              <Link href="google.com" passHref={true}>
                <Text weight={700} component="a">
                  Go to repository
                </Text>
              </Link>
            </Card>
          </Stack>
        </Box>
        <Divider />
        <Box id="languages">
          <Title order={1}>Languages</Title>
          <Stack>
            <Card shadow="sm">
              <Title order={2}>German</Title>
              <Text>Upper Intermediate</Text>
            </Card>
          </Stack>
        </Box>
        <Box sx={{ padding: "2rem" }}>
          <Grid>
            <Grid.Col span={7}>
              <Center sx={{ height: "100vh" }}>
                <Stack>
                  <Title order={2} align="center">
                    {t("contact.title")}
                  </Title>
                  <Text align="center">{t("contact.body")}</Text>
                  <Group position="center" align="center">
                    <ActionIcon>
                      <IconBrandGithub />
                    </ActionIcon>
                    <ActionIcon>
                      <IconBrandLinkedin />
                    </ActionIcon>
                    <ActionIcon>
                      <IconMail />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Center>
            </Grid.Col>
            <Grid.Col span={5}>
              <form onSubmit={form.onSubmit(sendEmail)}>
                <Center sx={{ height: "100vh", width: "100%" }}>
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
