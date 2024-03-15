import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { logout } from '@/redux/auth/actions';
import { selectCurrentAdmin } from '@/redux/auth/selectors';
import Transition from '@/component/common/Transition/Transition';
import { faChevronRight, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const { Header } = Layout;

function AppHeader() {
  const dispatch = useDispatch();
  const currentLogin = useSelector(selectCurrentAdmin);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdownOpen || dropdown.current?.contains(target) || trigger.current?.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Header
      style={{ backgroundColor: '#fff' }}
      className="flex justify-end border-b sticky top-0 z-20">
      <hr className="w-px h-full bg-gray-200 mx-3" />
      <div className="relative inline-flex">
        <button
          ref={trigger}
          className="inline-flex justify-center items-center group"
          aria-haspopup="true"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          aria-expanded={dropdownOpen}>
          <div className="flex items-center truncate">
            {currentLogin ? (
              <Avatar style={{ backgroundColor: '#87d068' }}>{currentLogin?.email?.charAt(0)}</Avatar>
            ) : (
              <Avatar
                style={{ backgroundColor: '#87d068' }}
                icon={<FontAwesomeIcon icon={faUser} />}
              />
            )}
          </div>
        </button>

        <Transition
          className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
          show={dropdownOpen}
          enter="transition ease-out duration-200 transform"
          enterStart="opacity-0 -translate-y-2"
          enterEnd="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveStart="opacity-100"
          leaveEnd="opacity-0">
          <div
            ref={dropdown}
            onFocus={() => setDropdownOpen(true)}
            onBlur={() => setDropdownOpen(false)}>
            <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-gray-200">
              <div className="flex items-center">
                {currentLogin ? (
                  <Avatar style={{ backgroundColor: '#87d068' }}>{currentLogin?.email?.charAt(0)}</Avatar>
                ) : (
                  <Avatar
                    style={{ backgroundColor: '#87d068' }}
                    icon={<FontAwesomeIcon icon={faUser} />}
                  />
                )}
                <div className="ml-4 leading-normal">
                  <div className="font-medium text-gray-800">{currentLogin?.email}</div>
                  <Link to={''}>
                    <span className="text-xs text-gray-500 mr-1">View profile</span>
                    <FontAwesomeIcon
                      icon={faChevronRight}
                      color="#64748B"
                      size="xs"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <ul className="mb-0">
              <li
                className="hover:bg-gray-200 font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3 cursor-pointer"
                onClick={onLogout}>
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="mr-2"
                />
                <span>Log Out</span>
              </li>
            </ul>
          </div>
        </Transition>
      </div>
    </Header>
  );
}

export default AppHeader;
