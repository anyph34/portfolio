export const portfolioLinks = [
  { href: "/", label: "Home", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/projects", label: "Projects", number: "03" },
  { href: "/contact", label: "Contact", number: "04" },
] as const;

export const contactDetails = {
  phone: "+254799655757",
  phoneDisplay: "0799 655 757",
  email: "anyphbett9@gmail.com",
  whatsapp: "https://wa.me/254799655757",
  github: "https://github.com/anyph34",
} as const;

export const skillGroups = [
  {
    title: "Languages",
    icon: "code",
    skills: ["Java", "C", "JavaScript", "SQL", "PHP"],
  },
  {
    title: "Web & frontend",
    icon: "web",
    skills: ["HTML5", "CSS3", "React", "Next.js", "Responsive UI design"],
  },
  {
    title: "Backend & databases",
    icon: "database",
    skills: ["PostgreSQL", "Supabase", "MySQL", "Node.js", "Multi-tenant schema design"],
  },
  {
    title: "Tools & workflow",
    icon: "tools",
    skills: ["Git", "GitHub", "VS Code", "Systems analysis & design"],
  },
] as const;
