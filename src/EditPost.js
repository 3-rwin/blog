import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import DataContext from './context/DataContext';
import api from './api/posts';
import { format } from 'date-fns';

const EditPost = () => {
  const [editTitle, setEditTitle]  = useState('');
  const [editBody, setEditBody]  = useState('');
  const { posts, setPosts } = useContext(DataContext);
  const navigate = useNavigate();

  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);

  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditTitle, setEditBody])

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    try {
    const response = await api.put(`/posts/${id}`, updatedPost);
    setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
    setEditTitle('');
    setEditBody('');
    navigate('/');
    } catch (err) {
    console.log(`Error: ${err.message}`)
    }
  }

  return (
    <main className="NewPost">
      {editTitle && 
        <>
          <h2>Post aanpassen</h2>
          <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="editTitle">Titel:</label>
            <input 
              id="editTitle"
              type="text"
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='editBody'>Post:</label>
            <textarea
              id="editBody"
              required
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type="submit" onClick={() => handleEdit(post.id)}>Invoeren</button>
          </form>
        </>
      }
      {!editTitle &&
        <>
            <h2>Post Niet gevonden</h2>
            <p>
                <Link to='/'>Terug naar Homepage</Link>
            </p>
        </>
      }
  </main>
  )
}

export default EditPost