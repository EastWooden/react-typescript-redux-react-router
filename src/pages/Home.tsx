import * as React from 'react';
import { Chart, Coord, Geom, Axis,Tooltip } from 'bizcharts';
import { Link } from 'react-router-dom';
import './Home.css';
import '../assets/style/base.css';
//定义度量
const scale = {
  timecount: { alias: '次数' },
  date: { alias:'日期' }
}
const data = [
  { "date": "2018-10-09", "timecount": 40 },
  { "date": "2018-10-10", "timecount": 30 },
  { "date": "2018-10-11", "timecount": 10 },
  { "date": "2018-10-12", "timecount": 356 },
  { "date": "2018-10-13", "timecount": 20 },
  { "date": "2018-10-14", "timecount": 11 },
  { "date": "2018-10-15", "timecount": 56 }
]

interface IpageProps {

}
interface IpageState {
  statisticsWidth: number;
}
class Home extends React.Component<IpageProps,IpageState> {
  constructor(props:any) {
    super(props);
    this.state = {
      statisticsWidth: 0,
    }
  }
  componentDidMount() {
    // let warp = document.getElementById('warp');
    // let warpwidth = warp.clientWidth;
    // if (warp) {
    //   let width: number = warp.clientWidth;
    //   this.setState({
    //     statisticsWidth: width
    //   })
    // }
  }
  public render() {
    return (
      <div>
        <div className="statistics boxshandow" >
          <h2 className="mainGreyColor thinFontWeight">实时访问次数</h2>
          <Chart height={400} data={data} scale={scale} forceFit={true} padding={{ top: 20, right: 40, bottom: 30, left: 40 }}>
            <Coord type="rect" />
            <Axis name="date" />
            <Axis name="timecount" />
            <Geom type="line" opacity={0.8} position="date*timecount" color="#1890ff" shape={['city', ['circle', 'rect']]} />
            <Tooltip />
          </Chart>
        </div>
        <div className="statistics">
          <h2 className="mainGreyColor thinFontWeight">系统公告</h2>
          <div className="newsList">
            {
              <div className="newsItem">
                <p><Link to="/">fdfdfdsfdsfjdaskfjkajfkldsjlkfdj</Link></p> <span className="newsItem-date">2018-14-23</span>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Home;