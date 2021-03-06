import {combineReducers} from "redux";
import forumSlice from "./slices/ForumSlice";
import commentSlice from "./slices/CommentSlice";
import classs from "./slices/classline";
import user from "./slices/User";
import courses from "./slices/Courses";
import theme from "./slices/Theme";
import comments from './slices/comment';
import task from './slices/Task'


const reducers =combineReducers({forumSlice,commentSlice,classs,user,courses,theme,comments,task});

export default reducers;
