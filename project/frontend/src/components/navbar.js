import React from 'react';

const navbar = (props) => {
   return (
      // <div className="bg-white box-shadow px-1 ">
         <nav className="nav nav-underline mb-3">
            <input onInput={props.input} className="form-control pv3 pr6 pl4 gray7" type="text" placeholder="Search" />
        </nav>
      // </div>
   )
}

export default navbar;