import {
  Badge,
  Box,
  Card,
  Group,
  Image,
  List,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { BadgeProps } from "../../types/badge";

export type Experience = {
  title: string;
  company: string;
  years: string;
  points?: string[];
  logo?: string;
  badges: BadgeProps[];
};

export type ExperiencesProps = {
  title: string;
  experiences: Experience[];
};

const Experiences = ({ title, experiences }: ExperiencesProps) => {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      <Space h="xl" />
      <Stack>
        {experiences.map((experience, index) => (
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
                <Badge key={index} variant="outline" color={badge.color}>
                  {badge.text}
                </Badge>
              ))}
            </Group>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Experiences;
