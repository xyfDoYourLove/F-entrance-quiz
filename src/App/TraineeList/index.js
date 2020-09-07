import React from 'react';
import Axios from 'axios';
import './index.css';

const baseUrl = 'http://localhost:8080';



class TraineeList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      trainees: [],
      isAddTrainee: false,
    }
  }

  componentDidMount() {
    return new Promise(() => {
      Axios.get(`${baseUrl}/gtb/trainees`).then((req) => {
        this.setState({
          trainees: req.data,
        });
      });
    });
  }

  CheckBrowserIsIE = () => {
    let result = false; 
    const browser = navigator.appName; 
    if(browser === "Microsoft Internet Explorer"){ 
        result = true; 
    } 
    return result;           
  }

  handleAddTraineeShow = () => {
    this.setState({
      isAddTrainee: !this.state.isAddTrainee,
    })
  }

  

  handleAddTrainee = (e) => {
    let keycode = 0; 
    if(this.CheckBrowserIsIE()){ 
        keycode = e.keyCode; 
    }else{ 
        keycode = e.which; 
    } 
    if (keycode === 13 )
    { 
      this.handleAddTraineeShow();
      Axios.post(`${baseUrl}/gtb/add/trainee/${e.target.value}`)
        .then((req) => {
          this.setState({
            trainees: req.data,
          });
        })
    } 

  }



  render() {
    return (
      <div className="trainee-panel">
        <h1>学员列表</h1>
        <ul className="trainee-list">
          {this.state.trainees.map((item) => {
            return (
              <li key={item.id} className="trainee-info">
                <p>
                  {item.id}.{item.name}
                </p>
              </li>
            );
          })}
          {this.state.isAddTrainee ?
          (<li className="trainee-info">
            <input className="trainee-add" type='text' onKeyDown={this.handleAddTrainee}/>
          </li>) :
          (<li className="trainee-info">
            <figure onClick={this.handleAddTraineeShow}>
              + 添加学员
            </figure>
          </li>)
          }
        </ul>
      </div>
    );
  }
}

export default TraineeList;
