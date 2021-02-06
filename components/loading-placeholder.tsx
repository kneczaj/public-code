import React from 'react';
import { ClipLoader } from 'react-spinners';

export interface Props {
  size?: number;
  className?: string;
}

const defaultProps = {
  size: 150
};

export class LoadingPlaceholder extends React.Component<Props> {
  static defaultProps = defaultProps;

  render() {
    const { className, size } = this.props as Props & typeof defaultProps;
    return (
      <div className={className} style={{ width: size, height: size }}>
        <ClipLoader
          sizeUnit={'px'}
          size={0.95 * size}
          color={'#123abc'}
          loading={true}
        />
      </div>
    );
  }
}
