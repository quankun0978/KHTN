import { memo } from 'react';
import { Spin } from 'antd';

import './ProgressTurn.scss';

const ProgressTurn = () => {
  return (
    <div className="progress-turn">
      <Spin size="large" />
    </div>
  );
};

export default memo(ProgressTurn);
