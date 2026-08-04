import { ChevronDown } from "lucide-react";

type Props = {
  showChevron?: boolean;
  className?: string;
};

export function SectionDivider({ showChevron = false, className = "" }: Props) {
  return (
    <div className={`section-wedge ${className}`} aria-hidden>
      {showChevron && (
        <span className="section-wedge-chevron">
          <ChevronDown size={22} strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
}
