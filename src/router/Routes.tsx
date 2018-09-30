import * as React from 'react';
import { Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import IndexContainer from '../pages/IndexContainer/Index';
import Dashbord from '../components/Dashbord'
import ArticlePublish from '../pages/ArticlePublish/index';
const Root = () => (
  <div style={{width:'100%',height:'100%'}}>
    <Route exact={true} path="/" component={App} />
    { !location.hash.endsWith('#/') &&
      <IndexContainer >
        <Route path="/dashbord" component={Dashbord} />
        <Route path="/home" component={Home} />
      <Route path='/mangeArticle/publish' component={ArticlePublish} />
      <Route path='/mangeArticle/examine' component={ArticlePublish} />
      </IndexContainer>
    }
  </div>
)
export default Root;