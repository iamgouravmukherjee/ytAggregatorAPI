import React from 'react';
import { Link } from 'react-router-dom'

const item = (props) => {
   return(
   <div className="grid-item">
      <div className="my-3 p-3 bg-white rounded box-shadow">
         <h6 className="border-bottom border-gray pb-2 mb-0">{props.ChannelName}</h6>
         <div className="media text-muted pt-3">
            <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
               <div className="d-flex justify-content-between align-items-center w-100">
               <strong className="text-gray-dark">Rank: {props.Rank} </strong>
               { 
                  props.showDetails 
                  ? <Link to ={`channel/${props.id}`}><a href="#">View Details</a></Link>
                  : null
               }
               </div>
               <span className="d-block">Subscribers: {props.Subscribers}  </span>
               <span className="d-block">Views: {props.VideoViews}</span>
            </div>
         </div>
      </div>
   </div>
   );
}

export default item;