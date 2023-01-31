import {connect} from 'react-redux'
import CountryCard from "../CountryCard";
import {Link} from "react-router-dom";
import "./CountriesGrid.css";
import {setPage} from "../../actions";

export function CountriesGrid(props){

  let i = 1;
  const {resultCountries,countries,currentPage,setPage} = props;
  const countriesToShow = resultCountries.length? resultCountries : countries;
  const total = countriesToShow.length;
  const maxPage = Math.floor(total/10) + 1;

  function nextPage() {
      setPage(currentPage < maxPage ? currentPage + 1 : currentPage);
    }
  function previousPage() {
      setPage(currentPage > 1 ? currentPage - 1 : currentPage)
    }
  function buttonLeft() {
      return currentPage === 1 ? ' ' : <button className="pageButton" onClick={previousPage}>{'<<'}</button>
    }
  function buttonRight() {
      return currentPage === maxPage ? ' ' : <button className="pageButton" onClick={nextPage}>{'>>'}</button>
    }

  const currentCountries = countriesToShow.slice(currentPage === 1 ? 0 : currentPage * 10-11, currentPage*10 - 1);

  return (
    <div className="grid">
      <div className="cards">
        {currentCountries.map(c => {
          return (
            <div key={i++}>
              <Link to={'/country/' + c.id}>
                <CountryCard name={c.name} continent={c.continent} flag={c.flag}/>
              </Link>
            </div>)
        })}
      </div>
      <div className="buttons">{buttonLeft()} <strong className="page"> {currentPage} </strong> {buttonRight()}</div>
    </div>
  )
}

const mapStateToProps = (state) => ({     //subscribe component to state
  countries: state.countries,
  resultCountries: state.resultCountries,
  currentPage: state.currentPage
});
function mapDispatchToProps(dispatch){
  return {
    setPage: (newPage) => dispatch(setPage(newPage))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CountriesGrid);