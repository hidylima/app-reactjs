import React, { useMemo, useState } from "react";
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

  function buildNodes(nodes) {
    if (!nodes) {
      return null;
    }

    return nodes.map((node) => ({
      ...node,
      children: buildNodes(childrenByParentId[node.id]),
    }));
  }

  return buildNodes(roots);
}

const PrmotionModalCommentsTree = ({ comments, sendComment }) => {
  const tree = useMemo(() => getTree(comments), [comments]);

  const [comment, setComment] = useState(false);
  const [activeCommentBox, setActiveCommentBox] = useState(null);

  if (!comments) {
    return <div>carregando...</div>;
  }

  function renderItem(item) {
    return (
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

          {item.children && renderList(item.children)}
        </div>
      </li>
    );
  }

  function renderList(list) {
    return (
      <ul className="promontio-modal-comments-tree">{list.map(renderItem)}</ul>
    );
  }

  return renderList(tree);
};

PrmotionModalCommentsTree.defaultProps = {
  sendComment() {},
};

export default PrmotionModalCommentsTree;
