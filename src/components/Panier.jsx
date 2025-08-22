import { useCartStore } from "../store/cartStore";

export default function Panier() {
  const { panier, supprimerDuPanier, viderPanier } = useCartStore();

  if (panier.length === 0) {
    return <div className="paniervide"> <h2 style={{ textAlign: "center" }}>Votre panier est vide </h2></div>;
  }

  return (
    <div className="page-panier">

        {panier.map((plat, index) => (
          <div key={index} className="item-panier">
            <img src={plat.imageUrl} alt={plat.itemName} className="img-panier" />
            <div className="info-panier">
              <h3>{plat.itemName}</h3>
              <p>{plat.itemDescription}</p>
              <strong className="prixpanier">{plat.itemPrice} MAD</strong>
            </div>
            <button
              onClick={() => supprimerDuPanier(plat.itemID)}
              style={{
                color: "red",
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "50px",
              }}
            >
              X
            </button>
          </div>
        ))}

      <div className="footer-panier">
        <h3>
          Total :{" "}
          {panier.reduce((total, plat) => total + plat.itemPrice, 0)} MAD
        </h3>
        <button className="btn-vider" onClick={viderPanier}>
          Vider le panier
        </button>
      </div>
    </div>
  );
}
