import Image from "next/image";

type LeadSharperLogoProps = {
  size?: "sm" | "md" | "lg";
  imageClassName?: string;
  className?: string;
};

export function LeadSharperLogo({
  size = "md",
  imageClassName,
  className = "",
}: LeadSharperLogoProps) {
  const defaultSize =
    size === "lg" ? "h-16 w-auto" : size === "sm" ? "h-8 w-auto" : "h-10 w-auto";

  return (
    <div className={`flex items-center ${className}`}>
      <Image
        src="/leadsharper-logo.png"
        alt="LeadSharper"
        width={260}
        height={80}
        priority
        className={imageClassName ?? `${defaultSize} object-contain`}
      />
    </div>
  );
}
