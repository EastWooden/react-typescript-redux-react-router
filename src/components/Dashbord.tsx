import * as React from 'react'
import { Chart, Axis, Tooltip, Geom, Legend } from "bizcharts";
import './Dashbord.css';
const data = [
  { genre: 'Html', sold: 275, income: 2300 },
  { genre: 'css', sold: 115, income: 667 },
  { genre: 'js', sold: 120, income: 982 },
  { genre: 'react', sold: 350, income: 5271 },
  { genre: 'vue', sold: 150, income: 3710 }
];
// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }
};
class Dashbord extends React.Component {
  /**
   * render
   */


  public render() {
    return (
      <div className="chars-conatainer">
        <div className="charts-article-number">
          <Chart width={600} height={400} data={data} scale={cols}>
            <Axis name="genre" />
            <Axis name="sold" />
            <Legend position="bottom" />
            <Tooltip />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>
        </div>
        <div className="charts-article-number">
          <Chart width={600} height={400} data={data} scale={cols}>
            <Axis name="genre" />
            <Axis name="sold" />
            <Legend position="bottom" />
            <Tooltip />
            <Geom type="interval" position="genre*sold" color="genre" />
          </Chart>
        </div>
      </div>

    )
  }
}


export default Dashbord;