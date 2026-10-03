import type { ReactNode } from "react";
import MaskLines from "./MaskLines";
import Reveal from "./Reveal";
import Tag from "./Tag";

type SectionHeadingProps = {
  tag: string;
  // Use "\n" to force a line break; each line slides up out of its own mask.
  title: string;
  action?: ReactNode;
  // "offset" pushes the title into the right-hand columns, "stacked" sets it under the tag.
  layout?: "offset" | "stacked";
};

export const titleSize = "text-[clamp(48px,7.4vw,140px)]";

export default function SectionHeading({
  tag,
  title,
  action,
  layout = "offset",
}: SectionHeadingProps) {
  const heading = (
    <h2 className={`h-display ${titleSize}`}>
      <MaskLines lines={title.split("\n")} delay={120} />
    </h2>
  );

  if (layout === "stacked") {
    return (
      <div className="min-w-0 md:flex md:items-end md:justify-between md:gap-10">
        <div>
          <Reveal>
            <Tag>{tag}</Tag>
          </Reveal>
          <div className="mt-6">{heading}</div>
        </div>
        {action && (
          <Reveal delay={300} className="mt-8 md:mt-0 md:shrink-0">
            {action}
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="grid min-w-0 gap-6 md:grid-cols-[44%_1fr] md:gap-0">
      <Reveal>
        <Tag>{tag}</Tag>
      </Reveal>
      <div className="text-start">{heading}</div>
    </div>
  );
}
