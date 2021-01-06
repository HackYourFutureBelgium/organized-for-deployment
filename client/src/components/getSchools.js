import React, { Fragment, Component } from 'react';
import axios from 'axios';
import './getSchools.css';

export default class Schools extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  };

  componentDidMount() {
    axios.get('/schools').then(res => {
      this.setState({
        // Here it will be filter function
        data: res.data
      });
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="schoolList">
        {this.state.data.map((data)=>{
          return(
            <Fragment>
              <div key={data.date} className="schoolListItem">

                <div>
                  <p className="schoolName">{data.name}</p>
                  <p className="schoolContact">{data.adress_str}</p>
                  <p className="schoolContact">Email: {data.email}</p>
                  <p className="schoolContact">Phone: {data.phone}</p>
                  <div className="btn-container">
                    <button className="schoolList-btn">Save school</button>
                    <button className="schoolList-btn">Comment</button>
                  </div>
                  <div className="review-container">
                    Give a review: 
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                    <i className="far fa-star"></i>
                  </div>
                </div>
                
                <div className="schoolListItem-rightSide">
                  <div className="schoolList-comments">Read Comments</div>
                  <div className="schoolList-rating">Rating: {data.rating}</div>
                </div>
                
              </div>
            </Fragment>
          )
        })
      }
      </div>
    )
  };
};



