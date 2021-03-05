import React from "react";
import "./CommentsTree.css";
const PrmotionModalCommentsTree = ({ comments }) => {
  if (!comments) {
    return <div>carregando...</div>;
  }
  return (
    <ul className="promontio-modal-comments-tree">
      {comments.map((item) => (
        <li className="promontio-modal-comments-tree__item">
          <img
            className="promontio-modal-comments-tree__item__avatar"
            src={item.user.avatarUrl}
            alt={`foto do ${item.user.name}`}
          />
          <div className="promontio-modal-comments-tree__item__info">
            <span className="promontio-modal-comments-tree__item__info__name ">
              {item.user.name}
            </span>
            <p>{item.comment}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PrmotionModalCommentsTree;
