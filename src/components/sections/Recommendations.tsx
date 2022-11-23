import Link from "next/link";
import { Box, Card, Space, Stack, Text, Title } from "@mantine/core";

export type Recommendation = {
  name: string;
  title: string;
  text: string;
  source: string;
};

export type RecommendationsProps = {
  title: string;
  recommendations: Recommendation[];
};

const Recommendations = ({ title, recommendations }: RecommendationsProps) => {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      <Space h="xl" />
      <Stack>
        {recommendations.map((recommendation, index) => (
          <Card key={index} shadow="sm" p={24}>
            <Title order={3}>{recommendation.name}</Title>
            <Text size="sm">{recommendation.title}</Text>
            <Text mt={8} italic>
              "{recommendation.text}"
            </Text>
            <Text mt={8}>
              <b>Source:</b>&nbsp;
              <Link href={recommendation.source} style={{ all: "revert" }}>
                {recommendation.source}
              </Link>
            </Text>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Recommendations;
