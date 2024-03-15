import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import FormListNhanKhauHoc from '@/forms/FormListNhanKhauHoc';
import { Button, Card, ModalSimple } from '@/component/common';
import Input from '@/component/common/Input/Input';
import { DATA_NHAN_KHAU_HOC } from '@/variables/FakeData';
import { listDemographic } from '@/redux/khokhachhang/actions';

function KhoHienHuuThemMoi() {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // get list nhan khau hoc
    dispatch(listDemographic());
  }, []);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  const onOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className="bg-white px-5 py-4 mx-10 rounded-lg">
      <div className="w-full mb-4 pr-1">
        <p className="text-base font-medium mb-1">Hành vi khách hàng</p>
      </div>
      <Card title="Nhân khẩu học">
        <FormListNhanKhauHoc
          listData={DATA_NHAN_KHAU_HOC}
          onFinish={onFinish}
        />
      </Card>
      <Card
        title="Hành vi sử dụng"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Hành vi tiêu dùng"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Trải nghiệp khách hàng"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Bao gồm/Không bao gồm tập hành vi khách hàng khác"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Thông tin truyền thông (Online)"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Thông tin OB"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <Card
        title="Thông tin B2A"
        customClass="mt-5">
        <FormListNhanKhauHoc onFinish={onFinish} />
      </Card>
      <div className="flex ">
        <Button
          text="Open Modal"
          onClick={onOpenModal}
        />
      </div>

      <ModalSimple
        content={
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.currentTarget.value);
            }}
          />
        }
        title={'Tên tập khách hàng'}
        isModalOpen={openModal}
        toggleModal={setOpenModal}
      />
    </div>
  );
}

export default KhoHienHuuThemMoi;
