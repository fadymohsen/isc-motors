import type { ReactNode } from "react";
import Tag from "./Tag";

type SectionHeadingProps = {
  tag: string;
  title: ReactNode;
  action?: ReactNode;
  titleMaxWidth?: string;
};

export default function SectionHeading({
  tag,
  title,
  action,
  titleMaxWidth = "max-w-xl",
}: SectionHeadingProps) {
  const heading = (
    <h2
      className={`font-display text-4xl leading-[0.9] tracking-tightest2 md:text-6xl ${
        action ? "" : "md:text-right"
      } ${titleMaxWidth}`}
    >
      {title}
    </h2>
  );

  if (action) {
    return (
      <div className="flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-4">
          <Tag>{tag}</Tag>
          {heading}
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between md:gap-20">
      <Tag>{tag}</Tag>
      {heading}
    </div>
  );
}
