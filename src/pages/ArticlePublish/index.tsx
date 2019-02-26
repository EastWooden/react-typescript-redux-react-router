import * as React from 'react'
import { Tabs, Form, Input, Button, Select, Table, Divider, Tag, Modal, message, Popconfirm } from 'antd';
import { EditorState, convertToRaw, ContentState} from 'draft-js'
import draftToHtml from 'draftjs-to-html';
import htmlTodraft from 'html-to-draftjs'
import { addArticle, getArticleList, deleteArticle, updateArticle } from '../../utils/services';
import { connect } from 'react-redux';
import './index.css'
import '../../assets/style/base.css'
import ArticleForm from '../../components/ArticleForm'
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

interface IpageProps {

}
interface IpageState {
  isSearching: boolean;
  modalvisible: boolean;
  confirmLoading: boolean;
  editorState: any;
  inputValue: string;
  tags: string[];
  articleName: string;
  articleType:string;
  articleClasstype:string;
  articleContentText:string;
  publishloading:boolean;
  articleList:any[];
  pagenation: PageNation;
  totalCount:number;
  isAddNewArt: boolean;
  articleId: number;
}
interface StateProps  {
  tags:string[];
}

interface PageNation {
  total:number;
  pageSize:number;
  current:number;
  defaultCurrent:number;
}
const mapStateToProps = (state:any) => {
  return {
    tags: state.articleForm.tags
  }
}
const mapDispatchToProps = (dispatch:any) => {
  return {

  }
}
type Iprops = IpageProps & StateProps

