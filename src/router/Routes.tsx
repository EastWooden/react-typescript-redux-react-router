import * as React from 'react';
import { Route } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import IndexContainer from '../pages/IndexContainer/Index';
import Dashbord from '../components/Dashbord'
const Root = () => (
  <div style={{width:'100%',height:'100%'}}>
    <Route exact={true} path="/" component={App} />
    <IndexContainer >
      <Route path="/dashbord" component={Dashbord} />
      <Route path="/home" component={Home} />
    </IndexContainer>
  </div>
)
export default Root;