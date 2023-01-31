import './CountryCard.css'
export default function CountryCard(props){
  return (
    <div className="card">
      {/*{props.match.params.id}*/}
      <h3>{props.name?props.name:'country name'}</h3>
      <img className="flag" src={props.flag} height={120} width={180} alt='flag not found'/>
      <h4>{props.continent? props.continent:'continent'}</h4>
    </div>
  )
}
