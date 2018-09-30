import { Button, Checkbox, Form, Icon, Input, message, } from 'antd';
import createHashHistory from "history/createHashHistory"
import * as React from 'react';
import { login } from './utils/services'
import './App.css';
import DrawerForm from './components/DrawFrom';
// import logo from './logo.svg';
const FormItem = Form.Item
const hashistory = createHashHistory(
  {
    hashType: "noslash", // the default
  }
);
// const { Header, Content, Footer, Sider } = Layout;
interface IForm {
  name: string;
  password: string;
}
interface IPageProps {
  form: any;
  forms?: IForm;
}
interface IPageState {
  showDraw: boolean;
}
class App extends React.Component<IPageProps, IPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showDraw: false,
    }
  }

  public handleSubmit = (e: any): void => {
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      login({ username: values.username, password: values.password }).then(({ data }) => {
        if (data.result.resultCode) {
          message.error(data.result.resultMessage);
        }
        else {
          message.success(data.result.resultMessage);
          hashistory.push('/home');
          // this.props.location.push('/home');
        }
      }).catch(err => {
        message.error('服务器出错');
      });
    }
      // console.log(111)
    )
  }
  // public componentDidMount() {

  // }

  public showDraw = (e: any): void => {
    e.preventDefault();
    this.setState({
      showDraw: true
    })
  }
  public closedraw = (): void => {
    console.log(11)
    this.setState({
      showDraw: false,
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form
    // const { history } = this.props;
    return (
      <div className="App-container">
        <DrawerForm visible={this.state.showDraw} onClose={this.closedraw} />
        <div className="App">
          <div className="pagetitle">
            EastM 个人博客系统
                </div>
          <div className="loginBox">
            <Form onSubmit={this.handleSubmit} className="login-form">
              <h2 className="title">用户登录</h2>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [
                    { required: true, message: '请输入您的账号' }
                  ],
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} name="username" placeholder="用户名" />
                )}

              </FormItem>
              <FormItem>
                {
                  getFieldDecorator('password', {
                    rules: [
                      { required: true, message: '请输入您的密码' }
                    ],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" name="password" placeholder="密码" />
                  )
                }
              </FormItem>
              <FormItem >
                <Checkbox>记住我</Checkbox>
                <a className="login-form-forgot" href="">忘记密码</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登录
              </Button>
                <a className="registerhref" onClick={this.showDraw}>现在注册!</a>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create()(App);
