import { useParams, Link, useNavigate } from 'react-router-dom'
import React, { useContext } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts'

const PostPage = () => {
  const { posts, setPosts } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
    // Use axios to delete an entry from the JSON file
    await api.delete(`/posts/${id}`);
    const postsList = posts.filter(posts => posts.id !== id);
    setPosts(postsList);
    navigate('/');
    } catch (err) {
    console.log(`Error: ${err.message}`)
    }
  }

  const returnDate = (timeStamp) => {
    const date = new Date(timeStamp.toString());
    return date.toLocaleString('nl-NL');
  }

  return (
    <main className="PostPage">
        <article className="post">
          {post &&
            <>
              <h2>{post.title}</h2>
              <p className="postDate">{returnDate(post.datetime)}</p>
              <p className="postBody">{post.body}</p>
              <Link to={`/edit/${post.id}`}><button className="editButton">Post aanpassen</button></Link>
              <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                Post verwijderen
              </button>
            </>
          }
          {!post &&
            <>
                <h2>Post niet gevonden</h2>
                <p>
                    <Link to='/'>Terug naar Homepage</Link>
                </p>
            </>
          }
        </article>
    </main>
  )
}

export default PostPage