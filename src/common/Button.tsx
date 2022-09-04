import { ElementType, ReactElement } from 'react';
import classnames from 'classnames';

interface ButtonProps<T extends 'a' | 'button'> {
  readonly as?: T;
  readonly squared?: boolean;
}

const staticClass = /*tw*/ 'inline-flex items-center p-2 rounded-lg bg-white text-black hover:bg-zinc-200';

const Button = <T extends 'a' | 'button' = 'button'>({
  as = 'button' as T,
  className,
  squared,
  ...props
}: ButtonProps<T> & JSX.IntrinsicElements[T]): ReactElement => {
  const Component = as as ElementType;
  const classname = classnames(staticClass, { /*tw*/ 'aspect-square': squared, /*tw*/ 'px-4': !squared }, className);
  return <Component {...props} className={classname} />;
};

export default Button;
