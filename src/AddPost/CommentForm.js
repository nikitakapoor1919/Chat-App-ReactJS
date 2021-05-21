import React, { useState } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"

const CommentBox = styled.div`
  input,
  textarea {
    display: block;
    background-color: #fff;
    border: 2px solid #ddd;
    font-size: 16px;
    font-family: "Hind", sans-serif;
    font-weight: 400;
    padding: 10px 12px 8px;
    width: 100%;
    font-variant-numeric: lining-nums;
    font-feature-settings: "lnum";
  }
  input[type="text"] {
    width: 50%;
  }
  label {
    display: block;
    margin-bottom: 20px;
  }
`

const CommentForm = ({ parentId, slug }) => {
  const [name, setName] = useState("")
  const [content, setContent] = useState("")

  const handleCommentSubmission = async e => {
    e.preventDefault()
    let comment = {
      name: name,
      content: content,
      pId: parentId || null,
      time: new Date(),
    }
    setName("")
    setContent("")
    console.log(comment)
  }

  return (
    <CommentBox>
      <form onSubmit={e => handleCommentSubmission(e)}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="comment">
          Comment
          <textarea
            id="comment"
            onChange={e => setContent(e.target.value)}
            value={content}
            name="comment"
            required="required"
            cols="45"
            rows="8"
          ></textarea>
        </label>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </CommentBox>
  )
}

CommentForm.propTypes = {
  parentId: PropTypes.string,
  slug: PropTypes.string.isRequired
}

export default CommentForm