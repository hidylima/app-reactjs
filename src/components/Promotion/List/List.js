import React, { useState } from "react";
import PromotionCard from "../Card/Card";
import PromotionModal from "../../Promotion/Modal/Modal";
import "./List.css";

const PromotionList = ({ loading, error, promotions }) => {
  const [promotionId, setPromotionId] = useState(null);

  if (error) {
    return <div>Algo de errado não esta certo...</div>;
  }

  if (loading || !promotions) {
    return <div>Carregando...</div>;
  }

  if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard
          promotion={promotion}
          key={promotion.id}
          onClickComments={() => setPromotionId(promotion.id)}
        />
      ))}
      {promotionId && (
        <PromotionModal
          promotionId={promotionId}
          onClickClose={() => setPromotionId(null)}
        />
      )}
    </div>
  );
};

export default PromotionList;
