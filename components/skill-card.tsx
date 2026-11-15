import { Code2, Database, PanelsTopLeft, Terminal } from "lucide-react";

type SkillCardProps = {
  title: string;
  icon: "code" | "web" | "database" | "tools";
  skills: readonly string[];
  compact?: boolean;
};

const icons = {
  code: Code2,
  web: PanelsTopLeft,
  database: Database,
  tools: Terminal,
} as const;

export function SkillCard({ title, icon, skills, compact = false }: SkillCardProps) {
  const Icon = icons[icon];

  return (
    <article className={compact ? "skill-category" : "skill-panel"}>
      <div className={compact ? undefined : "skill-panel-heading"}>
        <Icon aria-hidden="true" size={compact ? 19 : 20} strokeWidth={1.6} />
        {compact ? null : <h3>{title}</h3>}
      </div>
      {compact ? <h3>{title}</h3> : null}
      <p>{skills.join(" / ")}</p>
    </article>
  );
}
