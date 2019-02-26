import * as React from 'react';
import { Layout, Menu, Icon, Button, Avatar, Breadcrumb } from 'antd';
import createHashHistory from "history/createHashHistory"
import { getOcr } from '../../utils/services'

const { Header, Sider, Footer, Content } = Layout
import './index.css';
interface IpageState {
  collapsed: boolean;
  listClassArray: MenueItem[];
  breadiconType: string;
  breadtext: string;
}
interface IpageProps {

}
interface MenueItem {
  key: string;
  iconType?: string;
  itemtext: string;
  group?: MenueItem[];
}
const hashHistory = createHashHistory({
  hashType: "noslash",
});
const SubMenu = Menu.SubMenu;


class IndexContainer extends React.Component<IpageProps, IpageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      collapsed: false,
      breadiconType: 'home',
      breadtext: '首页',
      listClassArray: [
        {
          key: '1',
          iconType: 'home',
          itemtext: '首页'
        },
        {
          key: '2',
          iconType: 'pie-chart',
          itemtext: '数据统计'
        },
        {
          key: 'sub1',
          iconType: 'read',
          itemtext: '文章管理',
          group: [{
            key: '6',
            itemtext: '文章发布',
          },{
            key:'7',
            itemtext: '文章审核'
          }]
        },
        {
          key: '4',
          iconType: 'team',
          itemtext: '用户管理'
        },
        {
          key: '5',
          iconType: 'global',
          itemtext: '广告管理'
        }
      ]
    }
  }

  componentWillMount() {
    hashHistory.push('/home');
  }

  componentDidMount () {
    this.getIdCarInfo();
  }

  getIdCarInfo() {
    getOcr().then((res: any) => {
      console.log(res)
      if(res) {
        this.getIdCarInfo();
      }

    }).catch(err => {
      console.log(err)
    })
  }

  toggleCollapsed = (): void => {
    this.setState({
      collapsed: !this.state.collapsed
    }, () => {
      console.log(this.state.collapsed);
    })
  }
  //点击菜单
  handleClick = (item: any): void => {
    let bredicontype: string = '';
    let breadtext: string = '';
    console.log(item);
    switch (parseInt(item.key)) {
      case 1:
        hashHistory.push('/home');
        bredicontype = 'home';
        breadtext = '首页';
        break;
      case 2:
        hashHistory.push('/dashbord');
        bredicontype = 'pie-chart';
        breadtext = '数据统计';
        break;
      case 3:
        hashHistory.push('/home')
        bredicontype = 'read';
        breadtext = '文章管理';
        break;
      case 4:
        hashHistory.push('/article')
        bredicontype = 'team';
        breadtext = '用户管理';
        break;
      case 5:
        hashHistory.push('/adv')
        bredicontype = 'global';
        breadtext = '广告管理';
      case 6:
        hashHistory.push('/mangeArticle/publish')
        bredicontype = 'read';
        breadtext = '文章发布';
        break;
      case 7:
        hashHistory.push('/mangeArticle/examine')
        bredicontype = 'read';
        breadtext = '文章审核';
        break;
      default:
        break;
    }
    this.setState({
      breadiconType: bredicontype,
      breadtext
    })
  }
  /**
   * render
   */
  public render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible={true} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <Avatar size={42} icon="user" />
            {!this.state.collapsed && <strong className="hello">EastM个人博客系统</strong>}
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleClick} >
            {
              this.state.listClassArray.map((item) => {
                if (item.key.search(/sub/g) > -1) {
                  return (
                    <SubMenu key={item.key} title={<span><Icon type={item.iconType} /><span>{item.itemtext}</span></span>}>
                      {
                        item.group && item.group.map(chiitem => {
                          return (
                            <Menu.Item key={chiitem.key}>{chiitem.itemtext}</Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                } else {
                  return (
                    <Menu.Item key={item.key}>
                      <Icon type={item.iconType} />
                      <span className="nav-text">{item.itemtext}</span>
                    </Menu.Item>
                  )
                }
              })
            }
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200}} >
          <Header style={{ background: '#fff', paddingLeft: 20 }}>
            <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
              <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
            </Button>
            <div style={{ display: 'inline-block', marginLeft: 20 }}>
              <Breadcrumb>
                <Breadcrumb.Item >
                  <Icon type="home" />
                </Breadcrumb.Item>
                <Breadcrumb.Item >
                  <Icon type={this.state.breadiconType} />
                  <span>{this.state.breadtext}</span>
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </Header>
          <Content style={{ overflow: 'initial' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}

export default IndexContainer;