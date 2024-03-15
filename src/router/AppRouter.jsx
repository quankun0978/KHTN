import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import * as ROUTES from './routes';

const MainPage = lazy(() => import('@/pages/MainPage'));

const NotFound = lazy(() => import('@/pages/404/NotFoundPage'));
const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));

const ThuThap = lazy(() => import('@/pages/tiemnang/ThuThap'));
const TiemNang = lazy(() => import('@/pages/tiemnang/TiemNang'));
const KhachHangThemMoi = lazy(() => import('@/pages/tiemnang/KhachHangThemMoi'));
const KhachHangXemChiTiet = lazy(() => import('@/pages/tiemnang/KhachHangXemChiTiet'));

const ThuThapTheoFile = lazy(() => import('@/pages/tiemnang/ThuThapTheoFile'));
const ThuThapTheoFileDanhSach = lazy(() => import('@/pages/tiemnang/ThuThapTheoFileDanhSach'));
const ThuThapTheoFileChiTiet = lazy(() => import('@/pages/tiemnang/ThuThapTheoFileChiTiet'));
const ThuThapTheoFileImport = lazy(() => import('@/pages/tiemnang/ThuThapTheoFileImport'));

const KhoHienHuu = lazy(() => import('@/pages/khokh/KhoHienHuu'));
const KhoHienHuuDanhSach = lazy(() => import('@/pages/khokh/KhoHienHuuDanhSach'));
const KhoHienHuuThemMoi = lazy(() => import('@/pages/khokh/KhoHienHuuThemMoi'));
const KhoHienHuuChiTiet = lazy(() => import('@/pages/khokh/KhoHienHuuChiTiet'));

const KhoMoi = lazy(() => import('@/pages/khokh/KhoMoi'));
const KhoMoiDanhSach = lazy(() => import('@/pages/khokh/KhoMoiDanhSach'));
const KhoMoiThemMoi = lazy(() => import('@/pages/khokh/KhoMoiThemMoi'));
const KhoMoiChiTiet = lazy(() => import('@/pages/khokh/KhoMoiChiTiet'));

const PhanGiao = lazy(() => import('@/pages/phangiao/PhanGiao'));
const PhanGiaoDanhSach = lazy(() => import('@/pages/phangiao/PhanGiaoDanhSach'));
const PhanGiaoThemMoi = lazy(() => import('@/pages/phangiao/PhanGiaoThemMoi'));

const TruyenThong = lazy(() => import('@/pages/truyenthong/TruyenThong'));
const TaiKhoan = lazy(() => import('@/pages/taikhoan/TaiKhoan'));
const NhomTaiKhoan = lazy(() => import('@/pages/nhomtaikhoan/NhomTaiKhoan'));
const PhanQuyen = lazy(() => import('@/pages/phanquyen/PhanQuyen'));
const NhomQuyenDanhSach = lazy(() => import('@/pages/phanquyen/NhomQuyenDanhSach.jsx'));
const NhomQuyenThemMoi = lazy(() => import('@/pages/phanquyen/NhomQuyenThemMoi.jsx'));
const NhomQuyenChiTiet = lazy(() => import('@/pages/phanquyen/NhomQuyenChiTiet'));
const NhomQuyenChinhSua = lazy(() => import('@/pages/phanquyen/NhomQuyenChinhSua'));
const NhomQuyenChiTietDefault = lazy(() => import('@/pages/phanquyen/NhomQuyenChiTietDefault'));

function AppRouter() {
  return useRoutes([
    {
      path: ROUTES.HOME_PAGE,
      element: <MainPage />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: ROUTES.THU_THAP_TTKH,
          element: <ThuThap />,
          children: [
            { index: true, element: <TiemNang /> },
            { path: ROUTES.NEW_THU_THAP_KH_MOI, element: <KhachHangThemMoi /> },
            { path: ROUTES.DETAIL_KH + '/:id', element: <KhachHangXemChiTiet /> },
          ],
        },
        {
          path: ROUTES.THU_THAP_KH_THEO_FILE,
          element: <ThuThapTheoFile />,
          children: [
            { index: true, element: <ThuThapTheoFileDanhSach /> },
            { path: ROUTES.NEW_THU_THAP_KH_THEO_FILE, element: <ThuThapTheoFileImport /> },
            { path: ROUTES.DETAIL_THU_THAP_KH_THEO_FILE + '/:id', element: <ThuThapTheoFileChiTiet /> },
          ],
        },
        {
          path: ROUTES.KHO_KH_HIEN_HUU,
          element: <KhoHienHuu />,
          children: [
            { index: true, element: <KhoHienHuuDanhSach /> },
            { path: ROUTES.NEW_KHO_KH_HIEN_HUU, element: <KhoHienHuuThemMoi /> },
            { path: ROUTES.DETAIL_KHO_KH_HIEN_HUU + '/:id', element: <KhoHienHuuChiTiet /> },
          ],
        },
        {
          path: ROUTES.KHO_KH_MOI,
          element: <KhoMoi />,
          children: [{ index: true, element: <KhoMoiDanhSach /> }],
        },

        {
          path: ROUTES.PHAN_GIAO_KH,
          element: <PhanGiao />,
          children: [
            { index: true, element: <PhanGiaoDanhSach /> },
            { path: ROUTES.NEW_PHAN_GIAO_KHI, element: <PhanGiaoThemMoi /> },
          ],
        },
        { path: ROUTES.TRUYEN_THONG, element: <TruyenThong /> },
        { path: ROUTES.TAI_KHOAN, element: <TaiKhoan /> },
        { path: ROUTES.NHOM_TAI_KHOAN, element: <NhomTaiKhoan /> },
        {
          path: ROUTES.PHAN_QUYEN,
          element: <PhanQuyen />,
          children: [
            { index: true, element: <NhomQuyenDanhSach /> },
            { path: ROUTES.THEM_MOI_NHOM_QUYEN, element: <NhomQuyenThemMoi /> },
            {
              path: ROUTES.CHI_TIET_NHOM_QUYEN+'/:id',
              element: <NhomQuyenChiTietDefault />,
              children: [
                { index: true, element: <NhomQuyenChiTiet /> },
                { path: ROUTES.CHINH_SUA_NHOM_QUYEN, element: <NhomQuyenChinhSua /> },
              ],
            },
          ],
        },
      ],
    },

    {
      path: ROUTES.NOT_FOUND,
      element: (
        <Navigate
          to={ROUTES.HOME_PAGE}
          replace
        />
      ),
    },
    { path: ROUTES.NOT_FOUND, element: <NotFound /> },
  ]);
}

export default AppRouter;
