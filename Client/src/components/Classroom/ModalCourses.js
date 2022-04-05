import React from "react";
import { Dropdown, Modal } from "semantic-ui-react";
import FormCourses from "./FormCourses";
import '../css/CardClass.css';
import styled from 'styled-components';



function ModalCourses(props) {
  
  return (
    <>
      <Modal className="theme"
        trigger={<Dropdown.Item icon="file text" text="Add courses" />}
        dimmer="inverted"
        size="tiny"
        closeIcon="close"
      >
        
        <Modal.Header>{props.headerTitle}</Modal.Header>

        <Modal.Content>
          <FormCourses
            buttonSubmitTitle={props.buttonSubmitTitle}
            buttonColor={props.buttonColor}
            coursesId={props.coursesId}
            onCoursesAdded={props.onCoursesAdded}
            onCoursesUpdated={props.onCoursesUpdated}
            server={props.server}
            
          />
        </Modal.Content>
        
      </Modal>
    </>
  );
}



export default ModalCourses;



