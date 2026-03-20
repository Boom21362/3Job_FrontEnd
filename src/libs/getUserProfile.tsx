export default async function getUserProfile(token:string){

    console.log("Fetching profile with token:", token ? "Token Received" : "MISSING TOKEN");
    const response = await fetch("https://3-job-back-end.vercel.app/api/v1/auth/me",{
        method: "GET",
        headers:{
            authorization: `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error("Cannot get user profile")
    }

    return await response.json()
}