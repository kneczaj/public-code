import { useWindowSize } from '../hooks/window-size';
import { isUndefined } from '../util';

export interface Props {
  children: (windowWidth: number, windowHeight: number) => any;
}

export function WindowWidthProvider({ children }: Props) {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  if (isUndefined(windowWidth) || isUndefined(windowHeight)) {
    return null;
  }

  return children(windowWidth, windowHeight);
}
