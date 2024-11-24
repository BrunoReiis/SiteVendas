export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "SiteProd",
  nameNormal: 'SiteProducao',
  description: "A Website for management",
  navItems: [
    {
      label: "Inicio",
      href: "/",
      requiresAuth: false,
    },
    {
      label: "Sobre",
      href: "/sobre",
      requiresAuth: false,
    },
    {
      label: "Equipe",
      href: "/equipe",
      requiresAuth: false,
    },
    {
      label: "Login",
      href: "/login",
      requiresAuth: false,
      hideWhenLoggedIn: true,
    },
    {
      label: "Login2",
      href: "/login",
      requiresAuth: true,
      usuarioAdm: true,
    },
  ],
  links: {
    github: "https://github.com/brunoreiis",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui-docs-v2.vercel.app",
    discord: "https://discord.gg/J2VNMcPakP",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};