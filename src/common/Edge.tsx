import { FunctionComponent, useEffect } from 'react';

import useElementOnScreen from '~common/useElementOnScreen';

export interface EdgeProps {
  readonly onVisible: () => void;
}

/**
 * Executes the provided `onVisible` function whenever the element
 * comes into the viewport.
 * If element moves out of the viewport and back again, the `onVisible`
 * will be executed again.
 */
const Edge: FunctionComponent<EdgeProps> = ({ onVisible }) => {
  const [containerRef, isVisible] = useElementOnScreen();

  useEffect(() => {
    isVisible && onVisible();
  }, [isVisible]);

  return <div ref={containerRef} />;
};

export default Edge;
