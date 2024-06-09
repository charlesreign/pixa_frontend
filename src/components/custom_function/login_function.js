
import { TOGGLE_AUTH_TOKEN } from "../../store/slice/authSlice";

const userloginfunction = (BASE_URL, username, password, dispatch) => {
    
    let formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)

    const requestOptions = {
        method: 'POST',
        body: formData
    }

    fetch(BASE_URL + 'login', requestOptions)
    .then(response => {
        if (response.ok) {
            return response.json()
        }
        throw response
    })
    .then(data => {
        console.log(data);
        dispatch(TOGGLE_AUTH_TOKEN(data.access_token))
        window.location.replace(process.env.REACT_APP_FRONTEND_BASE_URL)
    })
    .catch(error => {
        console.log(error);
    })
}

export {userloginfunction}