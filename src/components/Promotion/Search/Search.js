import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PromotionList from "../List/List";
import "./Search.css";

const PromotionSearch = () => {
  const [promotions, setPromotions] = useState([]);
  const [search, setSearch] = useState("");
  const params = {};

  if (search) {
    params.title_like = search;
  }
  useEffect(() => {
    axios
      .get("http://localhost:3004/promotions?_embed=comments", { params })
      .then((response) => {
        setPromotions(response.data);
      });
  }, [search]);

  return (
    <div className="promotion-search">
      <header className="promotion-search__header">
        <h1>Promo show</h1>
        <Link to="/create">Novo Produto</Link>
      </header>
      <input
        className="promotion-search__input"
        placeholder="Buscar"
        type="search"
        name="seach"
        id="search"
        onChange={(ev) => setSearch(ev.target.value)}
      />
      <PromotionList promotions={promotions} loading={!promotions.length} />
    </div>
  );
};

export default PromotionSearch;
