import { ReactNode } from 'react';
import classNames from 'classnames';

import { HTMLParams } from './types';

type AllowedTagname = 'article' | 'section' | 'figure' | 'div';

export type MediaCardProps<T extends AllowedTagname> = HTMLParams<T> & {
  readonly as?: T;
  readonly className?: string;
  readonly loadFailed?: boolean;
  readonly title?: string;
  readonly buttons?: ReactNode;
  readonly loading?: ReactNode;
  readonly showOverlay?: boolean;
};

const MediaCard = <T extends AllowedTagname>({
  as,
  className,
  loadFailed,
  title,
  children,
  buttons,
  loading,
  showOverlay = !!(title || buttons),
  ...props
}: MediaCardProps<T>) => {
  const Component = as ?? 'div';
  const articleClass = classNames(/*tw*/ 'relative rounded-2xl overflow-hidden group', className);
  const statusClass = classNames(/*tw*/ 'absolute inset-0 flex justify-center items-center rounded-2xl', {
    /*tw*/ 'animate-pulse bg-gray-500 -z-10': !loadFailed,
    /*tw*/ 'bg-red-400': loadFailed,
  });

  return (
    <Component className={articleClass} {...props}>
      {(loadFailed || !loading) && <div className={statusClass} />}
      {!loadFailed && loading}
      {children}
      {showOverlay && (
        <>
          <div className="absolute inset-0 bg-neutral-700 opacity-0 transition-opacity duration-150 group-focus-within:opacity-50 group-hover:opacity-50 pointer-events-none rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 lg:gap-4 sm:opacity-0 transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 pointer-events-none">
            <span className="overflow-hidden text-white invisible sm:visible pointer-events-auto">{title}</span>
            <span className="flex-1"></span>
            <div className="pointer-events-auto contents">{buttons}</div>
          </div>
        </>
      )}
    </Component>
  );
};

export default MediaCard;
