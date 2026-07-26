import { useState } from "react";

function PostCard({
  item,
  handleLike,
  handleDelete,
  handleComment,
  handleEdit,
}) {
  const [comment, setComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.content);

  return (
    <div className="bg-white shadow rounded-xl p-5 mt-5">

      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-bold text-lg">
            {item.author}
          </h2>

          <p className="text-gray-400 text-sm">
            {new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {isEditing ? (
        <textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full border rounded p-2 mt-3"
        />
      ) : (
        <p className="mt-3">{item.content}</p>
      )}

      {item.image && (
        <img
          src={item.image}
          alt="post"
          className="mt-4 rounded-lg w-full"
        />
      )}

      <div className="flex gap-2 mt-4 flex-wrap">

        <button
          onClick={() => handleLike(item._id)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          👍 {item.likes}
        </button>

        <button
          onClick={() => handleDelete(item._id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          🗑 Delete
        </button>

        {isEditing ? (
          <button
            onClick={() => {
              handleEdit(item._id, editedText);
              setIsEditing(false);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            💾 Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            ✏ Edit
          </button>
        )}

      </div>

      <div className="mt-5">

        <input
          type="text"
          value={comment}
          placeholder="Write a comment..."
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          onClick={() => {
            handleComment(item._id, comment);
            setComment("");
          }}
          className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
        >
          Add Comment
        </button>

      </div>

      <div className="mt-4">

        {item.comments.length === 0 ? (
          <p className="text-gray-400">
            No comments yet
          </p>
        ) : (
          item.comments.map((c, index) => (
            <p
              key={index}
              className="border-t py-2"
            >
              💬 {c}
            </p>
          ))
        )}

      </div>

    </div>
  );
}

export default PostCard;