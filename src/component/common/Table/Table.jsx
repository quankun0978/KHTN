import React from 'react';
import { Space, Table as TableAnt } from 'antd';
import PropTypes from 'prop-types';

import Select from '@/component/common/Select/Select';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const listSize = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 50, label: '50' },
];

const Table = ({ data, customClass, page, pageSize, action, position, totalPage, showSizeChanger, setPage, setPageSize, columns, showTotal, ...rest }) => {
  return (
    <>
      <TableAnt
        {...rest}
        className={`custom-table ${customClass}`}
        columns={columns({ page: page, pageSize: pageSize, ...action })}
        dataSource={data}
        pagination={{
          position: position,
          hideOnSinglePage: false,
          current: +page,
          pageSize: pageSize,
          total: totalPage,
          showSizeChanger: false,
          itemRender: (_, type, originalElement) => {
            if (type === 'prev') {
              return <FontAwesomeIcon icon={faAnglesLeft} />;
            }
            if (type === 'next') {
              return <FontAwesomeIcon icon={faAnglesRight} />;
            }
            return originalElement;
          },
          showTotal: !!showTotal && ((total) => <span>Có tổng {total} bản ghi</span>),
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      {!!showSizeChanger && (
        <div className="flex items-center">
          <Space size="middle">
            <span className="text-sm font-medium text-cs_gray">Số bản ghi mỗi trang</span>
            <div className="w-16 h-6">
              <Select
                size="small"
                list={listSize}
                initialValue={10}
                onSelect={(value) => {
                  setPage(1);
                  setPageSize(value);
                }}
              />
            </div>
          </Space>
        </div>
      )}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  customClass: PropTypes.string,
  page: PropTypes.number,
  pageSize: PropTypes.number,
  action: PropTypes.object,
  position: PropTypes.array,
  totalPage: PropTypes.number,
  showSizeChanger: PropTypes.bool,
  setPage: PropTypes.func,
  setPageSize: PropTypes.func,
  columns: PropTypes.func,
  showTotal: PropTypes.bool,
};

Table.defaultProps = {
  data: [],
  extensionClass: '',
  page: 1,
  pageSize: 20,
  action: {},
  position: ['bottomRight'],
  totalPage: 0,
  showSizeChanger: false,
  setPage: () => {},
  setPageSize: () => {},
  columns: () => {},
  showTotal: false,
};

export default React.memo(Table);
