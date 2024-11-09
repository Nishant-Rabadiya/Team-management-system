import React from 'react'

const MessageIcon = (props) => {
    return (
        <div>
            <p className='notification-icon m-0'><i className={props.icon}></i></p>
        </div>
    )
}

export default MessageIcon;
