export type ButtonVariant = 'default' | 'dark' | 'red' | 'white';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};
