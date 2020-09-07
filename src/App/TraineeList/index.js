import React from 'react';
import Axios from 'axios';
import './index.css';

const baseUrl = 'http://localhost:8080';

class TraineeList extends React.Component {
  // state = {
  //   trainees: [],
  // }

  componentDidMount() {
    return new Promise(() => {
      Axios.get(`${baseUrl}/gtb/trainees`).then((req) => {
        this.setState({
          trainees: req.data,
        });
      });
    });
  }

  render() {
    return (
      <div className="trainee-panel">
        <h1>学员列表</h1>
        <ul className="trainee-list">
          {this.state.trainees.map((item) => {
            return (
              <li className="trainee-info">
                <p>
                  {item.id}.{item.name}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default TraineeList;
