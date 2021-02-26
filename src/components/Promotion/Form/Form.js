import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const initValues = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = () => {
  const [values, setValues] = useState(initValues);
  const navigate = useNavigate();
  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    axios.post("http://localhost:3004/promotions", values).then((response) => {
      navigate("/");
    });
  }
  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>

      <form action="" method="post" onSubmit={onSubmit}>
        <div className="promotion-form__grup">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__grup">
          <label htmlFor="url">Link</label>
          <input
            type="text"
            name="url"
            id="url"
            placeholder="url"
            onChange={onChange}
          />
        </div>

        <div className="promotion-form__grup">
          <label htmlFor="imageUrl">Imagem (URL)</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder="imageUrl"
            onChange={onChange}
          />
        </div>
        <div className="promotion-form__grup">
          <label htmlFor="price">Preço</label>
          <input
            type="nunber"
            name="price"
            id="price"
            placeholder="preço"
            onChange={onChange}
          />
        </div>
        <div>
          <button>Salvar</button>
        </div>
      </form>
    </div>
  );
};

export default PromotionForm;
