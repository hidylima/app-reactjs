import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useApi from "../../API/useApi";
import PromotionList from "../List/List";
import "./Search.css";

const PromotionSearch = () => {
  const [search, setSearch] = useState("");
  const [load, loadInfo] = useApi({
    url: "/promotions",
    method: "get",
    params: {
      _embed: "comments",
      _order: "desc",
      _sort: "id",
      title_like: search || undefined,
    },
  });

  useEffect(() => {
    load();
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
      <PromotionList
        promotions={loadInfo.data}
        loading={loadInfo.loading}
        error={loadInfo.error}
      />
    </div>
  );
};

export default PromotionSearch;
