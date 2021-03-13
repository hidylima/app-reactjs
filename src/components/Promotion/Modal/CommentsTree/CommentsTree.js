import React, { useState } from "react";
import "./CommentsTree.css";

function getTree(list) {
  if (!list) {
    return [];
  }

  const roots = [];
  const childrenByParentId = {};

  list.forEach((item) => {
    if (!item.parentId) {
      roots.push(item);
      return;
    }

    if (!childrenByParentId[item.parentId]) {
      childrenByParentId[item.parentId] = [];
    }

    childrenByParentId[item.parentId].push(item);
  });

  console.log(roots, childrenByParentId);
}

const PrmotionModalCommentsTree = ({ comments, sendComment }) => {
  getTree(comments);
  const [comment, setComment] = useState(false);
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if (!comments) {
    return <div>carregando...</div>;
  }

  return (
    <ul className="promontio-modal-comments-tree">
      {comments.map((item) => (
        <li key={item.id} className="promontio-modal-comments-tree__item">
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
            <button
              type="button"
              className="promontio-modal-comments-tree__answer-button "
              onClick={() => {
                setComment("");
                setActiveCommentBox(
                  activeCommentBox === item.id ? null : item.id,
                );
              }}
            >
              Responder
            </button>

            {activeCommentBox === item.id && (
              <div className="promontio-modal-comments-tree__comment-box">
                <textarea
                  value={comment}
                  onChange={(ev) => setComment(ev.target.value)}
                />
                <button
                  type="button"
                  className="promontio-modal-comments-tree__send-button"
                  onClick={() => {
                    sendComment(comment, item.id);
                    setComment("");
                    setActiveCommentBox(null);
                  }}
                >
                  Enviar
                </button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

PrmotionModalCommentsTree.defaultProps = {
  sendComment() {},
};

export default PrmotionModalCommentsTree;
