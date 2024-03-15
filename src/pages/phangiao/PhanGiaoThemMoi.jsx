import React, { useState } from 'react';
import { Input, Select } from 'antd';
import Search from 'antd/lib/input/Search';
import { Button } from '@/component/common';
import { faAnglesDown, faAnglesUp, faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../phangiao/styles.scss';

const customerBehavierData = [
  {
    value: 'hh',
    label: 'Hiện hữu',
  },
  {
    value: 'ttm',
    label: 'Thu thập mới',
  },
];

const campaignData = [
  {
    value: 'online',
    label: 'Online',
  },
  {
    value: 'ob',
    label: 'OB',
  },
  {
    value: 'b2a',
    label: 'B2A',
  },
  {
    value: 'all',
    label: 'Toàn trình',
  },
];

const campaignNameData = [
  {
    value: 'cd1',
    label: 'Chiến dịch 1',
  },
  {
    value: 'cd2',
    label: 'Chiến dịch 2',
  },
  {
    value: 'cd3',
    label: 'Chiến dịch 3',
  },
];

function PhanGiaoThemMoi() {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  const handleSelectCustomerBehavior = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSelectCampaign = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSearchCustomerBehavior = (value, _e, info) => console.log(info?.source, value);

  const handleChangeCampaignName = (value) => {
    console.log(`selected ${value}`);
  };
  const handleSearchCampaignName = (value) => {
    console.log('search:', value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div className="mx-12 bg-white rounded-xl p-5">
      {/* Tên phân giao khách hàng */}
      <div className="w-1/2 mb-4">
        <p className="font-semibold text-base mb-1">Tên phân giao khách hàng</p>
        <Input />
      </div>

      {/* Chọn tập hành vi khách hàng */}
      <div className="mb-4">
        <p className="font-semibold text-base mb-1">Chọn tập hành vi khách hàng</p>
        <div className="flex gap-2">
          <Select
            className="w-1/4"
            defaultValue="hh"
            onChange={handleSelectCustomerBehavior}
            options={customerBehavierData}
          />
          <Search
            className="flex flex-1"
            placeholder="Tìm kiếm tập hành vi khách hàng"
            onSearch={handleSearchCustomerBehavior}
          />
        </div>
        <p className="my-2">Tập có 485 thuê bao</p>
        {/* Collapse */}
        <div className="collapse-container">
          {/* Collapse content */}
          <div className={collapseOpen ? 'expanded' : 'collapsed'}>
            <div className="bg-slate-100 px-4 pt-3 pb-4 rounded-lg mb-2">
              <div className="mb-4">
                <p className="font-semibold mb-2">Nhân khẩu học</p>
                <ul className="bg-white rounded-lg px-4 py-2">
                  <li>Giới tính: Nữ</li>
                  <li>Độ tuổi: 35 - 45</li>
                  <li>Ngành nghề: Văn phòng</li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="font-semibold mb-2">Hành vi sử dụng</p>
                <ul className="bg-white rounded-lg px-4 py-2">
                  <li>Sử dụng Vinaphone chưa có Fiber, MyTV</li>
                  <li>Sử dụng điện thoại cố định chưa có Fiber, MyTV</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-2">Thông tin B2A</p>
                <ul className="bg-white rounded-lg px-4 py-2">
                  <li>Đã thực hiện B2A - 2 lần - Đã tiếp xúc</li>
                </ul>
              </div>
            </div>
          </div>
          {/* Toggle */}
          <div
            className="flex align-middle gap-2 hover:cursor-pointer hover:text-blue-400 text-blue-600 font-medium"
            onClick={toggleCollapse}>
            <div className="flex flex-col justify-center">
              <FontAwesomeIcon icon={collapseOpen ? faAnglesUp : faAnglesDown} />
            </div>
            <p className="leading-5">{collapseOpen ? 'Thu gọn' : 'Xem chi tiết các tiêu chí'}</p>
          </div>
        </div>
      </div>

      {/* Chiến dịch */}
      <div className="mb-4">
        <p className="font-semibold text-base mb-1">Chiến dịch</p>
        <Select
          className="w-1/4"
          defaultValue="b2a"
          onChange={handleSelectCampaign}
          options={campaignData}
        />
        <div className="flex gap-2 mt-2">
          <Select
            className="w-3/4"
            showSearch
            placeholder="Tên chiến dịch trên OneBSS"
            optionFilterProp="children"
            onChange={handleChangeCampaignName}
            onSearch={handleSearchCampaignName}
            filterOption={filterOption}
            options={campaignNameData}
          />
          <Input
            className="flex flex-1"
            placeholder="Mã chiến dịch"
            disabled
          />
        </div>
        <a
          className="flex align-middle mt-2 gap-1 font-sm text-blue-500"
          href="#">
          <div className="flex flex-col justify-center">
            <FontAwesomeIcon icon={faHandPointRight} />
          </div>
          <u className='font-medium'>Tạo mới chiến dịch</u>
        </a>
      </div>

      {/*Group Button */}
      <div className="flex gap-2 justify-end">
        <Button
          isDefault
          text="Đóng"
        />
        <Button
          isDefault
          text="Lưu nháp"
        />
        <Button text="Gửi dữ liệu" />
      </div>
    </div>
  );
}

export default PhanGiaoThemMoi;
