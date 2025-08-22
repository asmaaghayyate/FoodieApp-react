import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom"; 
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar({movies}) {

    const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

const handleSearch = (e) => {
    const titre = e.target.value;
    setSearch(titre);

    if (titre.trim() !== "") {
      navigate(`/moviesrcherches/${titre}`);
    } else {
      navigate("/");
    }
  };

  return (
      <>

  <header className={menuOpen ? "navbar active" : "navbar"}>
    <div className="logoburger">

     <div className="logo">FoodieApp</div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
    </div>
     
       <ul className={menuOpen ? "nav-links active" : "nav-links"}>
        <li className={menuOpen ? "navlink active" : "navlink"}><Link  className="nav-link" to="/">Accueil</Link></li>
        <li className={menuOpen ? "navlink active" : "navlink"}><Link className="nav-link" to="/about">À propos</Link></li>
      </ul>
<Link to="/panier">
<img src="../images/panier2.png" className={menuOpen ? "iconepanier active" : "iconepanier"}/>
</Link>

</header>
    

</>
  );
}
