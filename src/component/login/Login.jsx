import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import md5Hex from 'md5-hex';

import { REGEX_EMAIL } from '@/constants/HelperConstants';
import { selectAuth } from '@/redux/auth/selectors';
import { login } from '@/redux/auth/actions';
import { HOME_PAGE } from '@/router/routes';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { iconLogoVNPTBlue } from '@/assets/images';
import '@/component/login/style.scss';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess } = useSelector(selectAuth);
  const [visible, setVisible] = useState(true);

  const handleSubmit = (values) => {
    const data = {
      email: values.email,
      password: md5Hex(`${values.password}_CJm@2021`),
    };
    dispatch(login({ loginData: data }));
  };

  useEffect(() => {
    if (isSuccess) navigate(HOME_PAGE);
  }, [isSuccess]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src={iconLogoVNPTBlue}
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
        </div>
        <Form
          name="basic"
          className="mt-8 space-y-6"
          onFinish={handleSubmit}
          // initialValues={{
          //   email: cookies.get('email') || '',
          //   remember: localStorage.getItem('remember') ? true : false,
          // }}
        >
          <input
            type="hidden"
            name="remember"
            defaultValue="true"
          />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <Form.Item className={`input-common `}>
                <Form.Item
                  name={'email'}
                  noStyle
                  rules={[
                    { required: true, message: 'Required field cannot be left blank' },
                    { pattern: REGEX_EMAIL, message: 'Email invalidate' },
                  ]}>
                  <Input
                    placeholder="&nbsp;"
                    autoComplete="true"
                    className={`custom-input`}
                  />
                </Form.Item>
                <span className="input-common__placeholder">{'Email'}</span>
              </Form.Item>
            </div>
            <div>
              <Form.Item className={`input-common`}>
                <Form.Item
                  name={'password'}
                  noStyle
                  rules={[{ required: true, message: 'Required field cannot be left blank' }]}>
                  <Input
                    placeholder="&nbsp;"
                    autoComplete="true"
                    className={`custom-input`}
                    type={'password'}
                  />
                </Form.Item>
                <span className="input-common__placeholder">{'Password'}</span>

                <div className="absolute inset-y-0 right-4 pr-3 flex items-center text-sm leading-5">
                  <FontAwesomeIcon
                    icon={visible ? faEye : faEyeSlash}
                    className="text-2xl"
                    onClick={() => setVisible(!visible)}
                  />
                </div>
              </Form.Item>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Form.Item
                name="remember"
                valuePropName="checked"
                className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <Checkbox className="w-32">Remember me</Checkbox>
              </Form.Item>
            </div>

            {/* <div className="text-sm">
              <Link
                to={FORGOT_PASSWORD}
                className="font-medium text-sm text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div> */}
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm
               font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2
               focus:ring-indigo-500">
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
