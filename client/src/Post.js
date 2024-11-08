import React from 'react'
import {formatISO9075} from "date-fns";
import { Link } from 'react-router-dom';
const Post = ({_id,title,summary,cover,content,createdAt,author}) => {
  return (
    <div>
        <div className='post'>
          <div className="image">
            <Link to={`/post/${_id}`}>
              <img src={'http://localhost:4000/'+ cover} alt="" className=""/>
            </Link>
          </div>
          <div className="texts">
              <Link to={`/post/${_id}`}>
                  <h2 class="">{title}</h2>
            </Link>
            <p>
              <a href="" class="">{author.username}</a>
              <time>{formatISO9075(new Date(createdAt))}</time>
            </p>
              <p className="">{summary} 
              </p>
          </div>
          
        </div>
    </div>
  )
}

export default Post