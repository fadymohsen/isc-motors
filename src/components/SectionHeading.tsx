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
      <div className="min-w-0 md:flex md:items-end md:justify-between md:gap-6">
        <div>
          <Tag>{tag}</Tag>
          <div className="mt-4">{heading}</div>
        </div>
        <div className="mt-6 md:mt-0 md:shrink-0">{action}</div>
      </div>
    );
  }

  return (
    <div className="min-w-0 md:flex md:items-start md:justify-between md:gap-20">
      <div className="md:shrink-0">
        <Tag>{tag}</Tag>
      </div>
      <div className="mt-4 min-w-0 md:mt-0">{heading}</div>
    </div>
  );
}
