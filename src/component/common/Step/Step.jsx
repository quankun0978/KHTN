import React from 'react';
import PropTypes from 'prop-types';
import { Steps as StepAnt } from 'antd';
import './Step.scss';

function _Step({ customClass, current, items, status, onChange, ...rest }) {
  return (
    <>
      <StepAnt
        {...rest}
        className={`custom-step ${customClass}`}
        current={current}
        items={items}
        status={status}
        onChange={onChange}
        progressDot={(iconDot, { index, status, title, description }) => {
          if (status === 'wait' || status === 'finish')
            return (
              <div
                className="w-9 h-9 rounded-full flex justify-center items-center text-white text-center font-bold text-base"
                style={{ backgroundColor: '#94A3B8', position: 'absolute', top: -20, left: -24, marginTop: 6 }}>
                {index + 1}
              </div>
            );
          return (
            <div
              className="w-12 h-12 rounded-full flex justify-center items-center"
              style={{ backgroundColor: '#316AFF33', position: 'absolute', top: -20, left: -24 }}>
              <div
                className="w-9 h-9 rounded-full flex justify-center items-center text-white text-center font-bold text-base"
                style={{ backgroundColor: '#316AFF' }}>
                {index + 1}
              </div>
            </div>
          );
        }}
      />
    </>
  );
}

_Step.propTypes = {
  customClass: PropTypes.string,
  current: PropTypes.number,
  items: PropTypes.array,
  status: PropTypes.string,
  onChange: PropTypes.func,
};

_Step.defaultProps = {
  customClass: '',
  current: 0,
  items: [],
  status: 'process',
  onChange: () => {},
};

const Step = React.memo(_Step);

export default Step;
