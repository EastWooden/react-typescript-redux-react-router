import * as React from 'react'
import { Form, Input, Tag, Tooltip, Icon,Select } from 'antd';
import './ArticleForm.css'
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { connect } from 'react-redux';
import * as types from '../store/types'
import { getArticleDetail } from '../utils/services'
const FormItem = Form.Item;
const Option = Select.Option;
interface IpageProps {
  form?: any;
  editorState: any;
  articlename:string;
  handleArcticleName:()=> void;
  onEditorStateChange: ()=> void;
  handletagsChange: ()=>void;
  onarticleClassChange:()=>void;
  onarticletypeChange:()=>void;
}
interface IpageState {
  articletext: any;
  tags: string[];
  inputVisible: boolean;
  inputValue: string;

  // editorState:any;
}
interface StateProps {
  tags:string[];
  onInputtag:(tags:any)=> void;
}

type Iprops = StateProps & IpageProps;

const mapStateToProps = (state: any) => {
  return {
    tags: state.articleForm.tags
  }
}

const mapDispatchToProps = (dispatch:any) =>  {
  return {
    onInputtag: (tags:any) => {
      dispatch({ 'type': types.GETTAGS, payload :tags });
    }
  }
}

class ArticleForm extends React.Component<Iprops,IpageState> {
  constructor(props:any){
    super(props);
    this.state = {
      articletext: 'jkfdjkf',
      inputVisible: false,
      tags:[],
      inputValue: ''
      // editorState: EditorState.createEmpty(),
    }
  }

  //生命周期函数
  componentWillMount = () => {
    this.setState({
      tags: this.props.tags
    })
    getArticleDetail().then(()=> {
      console.log(11);
    }).catch(err=> {
      console.log(err);
    })
  };
  componentDidMount=()=> {
    const { setFieldsValue } = this.props.form
    setFieldsValue({ articlename: this.props.articlename });
  }
  // componentWillUpdate = (preveProps:Iprops,nextProps: Iprops) => {
  //   console.log(nextProps);
  //   console.log(preveProps)

  //   console.log(nextProps);
  // }

  // input = '';
  // saveInputRef = (input:any) => this.input = input;

  //输入标签
  handletagsChange = (e: any) => {
    console.log(e.target.value);
    this.setState({
      inputValue: e.target.value,
    })
  }

  //关闭掉标签
  handleClose = (removedTag:any): Function => {
    return  ()=> {
      const tags = this.state.tags.filter(tag => tag !== removedTag);
      this.setState({
        tags,
      })
    }
  }
  //确定标签的输入
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.props.onInputtag(tags);
    this.setState({
      tags,
      inputVisible: false,
    });
  }
  showInput = () => {
    this.setState({ inputVisible: true }, () => {
      // this.input.focus()
    });
  }
  tagColor = (tag:any):string => {
    let color:string = '';
    let lowtagname:string = tag.toLowerCase();
    if (lowtagname=='javascript') {
      color = "#108ee9"
    } else if (lowtagname == 'html') {
      color = '#f50'
    } else if (lowtagname == 'css' || lowtagname == 'css3') {
      color = '#87d068'
    } else {
      color = '#2db7f5'
    }
    return color;
  }

  public render() {
    const { inputVisible, tags, inputValue } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
      },
    };

    const { getFieldDecorator } = this.props.form;
    return (
      <Form style={{width:'720px'}}>
        <FormItem
          {...formItemLayout}
          label="文章名称:"
        >
          {getFieldDecorator('articlename', {
            rules: [{
              required: true, message: '请输入文章名称',
            }],
          })(
            <Input onChange={this.props.handleArcticleName} type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="编辑内容:"
        > {
          getFieldDecorator('articleContent',{
            rules:[
              {
                required: true,message: '请输入文章内容'
              }
            ]
          })(
              <Editor
                editorState={this.props.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.props.onEditorStateChange}
                // wrapperStyle = {{'border':'solid 1px #ccc'}}
                editorStyle={{'border':"solid 1px #ccc",'height':'300px'}}
                // toolbarStyle={{'border':'solid 1px blue'}}
          />
      )
    }
        </FormItem>
        <FormItem
          label="文章标签:">
          <div>
            {tags.map((tag, index) => {
              const isLongTag = tag.length > 20;
              const tagElem = (
                <Tag key={tag} closable={true} color={this.tagColor(tag)} afterClose={this.handleClose(tag)}>
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </Tag>
              );
              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
            })}
            {inputVisible && (
              <Input
                // ref={this.saveInputRef}
                type="text"
                size="small"
                style={{ width: 78 }}
                value={inputValue}
                onChange={this.handletagsChange}
                onBlur={this.handleInputConfirm}
                onPressEnter={this.handleInputConfirm}
              />
            )}
            {!inputVisible && (
              <Tag
                onClick={this.showInput}
                style={{ background: '#fff', borderStyle: 'dashed' }}
              >
                <Icon type="plus" /> 添加标签
              </Tag>
            )}
          </div>
        </FormItem>
        <div className="articleClass">
          <FormItem className='articleClass-formitem' label="文章类型" required={true}>
            <Select defaultValue={'请选择文章类型'} onChange={this.props.onarticletypeChange}>
              <Option value="1">原创</Option>
              <Option value="2">转载</Option>
              <Option value="3">翻译</Option>
            </Select>
          </FormItem>
          <FormItem className='articleClass-formitem' label="文章分类" required={true}>
            <Select defaultValue={'请选择文章分类'} onChange={this.props.onarticleClassChange}>
              <Option value="1">前端</Option>
              <Option value="2">后端</Option>
              <Option value="3">人工智能</Option>
              <Option value="4">移动开发</Option>
              <Option value="5">物联网</Option>
            </Select>
          </FormItem>
        </div>
      </Form>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(ArticleForm))