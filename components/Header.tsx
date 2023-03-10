"use client";

import {
  createStyles,
  Header,
  Menu,
  Group,
  Center,
  Burger,
  Container,
  rem,
  Drawer,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import { MantineLogo } from "@mantine/ds";
import { LangPicker } from "./LangPicker";
import { Banner } from "./Banner";

const useStyles = createStyles((theme) => ({
  inner: {
    height: rem(80),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
}));

const links = [
  {
    link: "/about",
    label: "Features",
  },
  {
    link: "#1",
    label: "Learn",
    links: [
      {
        link: "/docs",
        label: "Documentation",
      },
      {
        link: "/resources",
        label: "Resources",
      },
      {
        link: "/community",
        label: "Community",
      },
      {
        link: "/blog",
        label: "Blog",
      },
    ],
  },
  {
    link: "/about",
    label: "About",
  },
  {
    link: "/pricing",
    label: "Pricing",
  },
  {
    link: "#2",
    label: "Support",
    links: [
      {
        link: "/faq",
        label: "FAQ",
      },
      {
        link: "/demo",
        label: "Book a demo",
      },
      {
        link: "/forums",
        label: "Forums",
      },
    ],
  },
];

export function HeaderComponent() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <>
    <Header height={80}>
      <Container>
        <div className={classes.inner}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              className={classes.burger}
              size="md"
            />
            <Banner />
          </Group>
          <Group spacing={5} className={classes.links}>
            {items}
            <LangPicker />
          </Group>
        </div>
      </Container>
    </Header>
    <Drawer
        opened={opened}
        onClose={toggle}
        position="left"
        closeButtonProps={{
          size: "lg",
        }}
      >
        <Stack spacing={8} className="items-center py-6">
          {items}
          <LangPicker />
        </Stack>
      </Drawer>
    </>
  );
}
