import { cx } from "../../utils/cx";

export function Title({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      className={cx(
        "text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl",
        className
      )}
    />
  );
}