class ArticlePublish extends React.Component<Iprops, IpageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      isSearching: false,
      modalvisible: false,
      confirmLoading: false,
      editorState: EditorState.createEmpty(),
      inputValue:'',
      tags:[],
      articleName: '',
      articleType:'',
      articleClasstype:'',
      articleContentText: '',
      publishloading: false,
      articleList:[],
      pagenation:{  //当前文章列表的信息
        total: 0,
        pageSize: 10,
        current:1,
        defaultCurrent: 1,
      },
      totalCount:0,
      isAddNewArt: true,
      articleId:0
    }
  }

  componentWillMount = () => {
    this.getArticleList(this.state.pagenation.current);
  }
  //切换页码
  pagenationChange = (e:any)=> {
    const { pagenation } =  this.state;
    pagenation.current = e.current;
    this.getArticleList(e.current);
    this.setState({
      pagenation,
    })
  }


  // 切换tab
  switchTab = (key: any) => {
    console.log(key);
  }
  //搜索文章
  searchArticle = () => {

  }
  getArticleList = (pagenum:number) => {
    getArticleList({ pageNum: pagenum }).then(({ data }: any) => {
      let articleList: [] = data.entity.rows;
      let totalCount: number = data.entity.totalCount;
      let pagenation: PageNation = {
        total: totalCount,
        pageSize: 10,
        current: pagenum,
        defaultCurrent: 1,
      };
      if (articleList.length) {
        articleList.forEach((item: any, index: number) => {
          item.key = index + 1;
          if (item.publishState == 1) {
            item.publishState = ['已发布'];
          } else if (item.publishState == 0 || item.publishState == null) {
            item.publishState = ['未发布']
          } else if(item.publishState == 2) {
            item.publishState = ['审核中']
          }

        })
        this.setState({
          articleList,
          totalCount,
          pagenation
        })
      }
    }).catch((err: any) => {
      message.error('服务器出错')
    })
  }
  //保存文章
  saveArticle = (): void | boolean => {
    const { tags } = this.props;
    let tagstring:string = '';
    if(tags.length) {
      tagstring = tags.join(',');
    }
    const { articleName,articleContentText,articleClasstype,articleType,isAddNewArt,articleId } = this.state;
    if (articleName == '') {
      message.error('文章名称不能为空');
      return false;
    }
    if (articleContentText === '<p></p>' || articleContentText == ''){
      message.error('文章内容不能为空');
      return false;
    }
    if (articleClasstype == '') {
      message.error('请选择文章类型');
      return false;
    }
    if (articleType == '') {
      message.error('请选择文章分类');
      return false;
    }
    this.setState({
      publishloading: true
    })

    if (isAddNewArt) {
      addArticle({
        articleName: articleName,
        articleContent: articleContentText,
        BlogClassification: articleClasstype,
        articleType: articleType,
        articleTags: tagstring
      }).then(({ data }) => {
        let resultCode = data.result.resultCode;
        if (!resultCode) {
          this.setState({
            publishloading: false
          })
          message.success('保存成功');
          const { pagenation } = this.state;
          this.getArticleList(pagenation.current);
        }
      }).catch(err => {
        message.error('保存文章出错');
        this.setState({
          publishloading: false
        })
      })
    } else {
      updateArticle({
        id: articleId,
        articleName: articleName,
        articleContent: articleContentText,
        BlogClassification: articleClasstype,
        articleType: articleType,
        articleTags: tagstring
      }).then(({data})=> {
        if(!data.result.resultCode) {
          this.setState({
            publishloading: false
          })
          message.success('保存成功')
          const { pagenation } = this.state;
          this.getArticleList(pagenation.current);
        } else {
          message.error(data.result.resultMessage)
        }
      }).catch(err=> {
        message.error('服务器出错');
        this.setState({
          publishloading: false
        })
      })
    }

    this.setState({
      modalvisible: false
    })
  }

  //点击模态框取消按钮
  handleCancel = () => {
    this.setState({
      modalvisible: false,
    })
  }
  //编辑文章
  editArticle = (text:any,record:any)=> {
    return ()=> {
      //'将字符串转化为文字标签'
      if (text.articleContent) {
        const blocksFromHtml = htmlTodraft(text.articleContent);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        this.setState({
          modalvisible: true,
          editorState: editorState,
          articleName: text.articleName,
          isAddNewArt: false,
          articleId: text.id
        })
      }
    }
  }

  //删除文章
  delArticle = (text:any,record: any) => {
    const { articleList } = this.state;
    return () => {

      deleteArticle({ id: text.id }).then(({ data }) => {
        console.log(data)
        if(!data.result.resultCode) {
          let newarticleList: any[] = [];
          newarticleList  =  articleList.filter((item:any) => {
            return item.id !== text.id
          })
          this.setState({
            articleList: newarticleList
          })
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
  //点击新增文章
  addArticle = () => {
    this.setState({
      modalvisible: true,
      editorState: '',
      articleName: '',
      isAddNewArt: true
    })
  }
  //获取文章标题
  getArticleName = (e: any) => {
    this.setState({
      articleName: e.target.value
    })
  }
  //获取文章内容
  onEditorStateChange: Function = (editorState: any): void => {
    let text = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      editorState,
      articleContentText: text
    })
  }
  //获取文章类型的值
  onarticletypeChange = (e:any)=> {
    this.setState({
      articleType: e
    })
  }

  //获取文章分类的值
  onarticleClassChange = (e:any) => {
    this.setState({
      articleClasstype: e
    })
  }
  chooseTagColor = (tag:string) :string=> {
    if(tag == '已发布') {
      return '#87d068'
    } else if (tag == '提审中') {
      return '#2db7f5'
    } else if(tag == '未发布') {
      return '#f50'
    } else {
      return '#108ee9'
    }
  }
  public render() {
    const columns = [{
      title: '文章名称',
      dataIndex: 'articleName',
      key: 'articleName',
      render: (text: any) => <a href="javascript:;">{text}</a>,
    }, {
      title: '文章类别',
        dataIndex: 'BlogClassification',
        key: 'BlogClassification',
    }, {
      title: '创建人',
      dataIndex: 'createPerson',
      key: 'createPerson',
    }, {
      title: '创建时间',
        key: 'createdAt',
        dataIndex: 'createdAt',
    }, {
      title: '发布时间',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
    },
    {
      title: '发布状态',
      key: 'publishState',
      dataIndex: 'publishState',
      render: (tags: any) => (
        <span>
          {tags.map((tag: any) => <Tag color={this.chooseTagColor(tag)} key={tag}>{tag}</Tag>)}
        </span>
      ),
    },

    {
      title: '操作',
      key: 'action',
      render: (text: any, record: any) => (
        <span>
          <a href="javascript:;" onClick={this.editArticle(text,record)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm title="确定要删除此文章吗?" onConfirm={this.delArticle(text, record)} okText="确定" cancelText="取消">
            <a href="javascript:;" >删除</a>
          </Popconfirm>
        </span>
      ),
    }];
    const { publishloading } = this.state
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
              <Button icon="plus" className="btn-newadd" type="primary" onClick={this.addArticle}>新增</Button>
            </div>
            <div className="article-list">
              <Table columns={columns} dataSource={this.state.articleList} pagination={this.state.pagenation} onChange={this.pagenationChange}  />
              <Modal title="编辑文章"
                visible={this.state.modalvisible}
                confirmLoading={this.state.confirmLoading}
                width={770}
                onCancel={this.handleCancel}
                footer={[
                  <Button key="back" onClick={this.handleCancel}>取消</Button>,
                  <Button key="submit" type="primary" loading={publishloading} onClick={this.saveArticle}>
                    确定
                </Button>,
                ]}
              >
                {this.state.modalvisible && <ArticleForm
                  articlename={this.state.articleName}
                  handleArcticleName={this.getArticleName}
                  editorState={this.state.editorState}
                  onEditorStateChange={this.onEditorStateChange}
                  onarticletypeChange={this.onarticletypeChange}
                  onarticleClassChange={this.onarticleClassChange}
                />}

              </Modal>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePublish)