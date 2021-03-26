import React, { useState } from "react";
import PromotionModal from "../Modal/Modal";
import PromotionCard from "../Card/Card";
import useApi from "components/API/useApi";

import "./List.css";

const PromotionList = ({ loading, error, promotions, refetch }) => {
  const [promotionId, setPromotionId] = useState(null);
  const [deletePromotion, DeletePromotionInfo] = useApi({
    method: "DELETE",
  });

  if (error) {
    return <div>Algo de errado não está certo</div>;
  }
  if (promotions === null || DeletePromotionInfo.loading) {
    return <div>Carregando...</div>;
  }

  if (promotions.length === 0) {
    return <div>Nenhum resultado encontrado</div>;
  }

  return (
    <div className="promotion-list">
      {promotions.map((promotion) => (
        <PromotionCard
          key={promotion.id}
          promotion={promotion}
          onClickComments={() => setPromotionId(promotion.id)}
          onClickeDelte={async () => {
            await deletePromotion({
              url: `/promotions/${promotion.id}`,
            });
            refetch();
          }}
        />
      ))}

      {loading && <div>Carregando mais promoções...</div>}

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
