import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchRestaurants } from "../api/restaurantApi";
import { useCartStore } from "../store/cartStore";
import { MapPin, Utensils , ParkingCircle} from "lucide-react";

export default function Detailresto() {
  const { id } = useParams(); // id venant de l'URL
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [menu, setMenu] = useState([]); // ✅ État pour stocker le menu


  const { panier, ajouterAuPanier, supprimerDuPanier } = useCartStore();


 


  useEffect(() => {
    fetchRestaurants()
      .then((data) => {
        // Chercher le resto par son ID
        const resto = data.find((r) => r.restaurantID === parseInt(id));
        setRestaurant(resto);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

 fetch(`/api/Restaurant/${id}/menu`)
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));

  }, [id]

);

  if (loading) return 
  <div class="loader">
  <span></span>
  <span></span>
  <span></span>
</div>;
  if (error) return <p>Erreur : {error}</p>;
  if (!restaurant) return <p>Aucun restaurant trouvé.</p>;

  return (
<div className="detailpanier">


<div>


<div className="detail-resto">
    <div>
            <h2>{restaurant.restaurantName}</h2>

      <img
        src={`https://picsum.photos/600/400?random=${restaurant.restaurantID}`}
        alt={restaurant.restaurantName}
        className="detail-img"/>
</div>
<div className="details">
       <p className="adresse">
        <MapPin size={18} /> {restaurant.address}
      </p>
     <p className="cuisine">
        <Utensils size={18} /> {restaurant.type}
      </p>

   <p className={`park ${
           restaurant.parkingLot ? "oui" : "non"
        }`}
      >
        <ParkingCircle size={18} />
        {restaurant.parkingLot ? "Parking disponible" : "Pas de parking"}
      </p>
      
      
      </div>
</div>
 

 <div className="listmenu">
    
      {menu.length > 0 ? (
        
          menu.map((item) => (
    <div className="cardmenu" key={item.itemID}>
    <img src={item.imageUrl} alt={item.itemName}  className="imgmenu" />

     <strong >{item.itemName}</strong>
     <p className="prix"> {item.itemPrice} MAD</p>
     <p>{item.itemDescription}</p>
    <button  className="btn-panier"
                  onClick={() => ajouterAuPanier(item)}

    >Ajouter au panier</button>

     </div>
          ))

      ) : (
        <p>Aucun plat disponible.</p>
      )}
</div>
</div>


<div className="commande">
  <h3>Votre commande</h3>

  {panier.length === 0 ? (
  <>
      <img src="../images/panier1.png" width={200}  style={{
        
maxWidth: "100%", 
      height: "auto", 
      marginTop: "40px", 
      display: "block", 
      marginLeft: "auto", 
      marginRight: "auto"         
        }}/>
    <h2 style={{ textAlign: "center" ,fontSize:"20px",marginTop:"70px"}}>
      Votre panier est vide</h2>
      </>
  ) : (
    <>
      {panier.map((plat, i) => (
        <div className="panierdetail" key={i}>
          <div className="namemenu">{plat.itemName}</div>
          <div>{plat.itemPrice} MAD</div>
          <div>
            <button 
              onClick={() => supprimerDuPanier(plat.itemID)} 
              style={{ color: "red", border: "none", background: "transparent", cursor: "pointer" }}
            >
              X
            </button>
          </div>
        </div>
      ))}

      <div className="prixtotal">
        Commander pour{" "}
        {panier.reduce((total, plat) => total + plat.itemPrice, 0)} MAD
      </div>
    </>
  )}
</div>

</div>
);}
