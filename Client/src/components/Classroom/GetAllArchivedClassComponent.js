import {
  Grid,
  Label,
  Segment,
} from "semantic-ui-react";
import CardItemClass from './CardItemClass';
import React, {  useEffect , useState} from "react";
import {
  fetchclassArchived,
  selectclassarchived,
} from "../../redux/slices/classline";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserConnect } from '../../utils/api';
import ReactPaginate from 'react-paginate';
import CardItemClassArchived from "./CardItemClassArchived";


export default function GetAllClassArchivedComponent() {
  const [archived] = useSelector(selectclassarchived);
  const [pageNumber, setPageNumber] = useState(0);
  const [CsPerPage] = useState(3);
  const pagesVisited = pageNumber * CsPerPage ;
  const dispatch = useDispatch();
  const role =  JSON.parse(localStorage.getItem("Student")).Student.User.role;
  const idUserConnect = JSON.parse(localStorage.getItem("idStudent"))._id;

  const aff = (id) => {
    return "Year " + id;
  };
  const getObj = (obj) => {
    return  Math.ceil(obj.length / CsPerPage) ;
   
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    };

  useEffect(() => {
    dispatch(fetchclassArchived(role,idUserConnect,"Archive"));

    }, [dispatch]);
  return (
    <div>
      {archived?.map((cl, index) => (
        <Grid columns={1} key={index}>
          <Grid.Column>
            <Segment raised>
              <Label as="a" color="grey" ribbon>
                {aff(cl._id)}
              </Label>
              <ul className='cards__Class__items' >
          
          {cl.classObjet?.slice(pagesVisited, pagesVisited + CsPerPage).map((f , i) => (
        <div  key={i}>
            <CardItemClassArchived  
              id={idUserConnect}
              src={f.file}
              course={f.className}
              teacher={f.classOwner.FirstName+' '+f.classOwner.LastName}
              class={f.classSection}
              meet ='OFFLINE'
              path='/feed'
              src1={f.classOwner.User.file}
              classes={f}
            />
                 
                 </div>
            ))}
            
          
          </ul>
          
          <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={getObj(cl.classObjet)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
      </Segment>
      
      </Grid.Column>
      </Grid>
    ))}
      </div>
    
  );
}
