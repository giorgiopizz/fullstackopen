
import React from "react";

const Notification = ({ notificationMessage }) => {
    const error = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const good = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    if (notificationMessage === null) {
        return null
    }
    const style = notificationMessage.description === 'good' ? good : error

    return (
        <div style={style}>
            {notificationMessage.message}
        </div>
    );

}

export default Notification;