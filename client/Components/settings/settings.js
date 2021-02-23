import React from 'react'
import './settings.css'

export default class Settings extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          userName: "",
          password: "",
          dbWeb: "",
          dbPort: ""
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        alert('Contact your Admin to set your account');
        event.preventDefault();
      }
    
      render() {
        return (
          <>
          <form id = "settingContainer" onClick={this.handleSubmit}>
            <label id='settingsForm'>
              Name:
              <input name="userName" type="text" value={this.state.userName} onChange={this.handleChange} />
            </label><br></br>
            
            <label id='settingsForm'>
              Password:
              <input name="password" type="text" value={this.state.password} onChange={this.handleChange} />
            </label><br></br>
            
            
            <label id='settingsForm'>
              Database URL:
              <input  name="dbWeb" type="text" value={this.state.dbWeb} onChange={this.handleChange} />
            </label><br></br>
            

            <label id='settingsForm'>
              Database Port:
              <input name="dbPort" type="text" value={this.state.dbPort} onChange={this.handleChange} />
            </label>
            <input id="submitButton" type="submit" value="Submit" />
          </form><br></br>
            
          </>
        );
      }
}