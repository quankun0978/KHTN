import PropTypes from 'prop-types';
import { Form } from 'antd';
import { Button, SelectForm } from '@/component/common';
import { IconTrash } from '@/component/common/Icon';

function FormListItemLabel({ labelFirst, labelSecond }) {
  return (
    <Form.List name="users">
      {(fields, { add, remove }) => {
        return (
          <div className="flex flex-col">
            {fields.map(({ key, name, ...restField }, id) => {
              return (
                <div
                  key={key}
                  className="flex items-baseline">
                  <div className="flex flex-col justify-center w-1/2 pr-4">
                    <SelectForm
                      label={labelFirst}
                      isRequired
                      placeholder="Lựa chọn"
                      list={[]}
                    />
                  </div>
                  <div className="flex flex-col justify-center w-1/2 pl-4">
                    <SelectForm
                      label={labelSecond}
                      placeholder="Lựa chọn"
                      list={[]}
                    />
                  </div>
                  <div
                    className="pl-2"
                    onClick={() => remove(name)}>
                    <IconTrash />
                  </div>
                </div>
              );
            })}
            <Form.Item className="inline-flex">
              <Button
                onClick={() => add()}
                block
                isDefault
                text="Thêm dịch vụ"
              />
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}
FormListItemLabel.propTypes = { labelFirst: PropTypes.string, labelSecond: PropTypes.string };
FormListItemLabel.defaultProps = { labelFirst: 'Dịch vụ', labelSecond: 'Loại hình thuê bao' };

export default FormListItemLabel;
