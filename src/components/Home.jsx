import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import { fetchRestaurants } from "../api/restaurantApi";

export default function Home(){

  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);
const[categoreis,setCategories]=useState([]);

 useEffect(() => {
    fetchRestaurants()
      .then(data => setRestaurants(data))
      .catch(err => setError(err.message))
    .finally(() => setLoading(false)); 

  }, []);


if (loading) return <div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>;

  if (error) return <p>Erreur : {error}</p>;


    return(
        <>

 <img src="./images/home2.jpg" className="hero-image"/>

 <div className="text-hero">Profitez de toutes nos saveurs a la maison</div>


      <div className="categorie-marquee">
  <div className="categorie-content">
    {[...new Set(restaurants.map(r => r.type.trim()))].map((type, i) => (
      <p key={i} className="type">{type}</p>
    ))}
     {[...new Set(restaurants.map(r => r.type.trim()))].map((type, i) => (
      <p key={i} className="type">{type}</p>
    ))}
  
  </div>
</div>
       


<div className="list">

        {restaurants.map(r => (
<div className="card" key={r.restaurantID}>
  <Link to={`/details/${r.restaurantID}`}>
  
  <img 
    src={`https://picsum.photos/300/200?random=${r.restaurantID+1}`} 
    alt={r.restaurantName} 
    className="restaurant-img" />
  </Link> 
  <h3 className="nameresto">{r.restaurantName}</h3>
  <p>{r.type}</p>

          </div>
        ))}
</div>




</>
    )
    ;
}