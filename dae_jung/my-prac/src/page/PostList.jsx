import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import postApi from "../api/postsApi";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const data = await postApi.getPosts();
      setPosts(data);
    }
    fetchPost();
  }, []);

  return (
    <div>
      <h2>posts</h2>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`} state={{ post }}>
                <h3>{post.title}</h3>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
