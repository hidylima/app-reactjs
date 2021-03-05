import React, { useEffect, useState } from "react";
import UIModal from "components/UI/Modal/UIModal";
import useApi from "components/API/useApi";
import PrmotionModalCommentsTree from "./CommentsTree/CommentsTree";
import "./Modal.css";

const PromotionModal = ({ promotionId, onClickClose }) => {
  const [comment, setComment] = useState("");
  const [load, loadInfo] = useApi({
    url: "/comments",
    params: {
      promotionId,
      _expand: "user",
    },
  });

  const [sendComment, sendCommentInfo] = useApi({
    url: "/comments",
    method: "POST",
  });

  function onSubmit(ev) {
    ev.preventDefault();
    try {
      sendComment({
        data: {
          userId: 1,
          promotionId,
          comment,
        },
      });

      setComment("");
      load();
    } catch (error) {}
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UIModal isOpen onClickClose={onClickClose}>
      <form className="promotion-modal__comment-form" onSubmit={onSubmit}>
        <textarea
          placeholder="Comentar..."
          onChange={(ev) => {
            setComment(ev.target.value);
          }}
          value={comment}
        />
        <button type="submit" disabled={sendCommentInfo.loading}>
          {sendCommentInfo.loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
      <PrmotionModalCommentsTree comments={loadInfo.data} />
    </UIModal>
  );
};

export default PromotionModal;
