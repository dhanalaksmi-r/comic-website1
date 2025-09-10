import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const GalleryPage = () => {
  const initialImages = [
    { id: 1, src: "/images/comic.png", title: "", likes: 0, comments: [] ,showInput:false},
    //{ id: 2, src: "/images/img2.jpg", title: "Mountain View", likes: 0, comments: [] },
    //{ id: 3, src: "/images/img3.jpg", title: "City Lights", likes: 0, comments: [] },
  ];

  const [images, setImages] = useState(initialImages);
  const [newComment,setNewComment]=useState({});

  //  Like
  const handleLike = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, likes: img.likes + 1 } : img
      )
    );
  };
  const toggleCommentBox = (id) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, showInput: !img.showInput } : img
      )
    );
  };

  //  Comment
  const handleComment = (id) => {
    
    if (!newComment[id]) return;
      setImages((prev) =>
        prev.map((img) =>
          img.id === id
            ? { ...img, comments: [...img.comments, newComment[id]],showInput:false }
            : img
        )
      );
     setNewComment({...newComment,[id]:""});
  };

  // Share
  const handleShare = async (id) => {
    const img = images.find((img) => img.id === id);
    if (img?.src) {
      try {
        await navigator.clipboard.writeText(window.location.origin + img.src);
        alert("Image link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📸 Gallery</h2>
      <div className="row">
        {images.map((img) => (
          <div className="col-md-4 mb-4" key={img.id}>
            <div className="card shadow">
              <img
                src={img.src}
                className="card-img-top"
                alt={img.title}
                style={{ height: "auto", objectFit: "contain",width:"100%" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{img.title}</h5>
                <p>{img.likes} Likes</p>

                <button
                  className="btn btn-outline-primary me-2"
                  onClick={() => handleLike(img.id)}
                >
                  👍 Like
                </button>
                <button
                  className="btn btn-outline-secondary me-2"
                  onClick={() => toggleCommentBox(img.id)}
                >
                  💬 Comment
                </button>
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleShare(img.id)}
                >
                  🔗 Share
                </button>

                {/* Comments Section */}
                {img.showInput && (
                  <div className="mt-3">
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Write a comment..."
                      value={newComment[img.id] || ""}
                      onChange={(e) =>
                        setNewComment({ ...newComment, [img.id]: e.target.value })
                      }
                    />
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleComment(img.id)}
                    >
                      Post Comment
                    </button>
                  </div>
                )}

                {img.comments.length > 0 && (
                  <div className="mt-3 text-start">
                    <strong>Comments:</strong>
                    <ul className="list-group mt-2">
                      {img.comments.map((c, i) => (
                        <li key={i} className="list-group-item">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
