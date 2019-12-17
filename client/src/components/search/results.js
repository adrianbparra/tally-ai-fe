import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Result from "./result";
import { postBusiness } from "../../actions/index";

const Results = (props) => {

  console.log("props", props);

  const [active, setActive] = useState();

  useEffect(() => {
    if(props.businesses.data.length > 0) {
    //There is now search results to display in state, lets do our CSS animation and render results
    setActive(true);
    }
    else {
      //Reverse animation? Or just leave empty? Talk to Colton
    }
  }, [props.businesses.data])

  //TODO: style loading and error messages
  if (props.businesses.error) {
    return (<p>Error loading search results...</p>)
  }
  else if (props.businesses.error) {
    return (<p>Loading search results...</p>)
  }
  else {
    let animationClass = "";
    if(active){
      animationClass = " expand-search-results";
    }
    console.log("Animation class", animationClass);
    return (
      <div className={'search-results' + animationClass}>
        {props.businesses.data.map(result => (
          <Result data={result} postBusiness={postBusiness} />
        ))}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  businesses: state.searchResults
});

export default connect(mapStateToProps, { postBusiness })(Results);
