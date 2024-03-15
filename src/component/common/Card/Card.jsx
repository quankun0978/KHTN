import PropTypes, { element } from 'prop-types';
import { IconRound } from '@/component/common/Icon';

const Card = ({ title, children, customClass }) => {
  return (
    <div className={`w-full p-3 bg-cs_lightGray rounded-lg ${customClass}`}>
      <div className="flex mb-3">
        <IconRound />
        <p className="ml-2 text-sm font-semibold">{title}</p>
      </div>
      <div className="bg-white rounded-lg px-5 py-6">{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
};

export default Card;
