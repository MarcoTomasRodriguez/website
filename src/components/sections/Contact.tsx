import Link from "next/link";
import { useCallback } from "react";
import {
  Box,
  Center,
  Grid,
  Stack,
  Title,
  Text,
  Group,
  ActionIcon,
  TextInput,
  Textarea,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconMail,
  IconX,
} from "@tabler/icons";

type EmailForm = {
  name: string;
  email: string;
  message: string;
};

export type ContactProps = {
  title: string;
  body: string;
};

const Contact = ({ title, body }: ContactProps) => {
  const form = useForm<EmailForm>({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validate: {
      name: (value: string) => (value.length > 2 ? null : "Invalid name"),
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      message: (value: string) =>
        value.length > 10 ? null : "Invalid message",
    },
  });

  const sendEmail = useCallback(
    async ({ name, email, message }: EmailForm) => {
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
        return;
      }

      showNotification({
        title: "Success",
        message: "Email sent",
        icon: <IconCheck size={18} />,
        color: "teal",
      });
      form.reset();
    },
    [form]
  );

  return (
    <Box id="contact" sx={{ padding: "2rem" }}>
      <Grid>
        <Grid.Col sm={12} md={7}>
          <Center sx={{ height: "100%", padding: "1rem" }}>
            <Stack>
              <Title order={2} align="center">
                {title}
              </Title>
              <Text align="center">{body}</Text>
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
        <Grid.Col sm={12} md={5}>
          <form onSubmit={form.onSubmit(sendEmail)}>
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
          </form>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Contact;
