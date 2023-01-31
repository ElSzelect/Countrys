import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {
  searchCountry,
  getCountries,
  getCountriesOrdered,
  filterCountry,
  frontFilter,
  clearResultCountries,
  frontOrder, setPage, getActivities
} from "../../actions";
import {useEffect, useState} from "react";
import './NavBar.css'

export function NavBar(props){

  useEffect(() => {
    props.getCountries();
    props.getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const [searchValue,setSearchValue]= useState('');
  const [orderValue,setOrderValue]= useState('');
  const [filterValue,setFilterValue]= useState('');
  const [frontFilterValue,setFrontFilterValue]= useState('');

  const {activityList,countries,resultCountries,setPage} = props;
  const activitiesOptions = activityList.map(act=><option key={act.id} name={act.name} value={act.name}>{act.name}</option>);
  let con=[];
  const continentOptions = [...countries].sort(compare)
    .filter(e=>{if (con.includes(e.continent)) return false; else {con.push(e.continent); return true;}})
    .map(c => <option name={c.continent} key={c.continent} value={c.continent}>{c.continent}</option>)
  function compare(a,b) {
    if (a.continent < b.continent) return -1;
    if (a.continent > b.continent) return 1;
    return 0;
  }

  function handleSearch(ev){
    ev.preventDefault();
    setOrderValue('');
    setFilterValue('');
    setFrontFilterValue('');
    setPage(1);
    props.searchCountry(searchValue);
    if(!resultCountries.length) setSearchValue('');
  }
  function handleOrder(ev){
    ev.preventDefault();
    if(ev.target.value==='none') return undefined;
    else{  setOrderValue(ev.target.value);
    setPage(1);
    if(resultCountries.length) props.frontOrder(ev.target.value);
    else {
      switch (ev.target.value){
        case 'abc':
          props.getCountriesOrdered('ASC','name');
          break;
          case 'zyx':
          props.getCountriesOrdered('DESC','name');
          break;
        case 'pAsc':
          props.getCountriesOrdered('ASC','population');
          break;
        case 'pDesc':
          props.getCountriesOrdered('DESC','population');
          break;
        default:
          break;
      }
    }
  }}
  function handleFilter(ev){
    ev.preventDefault();
    setOrderValue('');
    setFrontFilterValue('');
    setFilterValue(ev.target.value);
    setPage(1);
    props.filterCountry(ev.target.value);
  }
  function handleFrontFilter(ev){
    ev.preventDefault();
    setFilterValue('');
    setOrderValue('');
    setFrontFilterValue(ev.target.value);
    setPage(1);
    props.frontFilter(ev.target.value);
  }
  function handleClear(ev){
    ev.preventDefault();
    setOrderValue('');
    setFilterValue('');
    setFrontFilterValue('');
    setSearchValue('');
    setPage(1);
    props.clearResultCountries();
  }
  
  
  return (
    <div className="bar">
      <div className="bar1">
        <img className="bar1Img" title="Home" name="img" width={50} src='https://static.thenounproject.com/png/2002086-200.png'  onClick={handleClear} alt='home'/>
        {/*<form id="order" >*/}
        <Link  to="/activity">
          <button className="selForm">NEW ACTIVITY 🗺️</button>
        </Link>
        <form id={'search'} onSubmit={(e)=>handleSearch(e)}>
          <input autoComplete="off" type="search" value={searchValue} onChange={e=>setSearchValue(e.target.value)}/>
          <input type="submit" value="SEARCH 🔍"/>
        </form>
      </div>
      <div className="bar2">
        <select className="selForm" id="order" value={orderValue} onChange={(e)=>handleOrder(e)}>
          <option value="none">ORDER  </option>
          <option value="abc"> A ► Z </option>
          <option value="zyx"> Z ► A </option>
          <option value="pAsc"> Population ▲ </option>
          <option value="pDesc"> Population ▼ </option>
        </select>
        {/*</form>*/}
        <select id="frontFilter" value={frontFilterValue} onChange={(e)=>handleFrontFilter(e)}>
          <option value="">CONTINENT</option>
          {continentOptions}
        </select>
        <select className="selForm" id="contFilter" onChange={(e)=>handleFilter(e)} value={filterValue}>
          <option value="">ACTIVITY</option>
          {activitiesOptions}
        </select>
        <button onClick={e => handleClear(e)}>CLEAR ❌</button>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => ({     //subscribe component to state
  resultCountries: state.resultCountries,
  activityList: state.activityList,
  countries: state.countries
});
function mapDispatchToProps(dispatch){
    return {
      searchCountry: (country) => dispatch(searchCountry(country)),
      getCountries: () => dispatch(getCountries()),
      getCountriesOrdered: (order,param)=>dispatch(getCountriesOrdered(order,param)),
      filterCountry: (activityName)=>dispatch(filterCountry(activityName)),
      frontFilter: (continent)=> dispatch(frontFilter(continent)),
      clearResultCountries: () => dispatch(clearResultCountries()),
      frontOrder: (param) => dispatch(frontOrder(param)),
      setPage: (pageNumber) => dispatch(setPage(pageNumber)),
      getActivities: () => dispatch(getActivities())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(NavBar);