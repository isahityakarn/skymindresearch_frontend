import api from "./axios"


export const login = async (email, password) => {

    const response = await api.post("/users/login", {email, password})
    return response
}


