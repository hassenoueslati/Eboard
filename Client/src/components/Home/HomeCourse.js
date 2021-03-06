import React, { useEffect } from 'react';
import SideBar from '../SideBar/Sidebar';
import { Grid } from "semantic-ui-react";
import Navbar from '../pages/Shared/Navbar';
import QuizList from "../Quiz/QuizList";
import MenuCours from '../Course/MenuCours';
import PrivateRoute from "../../Routes/PrivateRoute";
import CreateQuiz from '../Quiz/CreateQuiz';
import DisplayQuiz from '../Quiz/DisplayQuiz';
import '../SideBar/Sidebar.css'
import NavbarInside from '../NavbarInside/NavbarInside';
import Feed from '../Course/Feed';
import { Theme } from '../Course/Theme';
import Members from '../Course/Members';
import DisplayTask from "../Task/DisplayTask";
import CreateTask from "../Task/CreateTask";
import TaskList from "../Task/TaskList";
import { Route, useHistory } from 'react-router-dom';
import EditTask from "../Task/EditTask";
import EditQuiz from "../Quiz/EditQuiz";
import ListCoursesBySeance from '../Course/ListCoursesBySeance';
import TableCourses from '../Course/TableCourses';
import DetailCourses from '../Course/DetailCourses';
import AssignedQuizStudentList from "../Quiz/AssignedQuizStudentList";
import WorkedQuizStudentList from "../Quiz/WorkedQuizStudentList";
import AssignedTaskStudentList from "../Task/AssignedTaskStudentList";
import WorkedTaskStudentList from "../Task/WorkedTaskStudentList";
import DetailQuiz from "../Quiz/DetailQuiz";
import DetailTask from "../Task/DetailTask";
import CorrectionTask from "../Task/CorrectionTask";
import Recommendation from "../RecommendedCourses/Recommendation";
import Evaluation from "../Evaluation/Evaluation";
import EvaluationTeacherPage from "../Evaluation/EvaluationTeacherPage";
import axios from 'axios';
import { getUserConnect } from '../../utils/api';

function HomeCourse(){

    const history=useHistory();
    const data=  JSON.parse(localStorage.getItem('login'));
    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
      };
    useEffect(()=>{
        const  decodedToken = parseJwt(data.AccessToken);
        if (decodedToken.exp * 1000 < Date.now()) {
                localStorage.clear();
                history.push("/login");
          }else{
            console.log("stay logedIn  "+decodedToken.exp);
          }
    },[])
    if(localStorage.getItem('login')===null ){
        history.push("/login");
    }
    
    return (
        <div>
            <div className='spacing_3la_3ajlaa'>
                <NavbarInside />
                <Grid stackable celled="internally">
                    <Grid.Row >
                        <Grid.Column className="sideb">
                            <SideBar />
                        </Grid.Column>
                        <Grid.Column width={3}>
                            <MenuCours />
                        </Grid.Column>
                        <Grid.Column width={12} >
                            <div className="insideCour">
                                <PrivateRoute
                                    path="/feed"
                                    exact component={Feed}
                                />
                                <PrivateRoute
                                    path="/theme"
                                    exact component={Theme}
                                />
                                <PrivateRoute
                                    path="/quizlist"
                                    exact component={QuizList}
                                />
                                <PrivateRoute
                                    path="/createquiz"
                                    exact component={CreateQuiz}
                                />
                                <PrivateRoute
                                    path="/updateQuiz/:id"
                                    exact component ={EditQuiz}
                                />
                                <PrivateRoute
                                    path="/formAddTask"
                                    exact component ={CreateTask}
                                />
                                <PrivateRoute
                                    path="/updateTask/:id"
                                    exact component ={EditTask}
                                />
                                <PrivateRoute
                                    path="/tasklist"
                                    exact component ={TaskList}
                                />
                                <PrivateRoute
                                    path="/members"
                                    exact component ={Members}
                                />

                                <Route
                                path="/theme/:titre/:id"
                                exact
                               render={(props) => <ListCoursesBySeance {...props} />}
                                 />
                                
                                  <Route
                           path="/detailCourses/:id"
                             exact
                             render={(props) => <DetailCourses {...props} />}
                              />
                                <PrivateRoute
                                    path="/displayQuiz/:id"
                                    exact component ={DisplayQuiz}
                                />
                                <PrivateRoute
                                    path="/displayTask/:id"
                                    exact component ={DisplayTask}
                                />
                                <PrivateRoute
                                    path="/assignedQuizStudentList"
                                    exact component={AssignedQuizStudentList}
                                />
                                <PrivateRoute
                                    path="/workedQuizStudentList"
                                    exact component={WorkedQuizStudentList}
                                />
                                <PrivateRoute
                                    path="/assignedTaskStudentList"
                                    exact component={AssignedTaskStudentList}
                                />
                                <PrivateRoute
                                    path="/workedTaskStudentList"
                                    exact component={WorkedTaskStudentList}
                                />
                                <PrivateRoute
                                    path="/detailQuiz/:id"
                                    exact component ={DetailQuiz}
                                />
                                <PrivateRoute
                                    path="/detailTask/:id"
                                    exact component ={DetailTask}
                                />
                                <PrivateRoute
                                    path="/correctTask/:idStudent/:id"
                                    exact component ={CorrectionTask}
                                />
                                <PrivateRoute
                                    path="/RecommendedCourses"
                                    exact component ={Recommendation}
                                />
                                <PrivateRoute
                                    path="/evaluation"
                                    exact component ={Evaluation}
                                />
                                <PrivateRoute
                                    path="/evaluationTeacherPage"
                                    exact component ={EvaluationTeacherPage}
                                />
                              
                            </div>
                        </Grid.Column>

                    </Grid.Row>
                </Grid>
            </div>
        </div>
    )
}
export default HomeCourse ;