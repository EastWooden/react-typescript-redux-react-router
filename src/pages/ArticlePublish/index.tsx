import * as React from 'react'
import { Tabs, Form, Input, Button, Select, Table, Divider, Tag } from 'antd';
import './index.css'
import '../../assets/style/base.css'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;
interface IpageProps {
}
interface IpageState {
  isSearching: boolean;
}

class ArticlePublish extends React.Component<IpageProps, IpageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSearching: false
    }
  }
  // 切换tab
  switchTab = (key: any) => {
    console.log(key);
  }
  //搜索文章
  searchArticle = () => {

  }
  public render() {

    const columns = [{
      title: '文章名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => <a href="javascript:;">{text}</a>,
    }, {
      title: '文章类别',
      dataIndex: 'category',
      key: 'category',
    }, {
      title: '创建人',
      dataIndex: 'createPerson',
      key: 'createPerson',
    }, {
      title: '创建时间',
      key: 'createTime',
      dataIndex: 'createTime',
    }, {
      title: '发布时间',
      key: 'publishTime',
      dataIndex: 'publishTime',
    },
    {
      title: '发布状态',
      key: 'publishState',
      dataIndex: 'publishState',
      render: (tags: any) => (
        <span>
          {tags.map((tag: any) => <Tag color="blue" key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <a href="javascript:;">编辑</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
        </span>
      ),
    }];

    const data = [{
      key: '1',
      name:'fdskfjdks',
      category: 'John Brown',
      createPerson: 32,
      createTime: 'New York No. 1 Lake Park',
      publishTime: '1323232',
      publishState: ['直接展示']

    },
    {
      key: '2',
      name: 'fdskfjdks',
      category: 'John Brown',
      createPerson: 32,
      createTime: 'New York No. 1 Lake Park',
      publishTime: '1323232',
      publishState: ['直接展示']

    },
    {
      key: '3',
      name: 'fdskfjdks',
      category: 'John Brown',
      createPerson: 32,
      createTime: 'New York No. 1 Lake Park',
      publishTime: '1323232',
      publishState: ['直接展示']

    },
    {
      key: '4',
      name: 'fdskfjdks',
      category: 'John Brown',
      createPerson: 32,
      createTime: 'New York No. 1 Lake Park',
      publishTime: '1323232',
      publishState: ['直接展示']

    },];
    return (
      <div className="article-punlish boxshandow borderRadius">
        <Tabs defaultActiveKey="1" onChange={this.switchTab}>
          <TabPane tab="文章列表" key="1">
            <div className="article-serarch ">
              <Form layout="inline" onSubmit={this.searchArticle}>
                <FormItem>
                  <Input type="text" placeholder="请输入文章的名称" />
                </FormItem>
                <FormItem>
                  <Select defaultValue={'文章类别'} style={{ width: 190 }}>
                    <Option value="javascript">javascript</Option>
                    <Option value="html">html</Option>
                    <Option value="css">css</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Select defaultValue={'发布状态'} style={{ width: 190 }}>
                    <Option value="未发布">未发布</Option>
                    <Option value="已发布">已发布</Option>
                    <Option value="css">css</Option>
                  </Select>
                </FormItem>
                <FormItem>
                  <Button icon="search" type="primary" loading={this.state.isSearching}>搜索</Button>
                </FormItem>
                <FormItem>
                  <Button icon="reload">重置</Button>
                </FormItem>
              </Form>
              <Button icon="plus" className="btn-newadd" type="primary">新增</Button>
            </div>
            <div className="article-list">
              <Table columns={columns} dataSource={data} />
            </div>
          </TabPane>
          <TabPane tab="文章排序" key="2">
            <div>
              排序
            </div>
            <div>list</div>
          </TabPane>
        </Tabs>

      </div>
    )
  }
}
export default ArticlePublish