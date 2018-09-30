
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router } from 'react-router-dom';
import Root from './router/Routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { Layout, Menu, Icon } from 'antd';
// import App from './App';
// import IndexContainer from './pages/IndexContainer/Index'
// const { Header, Sider, Content, Footer } = Layout;
ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();