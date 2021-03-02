import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../../API/useApi";
import "./Form.css";

const initialValue = {
  title: "",
  url: "",
  imageUrl: "",
  price: 0,
};

const PromotionForm = ({ id }) => {
  const [values, setValues] = useState(id ? null : initialValue);
  const navigate = useNavigate();
  const [load] = useApi({
    url: `/promotions/${id}`,
    method: "get",
    onCompleted: (response) => {
      setValues(response.data);
    },
  });

  const [save, saveInfo] = useApi({
    url: id ? `/promotions/${id}` : `/promotions`,
    method: id ? "put" : "post",
    data: values,
    onCompleted: (respose) => { 
      if (!respose.error) {
        navigate("/");
      }
    },
  });

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id]);

  function onChange(ev) {
    const { name, value } = ev.target;
    setValues({ ...values, [name]: value });
  }

  function onSubmit(ev) {
    ev.preventDefault();

    save({
      data: values,
    });
  }

  if (!values) {
    return <div>carregando...</div>;
  }
  return (
    <div>
      <h1>Promo Show</h1>
      <h2>Nova Promoção</h2>
      {saveInfo.loading && <span>Salvando dados...</span>}
      <form action="" method="post" onSubmit={onSubmit}>
        <div className="promotion-form__grup">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="title"
            onChange={onChange}
            value={values.title}
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
            value={values.url}
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
            value={values.imageUrl}
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
            value={values.price}
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
