import { ButtonProps } from "../Button/types";

export type ButtonGroupProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> & {
  children: React.ReactElement<ButtonProps> | React.ReactElement<ButtonProps>[];
};
