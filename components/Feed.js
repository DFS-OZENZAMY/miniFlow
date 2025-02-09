import React, { useState, useEffect } from "react";
import { db, storage } from "./firebase";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async (postId) => {
    await addDoc(collection(db, `posts/${postId}/likes`), {
      userId: auth.currentUser.uid,
      timestamp: new Date(),
    });
  };

  const handlePost = async () => {
    let fileURL = "";
    if (file) {
      const fileRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(fileRef, file);
      fileURL = await getDownloadURL(fileRef);
    }

    await addDoc(collection(db, "posts"), {
      text: newPost,
      image: fileURL,
      timestamp: new Date(),
    });

    setNewPost("");
    setFile(null);
  };

  return (
    <div>
      <textarea
        placeholder="Quoi de neuf ?"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handlePost}>Poster</button>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="Post" style={{ width: "100px" }} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;