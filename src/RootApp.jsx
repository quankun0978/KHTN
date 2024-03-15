import { useEffect, Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { StyleProvider } from '@ant-design/cssinjs';
import viVN from 'antd/locale/vi_VN';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import ProgressTurn from '@/component/common/ProgressTurn/ProgressTurn';
import store from '@/redux/store';
import { ConfigProvider } from 'antd';

dayjs.extend(customParseFormat);
dayjs.extend(localizedFormat);
dayjs.extend(advancedFormat);
dayjs().format('L LT');

const AppWrapper = lazy(() => import('@/pages/AppWrapper'));

function RootApp() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <Provider store={store}>
      <Suspense fallback={<ProgressTurn />}>
        <StyleProvider hashPriority="high">
          <ConfigProvider locale={viVN}>
            <AppWrapper />
          </ConfigProvider>
        </StyleProvider>
      </Suspense>
    </Provider>
  );
}

export default RootApp;
