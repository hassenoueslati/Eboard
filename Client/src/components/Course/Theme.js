import React, { Component } from 'react';
import { Dropdown, Menu } from "semantic-ui-react";
import ModalTheme from './ModalTheme';
import ModalCourses from './ModalCourses';
import TableTheme from '../Course/TableTheme'


export class Theme extends Component {
  
  render() {
    const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;

    return (
      <div>
             

          <Menu pointing secondary>
        
      
          {role === "TEACHER" ? (
          <Menu.Item position="left">
            <Dropdown floating className="icon" icon="add circle" value="add" > 
              <Dropdown.Menu>
                <Dropdown.Header
                  icon="mouse pointer"
                  content="Select something to add"
                />
                <Dropdown.Divider />
                <ModalTheme
                  headerTitle="Add Theme"
                  buttonTriggerTitle="Add Theme"
                  buttonSubmitTitle="Add"
                  buttonColor="black"
                  icon="th"
                />
                <ModalCourses
                  headerTitle="Add Courses"
                  buttonTriggerTitle="Add Courses"
                  buttonSubmitTitle="Add"
                  buttonColor="red"
                  icon="add"
                />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          ) : (
            <></>

            )}
      
      </Menu>
      <br/>
      <TableTheme />
      
      </div>
    )
  }
}



