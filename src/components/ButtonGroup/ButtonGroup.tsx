import { Children, cloneElement, isValidElement } from 'react';
import { cx } from '../../utils/cx';
import { ButtonGroupProps } from './types';

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div className={cx('inline-flex rounded-md', className)} role="group" {...props}>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return null;
        }

        return cloneElement(child, {
          variant: 'white',
          className: cx(child.props.className, 'rounded-none first:rounded-l-lg last:rounded-r-lg'),
        });
      })}
    </div>
  );
}
