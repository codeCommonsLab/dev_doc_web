import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPosts() {
      const URL = "http://localhost:3000/posts";
      const response = await axios.get(URL);
      const data = response.data;

      setPosts(data);
    }

    fetchPosts();
  }, []);

  function handleSearch(event) {
    if (event.target.value === "") {
      setSearchResult(null);
      return;
    }

    const filteredPosts = posts.filter((post) =>
      post.title.includes(event.target.value)
    );

    const titlesWithTag = filteredPosts.map((post) => (
      <li key={post.id}>{post.title}</li>
    ));

    setSearchResult(titlesWithTag);
  }

  return (
    <div>
      <h2>posts</h2>
      <label htmlFor="search">게시물 검색 : </label>
      <input
        type="text"
        id="search"
        name="search"
        onChange={handleSearch}
        placeholder="제목을 입력해 주세요"
      />
      <ul>{searchResult}</ul>
      <ul>
        {posts.map((post) => {
          const { id, title, content } = post;
          return (
            <li key={id}>
              <Link to={`/posts/${id}`} state={{ post }}>
                <h3>{title}</h3>
              </Link>
              <h3
                onClick={() => {
                  // 이동을 하고 싶다
                  navigate(`/posts/${id}`);
                }}
              >
                {title}
              </h3>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
