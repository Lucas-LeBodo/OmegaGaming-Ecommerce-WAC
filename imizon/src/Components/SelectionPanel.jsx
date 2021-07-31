// Import Libs 
import React, { Fragment } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const options = [
    { value: 'Option 1', label: 'Option 1' },
    { value: 'Option 2', label: 'Option 2' },
    { value: 'Option 3', label: 'Option 3' },
    { value: 'Option 4', label: 'Option 4' },
    { value: 'Option 5', label: 'Option 5' },
    { value: 'Option 6', label: 'Option 6' },
    { value: 'Option 7', label: 'Option 7' },
    { value: 'Option 8', label: 'Option 8' }
  ]

const animatedComponents = makeAnimated();

export default function AnimatedMulti() {
  return (
      <Fragment>
        <div className="Panel">
            <div className="Panel-content">
                <div className="category-control">
                    <h3> Category </h3>
                    <Select closeMenuOnSelect={false} components={animatedComponents} isMulti options={options} className={'selectCategory'}/>  
                </div>
                <div className="sort-control">
                    <h3> Sort </h3>
                    <label><input type="radio" value="option1"/> Option 1 </label>
                    <label><input type="radio" value="option1"/> Option 2 </label>

                </div>
            </div>
        </div>
    </Fragment>
  );
}

