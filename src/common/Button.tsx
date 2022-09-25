import { ReactElement } from 'react';
import classNames from 'classnames';

import { HTMLParams } from './types';

type AllowedTagname = 'a' | 'button';
type ButtonColor = 'default' | 'blue';
type ButtonAppearance = 'default' | 'squared';

export type ButtonProps<T extends AllowedTagname> = HTMLParams<T> & {
  readonly as?: T;
  readonly appearance?: ButtonAppearance;
  readonly color?: ButtonColor;
  readonly disabled?: boolean;
};

const staticClass = /*tw*/ 'inline-flex items-center p-2 rounded-lg gap-2';

const colorClasses: Record<ButtonColor, string> = {
  default: /*tw*/ 'bg-white text-black hover:bg-zinc-200',
  blue: /*tw*/ 'bg-blue-200 text-black hover:bg-blue-300',
};

const appearanceClasses: Record<ButtonAppearance, string> = {
  default: /*tw*/ 'px-4',
  squared: /*tw*/ 'aspect-square',
};

const Button = <T extends AllowedTagname = 'button'>({
  as,
  className,
  disabled,
  appearance = 'default',
  color = 'default',
  ...props
}: ButtonProps<T>): ReactElement => {
  className = classNames(staticClass, colorClasses[color], appearanceClasses[appearance], className);

  const Component = as ?? 'button';
  const additionalProps =
    Component === 'button'
      ? { disabled, className: classNames(className, /*tw*/ 'disabled:bg-gray-400') }
      : { className: classNames(className, { /*tw*/ 'bg-gray-400 pointer-events-none': disabled }) };

  return <Component {...props} {...additionalProps} />;
};

export default Button;
