import React from "react"
import "./CharacterDetail.css"

export default function CharacterDetail(props) {

    const handleClick = () => {
        props.toggle()
    }

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <div>
          <img src={props.element.image}></img>
        </div>
        <p>{props.element.name}</p>
        <p>{props.element.status}</p>
        <p>{props.element.species}</p>
        <p>{props.element.gender}</p>
        <p>{props.element.location.name}</p>
        <p>{props.element.created}</p>
      </div>
    </div>
  )
}
