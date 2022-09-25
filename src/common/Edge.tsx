import { FunctionComponent } from 'react';

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
  const [containerRef] = useElementOnScreen(onVisible);
  return <div ref={containerRef} />;
};

export default Edge;
