import React, {useState,useContext,useEffect} from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MySchools = props =>{

    return(
        <div>
            
             <h1>My school</h1>
            {/* <ul className="list-group">
                {
                    todos.map(todo =>{
                        return <TodoItem key={todo._id} todo={todo}/>
                    })
                }
            </ul>
            <br/>
            <form onSubmit={onSubmit}>
                <label htmlFor="todo">Enter Todo</label>
                <input type="text" 
                       name="todo" 
                       value={todo.name} 
                       onChange={onChange}
                       className="form-control"
                       placeholder="Please Enter Todo"/>
                <button className="btn btn-lg btn-primary btn-block" 
                        type="submit">Submit</button>
            </form>
            {message ? <Message message={message}/> : null} */}
        </div>
    );

}

export default MySchools;