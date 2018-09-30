import { Button, Form, Input,  Select, Row } from 'antd';
import * as React from 'react';
import { register, checkusername } from '../utils/services';
import { message } from 'antd'

interface Ipros {
  form: any,
  onClose: any,
}
interface Istate {
  accountvalue: string;
  isValidusername:boolean;
}
const { Option } = Select;

class RegisterForm extends React.Component<Ipros,Istate> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountvalue:'',
      isValidusername: true,
    }
  }

  public handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values:any) => {
      console.log(err);
      if (!err) {
          // let v: object = values;
          register({
            username: values.account,
            email: values.email,
            password: values.password,
            sex: values.sex,
            telphone: values.telphone,
            desc: values.desc
          }).then( ({data})=> {
            if(!data.result.resultCode) {
              message.success('注册成功');
              this.props.onClose();
            } else {
              message.error(data.result.resultMessage);
            }
          }).catch(err=> {
            message.error('服务器出错');
          })
      }
    });
  }

  public compareusername = (rule:any, value:any, callback:any):void => {
    let account: string = this.props.form.getFieldValue('account');
    checkusername({ username: account }).then(({ data }) => {
      if (data.result.resultCode) {
        message.error(data.result.resultMessage);
        callback(data.result.resultMessage);
      } else {
        callback();
      }
    }).catch(err => {
      message.error('服务器出错');
    })
  }

  render () {
    const { getFieldDecorator } = this.props.form;
    const prefixSelector = getFieldDecorator('prefix',{
      initialValue: '86',
    })(
      <Select style={{width: 70}}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );
    return (
      <Form layout="vertical" hideRequiredMark={false} onSubmit={this.handleSubmit}>
      <Row gutter={6}>
          <Form.Item label="账号">
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '请输入您的账号!',
              },{
                  validator: this.compareusername,
              }],
            })(
              <Input type="text" />
            )}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: '请输入您的密码!',
              }],
            })(
              <Input type="password" />
            )}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: '您输入的邮箱不可用!',
              }, {
                required: true, message: '请输入您的邮箱!',
              }],
            })(
              <Input />
            )}
          </Form.Item>
          <Form.Item label="性别">
            {getFieldDecorator('sex', {
              rules: [{
                required: true, message: '请选择您的性别!',
              }],
            })(
              <Select placeholder="请选择您的性别">
                <Option value="男">男</Option>
                <Option value="女">女</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('telphone', {
              rules: [{
                required: true, message: '请输入您的手机号!',
              }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
            )}
          </Form.Item>
          <Form.Item label="个人描述">
          {getFieldDecorator('desc',{
            rules:[{
              required: false
            }]
          })(
              <Input.TextArea rows={4} placeholder="请输入您的描述信息" />
          )}
          </Form.Item>
      </Row>

        <div
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'right',
            borderTop: '1px solid #e8e8e8',
            borderRadius: '0 0 4px 4px',
            left: 0,
            bottom: 0,
            padding: '10px 16px',
            background: '#fff',
          }}
        >
          <Button
            style={{
              marginRight: 8,
            }}
            onClick={this.props.onClose}
          >
            取消
            </Button>
          <Button type="primary" htmlType="submit" >确定</Button>
        </div>
      </Form>
    )
  }
}

export default Form.create()(RegisterForm);
