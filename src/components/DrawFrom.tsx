import { Drawer } from 'antd';
import * as React from 'react';
import RegisterForm from './RegisterForm';

interface IPageProps {
  visible: boolean;
  onClose?:any;
}
interface IPageState {
  show: boolean
}
class DrawerForm extends React.Component<IPageProps, IPageState> {
  public render() {
    return (
      <div>
        <Drawer
          title="注册"
          width={500}
          placement="right"
          onClose={this.props.onClose}
          maskClosable={false}
          visible={this.props.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
        <RegisterForm onClose={this.props.onClose}/>
        </Drawer>
      </div>
    );
  }
}
export default DrawerForm;