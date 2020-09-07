import React from 'react';
import Axios from 'axios';

const baseUrl = 'http://localhost:8080';

class GroupList extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      groupList: [],
      isEditGroupName: [false, false, false, false, false, false]
    }
  }

  CheckBrowserIsIE = () => {
    let result = false; 
    const browser = navigator.appName; 
    if(browser === "Microsoft Internet Explorer"){ 
        result = true; 
    } 
    return result;           
  }

  handleGroupTrainees = () => {
    Axios.get(`${baseUrl}/gtb/group/trainee`)
      .then((req) => {
        this.setState({
          groupList: req.data
        })
      })
  }

  handleEditGroupNameShow = (index) => {
    this.state.isEditGroupName.splice(index, 1, !this.state.isEditGroupName[index])
    this.setState({
      isEditGroupName: this.state.isEditGroupName,
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
      this.handleEditGroupNameShow();
      Axios.post(`${baseUrl}/edit/group/${e.target.value}`)
        .then((req) => {
          this.setState({
            trainees: req.data,
          });
        })
    } 

  }

  render() {
    return (<div className="group-panel">
      <div className="group-nav">
        <h1>分组列表</h1>
        <button type="button" className="group-trainees" onClick={this.handleGroupTrainees}>分组学员</button>
      </div>
      <figure>

        {this.state.groupList.map((item, index) => {
          return (<div key={item.name}>
            {this.state.isEditGroupName[index] ?
              (<li>
                <input type='text' onKeyDown={this.handleAddTrainee} />
              </li>) :
              (<li>
                <figure onClick={() => this.handleEditGroupNameShow(index)}>
                  {item.name}
                </figure>
              </li>)
            }
            <ul>
              {item.groupTrainees.map((trainItem) => {
                return (
                  <li key={trainItem.id}>
                    <p>
                      {trainItem.id}.{trainItem.name}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          )
        })}


      </figure>
    </div>);
  }
}

export default GroupList;
