import api from "./axios"


const login = async (email, password) => {

    const response = await api.post("/users/login", {
        email,
        password
    })
    return response
}


export {
    login
}