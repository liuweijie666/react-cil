import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { Button, DatePicker } from "antd";
import axios from "../utils/request"
@inject("homeStore")
@observer
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount(){
    let a = axios.post('/api/testlap/admin/api/ljDeviceType/list')
    console.log(a)
  }

  render() {
    return (
      <div className="home">
        <h1>首页数据源的number为:{this.props.homeStore.homeNum}</h1>
        <Button>11111</Button>
        <button
          onClick={() => {
            this.props.homeStore.addNum();
          }}
        >
          点击添加
        </button>
        <button
          onClick={() => {
            this.props.homeStore.lessNum();
          }}
        >
          点击删除
        </button>
        <h2
          onClick={() => {
            this.props.history.push("/one");
          }}
        >
          跳转到页面二
        </h2>
      </div>
    );
  }
}
export default Home;
