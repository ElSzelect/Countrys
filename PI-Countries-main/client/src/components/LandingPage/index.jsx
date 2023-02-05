import {Link} from "react-router-dom";
import "./LandingPage.css";
import {useEffect} from "react";
import {getActivities, getCountries} from "../../actions";
import {connect} from "react-redux";

export function LandingPage(props){
  const {getCountries,getActivities} = props;
  useEffect(() => {
    getCountries();
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  return (
    <div className="landing" >
      <span className="title">COUNTRIES TO DISCOVER</span>
      <Link to='/home'>
        <img className="icon" src="https://static.thenounproject.com/png/955299-200.png" alt='home'/>
      </Link>

    </div>
  )
}

function mapDispatchToProps(dispatch){
  return {
    getCountries: ()=>dispatch(getCountries()),
    getActivities: ()=>dispatch(getActivities())
  }
}

export default connect(null,mapDispatchToProps)(LandingPage);
