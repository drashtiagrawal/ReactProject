import { Fragment, useRef } from "react";

import Card from "../Card";

const PetList = (props) => {
    
    const calculateAge = (birthday) => { // birthday is a date
        let today = new Date().getTime();
        // console.log(birthday.getTime());
        // let age = today.getFullYear() - birthday.getFullYear();
        // let m = today.getMonth() - birthday.getMonth();
        
        // if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) 
        // {
        //     age--;
        // }
        // return age;

        return Math.trunc((today - birthday.getTime())/(1000 * 3600 * 24)/30);
    }
    
    
    
    return (
        <Fragment>
            {props.petList.map((pet) => <li key={pet.id}>
                
            <Card >
                <div>
                    <div >{pet.name}</div> <br></br>
                    <div>{'Age : '+(calculateAge(new Date(pet.bornAt))+' months')}</div> <br></br>
                    
                </div> 
                </Card>
                <br></br>
            </li>
            )}
        </Fragment>
    );
}

export default PetList;