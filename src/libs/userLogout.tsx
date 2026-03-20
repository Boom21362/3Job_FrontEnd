import { resolve } from "path"

export default async function userLogout() {
    
    const response = await fetch("https://3-job-back-end.vercel.app/api/v1/auth/logout",{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        },
    })

    if(!response.ok){
        throw new Error("Failed to log-out")
    }

    return await response.json()
}