import { cx } from '../../utils/cx';
import { ButtonProps } from './types';
import { getButtonVariant } from './utils';

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button type="button" className={cx(getButtonVariant(variant), 'disabled:opacity-65', className)} {...props} />
  );
}
