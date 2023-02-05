import {Link} from "react-router-dom";
import './NewActivity.css'
import {connect} from "react-redux";
import {useState} from "react";
import {addActivity} from "../../actions";
//import axios from "axios";

export function NewActivity(props){
  let num = Date()[19];  //to change the background photo every minute

  function compare(a,b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  }
  const [activity,setActivity] = useState({season: '', countryId: [], name: '', duration: 0, difficulty: 0});
  const {countries} = props
  const seasons = ['summer','winter','spring','fall']
  const selectList = [...countries].sort(compare).map(country => <option key={country.id} name={country.id} value={country.id}>{country.name}</option>)
//const {name,difficulty,duration,season,countryId} = req.body;

  function changeValues(e){
    e.preventDefault();
    setActivity({...activity,[e.target.name]:e.target.value});
  }
  function postActivity(e){
    e.preventDefault();
    if(!seasons.includes(activity.season)) alert('Please write season name correctly')
    else if(activity.name===''||activity.duration<=0||activity.difficulty<1||!activity.countryId.length) {
      alert("Please complete all fields!");
    } else {
      props.addActivity(activity);
      setActivity({season: '', countryId: [], name: '', duration: 0, difficulty: 0}); //to clear all fields after submitting
    }
  }
  return (
    <div className={"back"+num}>
      <Link to="/home">
      <img className="homeB" title="Home" name="img" width={50} src='https://static.thenounproject.com/png/2002086-200.png' alt='home'/>
      </Link><br/>
      <fieldset>
        <legend><h2>Add new activity:</h2></legend>
        <form name={"actForm"} onSubmit={e=>postActivity(e)}  autoComplete="off">
          <div className="inputs">
            <label htmlFor="name">Activity name: </label>
            <input name="name" type="text" value={activity.name} onChange={(e)=>changeValues(e)} required={true}/><br/>
        </div>
        <div className="inputs">
          <label htmlFor="difficulty">Difficulty: </label>
          <input list="dif" name="difficulty" required={true} type="range" min="0" max="5" step="1" value={activity.difficulty} onChange={(e)=>changeValues(e)}/><br/>
          <h4 className={activity.difficulty<1?'incomplete':'complete'}> {activity.difficulty} </h4>
          <datalist id="dif">
          <option value='0'/><option value='1'/><option value='2'/><option value='3'/><option value='4'/><option value='5'/>
        </datalist>
        </div>
        <div  className="inputs" >
          <label htmlFor="duration">Duration (hs): </label>
          <input type="number" name="duration" min="0" required={true} value={activity.duration} onChange={(e)=>changeValues(e)}/><br/>
        </div><br/>
        <div className="inputs">
          <label htmlFor="season">Season: </label>
          <input list="seasons" required={true} name="season" value={activity.season} onChange={(e)=>changeValues(e)}/> <br/>
          <datalist id="seasons">
            <option value="summer"/>
            <option value="fall"/>
            <option value="winter"/>
            <option value="spring"/>
          </datalist>
        </div>

        <br/>
        <label htmlFor="countryId">Select countries related to this activity: </label><br/>
        <select multiple={true} id="countryId" required={true} value={activity.countryId} name="countryId" size="10" onChange={(e)=>{
          setActivity({...activity,countryId:Array.from(e.target.selectedOptions).map(el=>el.value)})
        }}>
          {selectList}
        </select><br/>
        <input type="submit" value="Create !"/>
      </form>
      </fieldset>
    </div>
  )
}

const mapStateToProps = (state) => ({     //subscribe component to state.selectedCountry
  countries: state.countries
});

function mapDispatchToProps(dispatch){
  return {
    addActivity: (activity) => dispatch(addActivity(activity))}
}

export default connect(mapStateToProps,mapDispatchToProps)(NewActivity);
