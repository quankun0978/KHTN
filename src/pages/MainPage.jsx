import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Breadcrumb, ConfigProvider, Layout, Menu } from 'antd';
import Icon, { HomeOutlined } from '@ant-design/icons';

import AppHeader from '@/component/layout/AppHeader';
import { BREADCRUMB_PATH, ITEMS_MENUS_SLIDER } from '@/constants/Constants';
import { iconLogoVNPTBlue } from '@/assets/images';
import * as ROUTES from '@/router/routes';
import { IconDashboard, IconDown, IconPhanGiao, IconSubMenu, IconTaiKhoan, IconThuThap, IconTruyenThong } from '@/component/common/Icon';

import { defaultMenu } from '@/config/theme/Menu';

const { Content, Footer, Sider } = Layout;

function getItem(label, key, link, icon, children) {
  return {
    key,
    icon,
    children,
    label:
      link === null ? (
        <span className="ant-menu-title-content">
          <p className="font-semibold text-base ml-4">{label}</p>
        </span>
      ) : (
        <Link
          to={link}
          className="font-semibold text-base ml-4">
          {label}
        </Link>
      ),
  };
}

const items = [
  getItem(ITEMS_MENUS_SLIDER.DASHBOARD.LABEL, ITEMS_MENUS_SLIDER.DASHBOARD.KEY, ROUTES.HOME_PAGE, <Icon component={IconDashboard} />),
  getItem(ITEMS_MENUS_SLIDER.THU_THAP_TTKH.LABEL, ITEMS_MENUS_SLIDER.THU_THAP_TTKH.KEY, null, <Icon component={IconThuThap} />, [
    getItem(ITEMS_MENUS_SLIDER.THU_THAP_KH_MOI.LABEL, ITEMS_MENUS_SLIDER.THU_THAP_KH_MOI.KEY, ROUTES.THU_THAP_TTKH, <Icon component={IconSubMenu} />),
    getItem(ITEMS_MENUS_SLIDER.THU_THAP_KH_THEO_FILE.LABEL, ITEMS_MENUS_SLIDER.THU_THAP_KH_THEO_FILE.KEY, ROUTES.THU_THAP_KH_THEO_FILE, <Icon component={IconSubMenu} />),
  ]),
  getItem(ITEMS_MENUS_SLIDER.KHO_KH.LABEL, ITEMS_MENUS_SLIDER.KHO_KH.KEY, null, <Icon component={IconPhanGiao} />, [
    getItem(ITEMS_MENUS_SLIDER.KHO_KH_HIEN_HUU.LABEL, ITEMS_MENUS_SLIDER.KHO_KH_HIEN_HUU.KEY, ROUTES.KHO_KH_HIEN_HUU, <Icon component={IconSubMenu} />),
    getItem(ITEMS_MENUS_SLIDER.KHO_KH_MOI.LABEL, ITEMS_MENUS_SLIDER.KHO_KH_MOI.KEY, ROUTES.KHO_KH_MOI, <Icon component={IconSubMenu} />),
  ]),
  getItem(ITEMS_MENUS_SLIDER.PHAN_GIAO_KH.LABEL, ITEMS_MENUS_SLIDER.PHAN_GIAO_KH.KEY, ROUTES.PHAN_GIAO_KH, <Icon component={IconPhanGiao} />),
  getItem(ITEMS_MENUS_SLIDER.TRUYEN_THONG.LABEL, ITEMS_MENUS_SLIDER.TRUYEN_THONG.KEY, ROUTES.TRUYEN_THONG, <Icon component={IconTruyenThong} />),
  getItem(ITEMS_MENUS_SLIDER.TAI_KHOAN.LABEL, ITEMS_MENUS_SLIDER.TAI_KHOAN.KEY, null, <Icon component={IconTaiKhoan} />, [
    getItem(ITEMS_MENUS_SLIDER.TAI_KHOAN_SUB.LABEL, ITEMS_MENUS_SLIDER.TAI_KHOAN_SUB.KEY, ROUTES.TAI_KHOAN),
    getItem(ITEMS_MENUS_SLIDER.NHOM_TAI_KHOAN.LABEL, ITEMS_MENUS_SLIDER.NHOM_TAI_KHOAN.KEY, ROUTES.NHOM_TAI_KHOAN),
    getItem(ITEMS_MENUS_SLIDER.PHAN_QUYEN.LABEL, ITEMS_MENUS_SLIDER.PHAN_QUYEN.KEY, ROUTES.PHAN_QUYEN),
  ]),
];

function MainPage() {
  const location = useLocation();
  const [collapsible, setCollapsible] = useState(false);
  const [itemsBreadcrumb, setItemsBreadcrumb] = useState([
    {
      title: (
        <Link
          to={ROUTES.HOME_PAGE}
          className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
          <HomeOutlined />
        </Link>
      ),
    },
  ]);

  useEffect(() => {
    setItemsBreadcrumb(() => {
      const pathName = location.pathname;
      const arrayPathName = pathName.split('/');

      let resArr = [
        {
          title: (
            <Link
              to={ROUTES.HOME_PAGE}
              className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
              <HomeOutlined />
            </Link>
          ),
        },
      ];

      arrayPathName.forEach((el, id) => {
        if (el !== '' && isNaN(el) && BREADCRUMB_PATH[el]) {
          if (id === arrayPathName.length - 1) resArr.push({ title: <span className="text-sm font-semibold text-cs_gray">{BREADCRUMB_PATH[el]}</span> });
          else
            resArr.push({
              title: (
                <Link
                  to={el}
                  className="font-medium text-sm text-indigo-600 hover:text-indigo-500">
                  {BREADCRUMB_PATH[el]}
                </Link>
              ),
            });
        }
      });

      return resArr;
    });
  }, [location]);

  return (
    <Layout style={{ minHeight: '110vh' }}>
      <Sider
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 32 }}
        width={280}
        theme="light"
        collapsible
        onCollapse={(e) => setCollapsible(e)}>
        <Link
          to={ROUTES.HOME_PAGE}
          className="block">
          <div className="flex justify-evenly items-center text-blue-600 p-2">
            <img
              className="h-12"
              src={iconLogoVNPTBlue}
              alt="logo"
            />
            {collapsible ? null : <h3 className="text-4xl font-bold">VNPT</h3>}
          </div>
        </Link>
        <div className="h-0.5 bg-blue-600 mx-2 mb-4" />
        <ConfigProvider
          theme={{
            components: {
              Menu: defaultMenu,
            },
          }}>
          <Menu
            defaultSelectedKeys={[ITEMS_MENUS_SLIDER.DASHBOARD.KEY]}
            mode="inline"
            items={items}
            expandIcon={<IconDown />}
          />
        </ConfigProvider>
      </Sider>
      <Layout>
        <AppHeader />
        <Content
          className="px-4 transition-all"
          style={{ paddingRight: 0, paddingLeft: collapsible ? 80 : 280, background: '#F1F5F9' }}>
          <Breadcrumb
            className="h-12 bg-white border-y flex items-center sticky top-0"
            style={{ margin: '20px 0', paddingLeft: 42 }}
            items={itemsBreadcrumb}
            separator={
              <span
                className="text-cs_textGray text-base font-semibold"
                style={{ lineHeight: 'normal' }}>
                {'>'}
              </span>
            }
          />
          <div className="px-8 min-h-screen bg-slate-100">
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{ paddingTop: 16, paddingBottom: 16 }}
          className="text-center">
          © Bản Quyền thuộc Tập đoàn Bưu chính Viễn thông Việt Nam
        </Footer>
      </Layout>
    </Layout>
  );
}

export default MainPage;
