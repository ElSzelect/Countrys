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
//https://i.pinimg.com/originals/42/3e/75/423e752b884436e49d645763f6d784dc.jpg
//https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v660-mon-35-travelbadge_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=488bb7bfaa372ea0c3758621f739347b
// https://cdn.dribbble.com/users/2178578/screenshots/7154873/media/effabc632f4322acde3d501a29e82dde.gif
//https://i.pinimg.com/originals/f5/1b/32/f51b32d7580d266e620e3580c2b274d8.gif
//https://cdn.dribbble.com/users/1003234/screenshots/3931448/globe_animation.gif
//https://unsplash.com/photos/aku7Zlj_x_o