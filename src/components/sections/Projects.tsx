import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { BadgeProps } from "../../types/badge";

export type Project = {
  title: string;
  description: string;
  websiteUrl?: string;
  repositoryUrl?: string;
  badges: BadgeProps[];
};

type ProjectProps = {
  title: string;
  projects: Project[];
};

const Projects = ({ title, projects }: ProjectProps) => {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      <Space h="xl" />
      <Stack>
        {projects.map((project, index) => (
          <Card key={index} shadow="sm" p={24}>
            <Title order={3} mb={4}>
              {project.title}
            </Title>
            <Text>{project.description}</Text>
            <Group spacing={6} mt={12}>
              {project.badges.map((badge, index) => (
                <Badge key={index} variant="outline" color={badge.color}>
                  {badge.text}
                </Badge>
              ))}
            </Group>
            {(project.websiteUrl || project.repositoryUrl) && (
              <>
                <Divider mt={12} mb={12} />
                <Group>
                  {project.websiteUrl && (
                    <Link href={project.websiteUrl}>
                      <Text size="sm" weight={700}>
                        Website
                      </Text>
                    </Link>
                  )}
                  {project.repositoryUrl && (
                    <Link href={project.repositoryUrl}>
                      <Text size="sm" weight={700}>
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
  );
};

export default Projects;
