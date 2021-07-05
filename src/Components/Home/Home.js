import { Fragment, useState, useEffect, useReducer } from "react";
import PetList from "../PetList/PetList";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import classes from '../Search/Search.module.css';

const Home = () => {
    const [petList, setPetList] = useState([]);
    const [postsPerPage] = useState(10);
    const [query,setQuery] = useState('');
    const pageReducer = (state, action) => {
        switch(action.type){
            case 'pageNumber':
                console.log('pageNumber');
                return {...state, currentPage : action.currentPage};
            default:
                console.log('default');
                return state;
    
        }
    }
    const [searchFor, setSearchFor] = useState('');
    const [currentPage, setCurrentPage] = useReducer(pageReducer, {currentPage : 1});
        
    const getPetList = () => {
        axios.get('https://60d075407de0b20017108b89.mockapi.io/api/v1/animals'+query).then(
            (res) => {

                // setPetList([]);
                // const temp = res.data.filter((value) => {
                //     if(searchItem === ""){
                //         return value;
                //     }
                //     else if(!isNaN(Number(searchItem))){
                //         if(Number(searchItem) === Number(value.age)){
                //             return value;
                //         }
                //     }
                //     else if(value.name.toLowerCase().includes(searchItem.toLowerCase())){
                //         return value;
                //     }
                    
                // })
                setPetList(res.data);
                console.log(res.data);
                console.log(query);
                // props.setArticleNo('');
            }
        
            );
        }
        useEffect(
            async () => {

                
                 await getPetList();
                //  console.log('useEffect');
                //  console.log(data);
             },[searchFor]
         );

         const searchHandler = (event) => {
                setSearchFor( event.target.value);
                console.log('SEARCH : '+searchFor);
                setQuery('?search='+event.target.value);
            
         }

    const indexOfLastPost = currentPage.currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = petList.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage({type : 'pageNumber', currentPage : pageNumber});
        // setCurrentPage(pageNumber);
        setQuery('?page='+currentPage.currentPage+'&limit='+postsPerPage);
    }


    return (
        <Fragment>
            <input type="text" className={classes.search} placeholder="Search..." onChange={searchHandler} />
            <ul style={{listStyleType: "none"}}>
                <PetList petList={currentPosts} searchItem={searchFor} />
            </ul>
            <Pagination postsPerPage={postsPerPage} totalPosts={petList.length} paginate={paginate}/>
        </Fragment>
    );
}

export default Home;