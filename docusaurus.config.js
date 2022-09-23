// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "VNOHackintosh",
  tagline: "Hackintosh Vietnam",
  url: "https://vnohackintosh.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "vanhung4499", // Usually your GitHub org/user name.
  projectName: "vnohackintosh", // Usually your repo name.

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      }),
    ],
  ],
  // themes: ['@docusaurus/theme-search-algolia'],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'BBG9FXDLV1',
        apiKey: '59245fbc4ae35801d3f1e73c8b2a5cf2',
        indexName: 'dev_vnohackintosh',
        contextualSearch: true,
      },
      announcementBar: {
        id: 'announcementBar', // Increment on change
        content: `⭐️ Nếu bạn không có thời gian tìm hiểu hackintosh, vui lòng tham khảo <strong><a href="/services">dịch vụ</a></strong> của chúng tôi`,
        isCloseable: false,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      navbar: {
        title: "VNOHackintosh",
        logo: {
          alt: "My Site Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "introduction",
            position: "left",
            label: "Guides",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/resources", label: "Downloads", position: "left" },
          { to: "/services", label: "Dịch vụ", position: "left" },
          {
            type: "search",
            position: "right",
          },
          {
            href: "https://github.com/vanhung4499/",
            position: "right",
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Guide",
                to: "/docs/introduction",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Facebook Group",
                href: "https://www.facebook.com/groups/vnohackintosh",
              },
              {
                label: "Facebook Page",
                href: "https://www.facebook.com/vnohackintosh",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/vanhung4499",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} VNOHackintosh, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
