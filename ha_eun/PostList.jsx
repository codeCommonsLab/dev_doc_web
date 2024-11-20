import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const url = 'http://localhost:3000/posts';
        const response = await axios.get(url);
        const data = response.data;
        setPosts(data);
      } catch (err) {
        setError('무언가의 에러가 났어');
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div>로딩중</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  ///////////////////////// 게시글 검색 기능 /////////////////////////

  const [myInput, setInput] = useState('');

  return (
    <div>
      <h2>posts</h2>
      <label htmlFor="search">게시글 검색 </label>
      <input
        type="text"
        name="search"
        id="search"
        onChange={(e) => setInput(e.target.value)}
      />
      <div>{myInput}</div>
      <ul>
        {myInput &&
          posts
            .filter((post) => 
              post.title.includes(myInput[0]))
            .map((post) => {
              return <li>{post.title}</li>;
            })}
      </ul>
      
  {/* ////////////////////// 게시글 검색 기능 ///////////////////// */}
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
