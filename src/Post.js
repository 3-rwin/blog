import React from 'react'
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  const returnDate = (timeStamp) => {
    const date = new Date(timeStamp.toString());
    return date.toLocaleString('nl-NL');
  }

  return (
    <article className="post">
        <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p className="postDate">{returnDate(post.datetime)}</p>
        </Link>
        <p className="postBody">{
            (post.body).length <= 25
            ? post.body
            : `${post.body.slice(0, 25)}...`
        }</p>
    </article>
  )
}

export default Post