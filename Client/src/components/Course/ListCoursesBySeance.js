import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import {
  Accordion,
  Feed,
  Grid,
  Header,
  Icon,
  Image,
  Label,
  Segment,
} from "semantic-ui-react";
import { RetrieveCoursesByIdTheme } from "../../redux/slices/Courses";
import ModalCoursesEdit from "./ModalCoursesEdit";
import QierPlayer from "qier-player";
import ModalConfirmDeleteCourses from "./ModalConfirmDeleteCour";

import { Link } from "react-router-dom";

function ListCoursesBySeance() {
  const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;
  const { id, titre } = useParams();
  const courses = useSelector((state) => state.courses.coursesByTheme);
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const shayma = activeIndex;

    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    console.log(courses);

    dispatch(RetrieveCoursesByIdTheme(id));
  }, [id]);

  return (
    <div>
      {courses.length === 0 ? (
        <>
          <Image
            centered
            size="medium"
            src={process.env.PUBLIC_URL + "/noFileFound.jpg"}
          />
          <Header as="h2" textAlign="center">
            <Header.Content>Sorry No Courses Found </Header.Content>
          </Header>
        </>
      ) : (
        <Header as="h2" color="black" icon textAlign="center">
          
          <Header.Content >
            {"Courses Available for "}{" "}
            <Label color="black" horizontal>
              {titre}
            </Label>
          </Header.Content>
        </Header>
      )}

      <div>
        {courses.map((c, index) => (
          <div>
            <Accordion>
              <Segment raised color="grey">
                <Feed key={c._id}>
                  <Feed.Event>
                    

                    <Feed.Content>
                      <Accordion.Title
                        active={activeIndex === index}
                        index={index}
                        onClick={handleClick}
                      >
                        <Grid stackable>
                          <Grid.Column width={11}>
                            <Feed.Summary>
                          <Header
                            as="h3"
                            icon="file alternate outline"
                            content={c.titre}
                          />
                        <Feed.Date>{c.idOwner.FirstName+" "+c.idOwner.LastName} .</Feed.Date>
                              <Feed.Date>
                                <ReactTimeAgo
                                  date={c.dateCreation}
                                  locale="en-US"
                                />
                              </Feed.Date>
                            </Feed.Summary>
                          </Grid.Column>
                          <Grid.Column width={5}>
                            <>
                            {role === "TEACHER" ? (

                                <>
                                  <Feed.Meta>
                                    <Feed.Like>
                                      <ModalCoursesEdit
                                        headerTitle="Edit Courses"
                                        buttonTriggerTitle="Edit"
                                        buttonSubmitTitle="Save"
                                        buttonColor="black"
                                        icon="edit"
                                        coursesId={c._id}
                                      />
                                    </Feed.Like>
                                  </Feed.Meta>
                                  <Feed.Meta>
                                    <Feed.Like>
                                      <ModalConfirmDeleteCourses
                                        headerTitle="Delete Courses"
                                        buttonTriggerTitle="Delete"
                                        buttonColor="red"
                                        icon="trash"
                                        courses={c}
                                      />
                                    </Feed.Like>
                                  </Feed.Meta>
                                </>
                                ) : (

                                <></>
                                )}
                            </>
                          </Grid.Column>
                        </Grid>
                      </Accordion.Title>

                      <Accordion.Content active={activeIndex === index}>
                        
                      <Link to={"/detailCourses/" + c._id}>
                        <Feed.Extra text>{c.description}</Feed.Extra>
                        </Link>
                        <Feed.Extra images>
                          <Grid stackable>
                            <Grid.Row>
                              {c.multiple_resources.map((files, index) =>
                                files.type === "application/pdf" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={5}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "pdf" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              {files.originalname}
                                            </Header>
                                          </Grid.Row>
                                          
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type ===
                                  "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={5}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "pptx" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={5}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                              "   "+{files.originalname}
                                            </Header>
                                          </Grid.Row>
                                          
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type ===
                                  "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                                  <div key={index}>
                                    <a
                                      href={files.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div>
                                        <Grid.Column width={5}>
                                          <img
                                            src={
                                              process.env.PUBLIC_URL +
                                              "/files-type/" +
                                              "docx" +
                                              ".png"
                                            }
                                            style={{
                                              margin: "10px",
                                              height: "100px",
                                              width: "100px",
                                            }}
                                            alt=""
                                          />
                                        </Grid.Column>
                                        <Grid.Column width={3}>
                                          <Grid.Row>
                                            <Header as="h4" color="red">
                                            {files.originalname}
                                            </Header>
                                          </Grid.Row>
                                          
                                        </Grid.Column>
                                      </div>
                                    </a>
                                  </div>
                                ) : files.type === "video/mp4" ? (
                                  <div>
                                    <Grid.Column width={5}>
                                      <QierPlayer
                                        width={250}
                                        height={100}
                                        language="en"
                                        themeColor="#000000"
                                        srcOrigin={files.url}
                                      />
                                    </Grid.Column>
                                    <Grid.Column width={5}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.originalname.slice(0, 7)}
                                        </Header>
                                      </Grid.Row>
                                     
                                    </Grid.Column>
                                  </div>
                                ) : files.type === "audio/mpeg" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <div className="player-wrapper">
                                        <ReactPlayer
                                          key={index}
                                          width="250px"
                                          height="100px"
                                          controls={true}
                                          url={files.url}
                                        />
                                      </div>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                          {files.originalname.slice(0, 7)}
                                        </Header>
                                      </Grid.Row>
                                      
                                    </Grid.Column>
                                  </div>
                                ) : files.type === "image/png" ||
                                  files.type === "image/jpg" ||
                                  files.type === "image/jpeg" ||
                                  files.type === "image/gif" ? (
                                  <div>
                                    <Grid.Column width={3}>
                                      <a
                                        href={files.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={files.url}
                                          alt={files.type}
                                          style={{
                                            margin: "10px",
                                            height: "100px",
                                            width: "100px",
                                          }}
                                        />
                                      </a>
                                    </Grid.Column>
                                    <Grid.Column width={3}>
                                      <Grid.Row>
                                        <Header as="h4" color="red">
                                        {files.originalname}
                                        </Header>
                                      </Grid.Row>
                                     
                                    </Grid.Column>
                                  </div>
                                ) : (
                                 
                                  <a
                                    href={files.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div>
                                      <Grid.Column width={3}>
                                        <img
                                          style={{
                                            margin: "10px",
                                            height: "100px",
                                            width: "100px",
                                          }}
                                          src={
                                            process.env.PUBLIC_URL +
                                            "/files-type/" +
                                            "noFile.png"
                                          }
                                          alt={files.type}
                                        />
                                      </Grid.Column>
                                      <Grid.Column width={3}>
                                        <Grid.Row>
                                          <Header as="h4" color="red">
                                         {files.originalname}
                                          </Header>
                                        </Grid.Row>
                                       
                                      </Grid.Column>
                                    </div>
                                  </a>
                                )
                              )}
                            </Grid.Row>
                          </Grid>
                        </Feed.Extra>
                      </Accordion.Content>
                    </Feed.Content>
                  </Feed.Event>
                </Feed>
              </Segment>
            </Accordion>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListCoursesBySeance;
