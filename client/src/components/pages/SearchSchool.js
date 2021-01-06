import React, { Fragment } from 'react';
import Schools from '../getSchools';
import Filters from '../filterSchool';

const inputStyle = {
    display: 'flex',
    justifyContent: 'center'
}

const SearchSchool = ()=>(
    <Fragment>
        <div style={inputStyle}>
            <Filters />
            <Schools />
        </div>
        
    </Fragment>  
)

export default SearchSchool;