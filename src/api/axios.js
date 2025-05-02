import  Axios  from "axios";

import { jwtDecode } from "jwt-decode";

export const BASE_URL =import.meta.env.VITE_BASE_URL

export const api= Axios.create({
    baseURL:BASE_URL
})

api.interceptors.request.use(
    (config)=>{
        const token= localStorage.getItem("access")
        if (token) {
                const tokens=jwtDecode(token)
                const date_exp=tokens.exp
                const date_act=Date.now()/1000
                if (date_exp>date_act) {
                    config.headers.Authorization =`Bearer ${token}`
                }
        }
        return config

    },
    (error)=>{
        return Promise.reject(error)
    }
    
)
