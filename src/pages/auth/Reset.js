import React from 'react'

const Reset = () => {
    fetch("http://pixagram")
        .then(response => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    return (
        <div>
            Reset
        </div>
    )
}

export default Reset
