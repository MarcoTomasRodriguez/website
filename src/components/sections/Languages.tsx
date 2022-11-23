import { Box, Card, Grid, Space, Stack, Text, Title } from "@mantine/core";

export type Language = {
  language: string;
  level: string;
};

export type LanguageProps = {
  title: string;
  languages: Language[];
};

const Languages = ({ title, languages }: LanguageProps) => {
  return (
    <Box>
      <Title order={2}>{title}</Title>
      <Space h="xl" />
      <Grid>
        {languages.map((language, index) => (
          <Grid.Col key={index} sm={12} md={4}>
            <Card shadow="sm" p={24}>
              <Title order={3} mb={4}>
                {language.language}
              </Title>
              <Text>{language.level}</Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
};

export default Languages;
