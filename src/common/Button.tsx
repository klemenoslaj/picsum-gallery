import { ReactElement } from 'react';
import classnames from 'classnames';

import { HTMLParams } from './types';

type AllowedTagname = 'a' | 'button';
type ButtonColor = 'default' | 'blue';
type ButtonAppearance = 'default' | 'squared';

export type ButtonProps<T extends AllowedTagname> = HTMLParams<T> & {
  readonly as?: T;
  readonly appearance?: ButtonAppearance;
  readonly color?: ButtonColor;
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
  appearance = 'default',
  color = 'default',
  ...props
}: ButtonProps<T>): ReactElement => {
  const Component = as ?? 'button';
  className = classnames(staticClass, colorClasses[color], appearanceClasses[appearance], className);
  return <Component {...props} className={className} />;
};

export default Button;
