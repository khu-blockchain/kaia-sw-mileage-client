import { cn } from "@/shared/utils";

const PageLayout = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <article className={cn("flex flex-col gap-4", className)}>
      <header className="flex flex-col gap-2">
        <p className="text-2xl font-semibold">{title}</p>
      </header>
      {children}
    </article>
  );
};

export default PageLayout;
