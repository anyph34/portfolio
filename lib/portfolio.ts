export const portfolioLinks = [
  { href: "/", label: "Home", number: "01" },
  { href: "/about", label: "About", number: "02" },
  { href: "/#skills", label: "Skills", number: "03" },
  { href: "/projects", label: "Projects", number: "04" },
  { href: "/projects#case-studies", label: "Case Studies", number: "05" },
  { href: "/about#experience", label: "Experience", number: "06" },
  { href: "/contact", label: "Contact", number: "07" },
] as const;

export const contactDetails = {
  phone: "+254799655757",
  phoneDisplay: "0799 655 757",
  email: "anyphbett9@gmail.com",
  whatsapp: "https://wa.me/254799655757",
  github: "https://github.com/anyph34",
  linkedin: "https://www.linkedin.com/in/anyph-kipngetich-b9247a354",
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
