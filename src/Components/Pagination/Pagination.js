import { Fragment } from "react";
import classes from './Pagination.module.css';

const Pagination = (props) => {
   

    const pageNumbers = [];

    for(let i = 1;i < Math.ceil(props.totalPosts / props.postsPerPage); i++){
        pageNumbers.push(i);
    }

  

    return (
        
        <nav>
            <div className={classes.pagination}>
                {pageNumbers.map(number => (
                    
                        <a key={number} onClick={() => props.paginate(number) } href="!#" >
                            {number}
                        </a>

                    
                ))}
            </div>
        </nav>
    );
}

export default Pagination;