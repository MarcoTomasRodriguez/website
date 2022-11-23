import { ActionIcon, Box, Center, Stack, Title } from "@mantine/core";
import { IconArrowDown } from "@tabler/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import Typewriter from "../Typewriter";

type AboutProps = {
  introduction: string;
  profession: string;
};

const About = ({ introduction, profession }: AboutProps) => {
  const [displayProfession, setDisplayProfession] = useState(false);

  useEffect(() => {
    const timeToPrintIntroduction = introduction.length * 60;
    setTimeout(() => setDisplayProfession(true), timeToPrintIntroduction + 300);
  }, [introduction]);

  return (
    <Box
      id="about"
      sx={{ backgroundColor: "#3f51b5", height: "100vh", width: "100vw" }}
    >
      <Center sx={{ height: "100vh", color: "#fff" }}>
        <Stack>
          <Title order={1} align="center">
            <Typewriter>{introduction}</Typewriter>
          </Title>
          <Title order={2} align="center">
            {displayProfession && <Typewriter>{profession}</Typewriter>}
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
  );
};

export default About;
