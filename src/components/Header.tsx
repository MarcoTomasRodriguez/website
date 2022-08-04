import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Center, Group, Menu, Transition } from "@mantine/core";
import {
  BriefcaseIcon,
  CodeIcon,
  MailIcon,
  TranslateIcon,
  UserIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/solid";
import useScrollableHide from "../hooks/useScrollableHide";
import Link from "next/link";
import styled from "@emotion/styled";

const CustomHeader = styled.header`
  position: fixed;
  background-color: #3f51b5;
  padding: 0.5rem;
  width: 100%;
  z-index: 50;
`;

const CustomButton = styled.button`
  padding: 0.5rem;
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-style: none;
  border-radius: 0.25rem;
  background-color: transparent;
  &:hover {
    background-color: #3949a3;
  }
`;

const Header = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const hidden = useScrollableHide();

  const languages = [
    { language: "English", code: "en" },
    { language: "Deutsch", code: "de" },
    { language: "Español", code: "es" },
  ];

  const links = [
    { title: t("header.about"), url: "#about", icon: UserIcon },
    { title: t("header.experience"), url: "#experience", icon: BriefcaseIcon },
    { title: t("header.projects"), url: "#projects", icon: CodeIcon },
    { title: t("header.languages"), url: "#languages", icon: SpeakerphoneIcon },
    { title: t("header.contact"), url: "#contact", icon: MailIcon },
  ];

  return (
    <Transition
      mounted={!hidden}
      transition="slide-down"
      duration={200}
      timingFunction="ease-in"
    >
      {(styles) => (
        <CustomHeader style={styles}>
          <Center>
            <Group spacing="xl">
              {links.map(({ title, url, icon: Icon }, index) => (
                <Link
                  key={index}
                  href={url}
                  passHref
                  aria-label={`Scroll to ${title}`}
                >
                  <CustomButton
                  // leftIcon={
                  //  <Icon width={20} height={20} viewBox="0 0 20 20" />
                  // }
                  >
                    {title}
                  </CustomButton>
                </Link>
              ))}
              <Menu>
                {languages.map((lang, index) => (
                  <Menu.Item
                    key={index}
                    className="w-full px-4 py-3 text-left text-sm text-gray-800 hover:bg-gray-200"
                    onClick={() => router.push("", "", { locale: lang.code })}
                  >
                    {lang.language}
                  </Menu.Item>
                ))}
              </Menu>
            </Group>
          </Center>
        </CustomHeader>
      )}
    </Transition>
  );
};

export default Header;
