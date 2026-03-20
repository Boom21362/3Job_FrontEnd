import { resolve } from "path"

export default async function userLogin(email:string, password:string) {
    console.log("--- [LIB] Attempting fetch to Backend ---");
    try {
        const response = await fetch("https://3-job-back-end.vercel.app/api/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        console.log("--- [LIB] Fetch Status ---", response.status);
        const data = await response.json();
        console.log("--- [LIB] Backend Data ---", data);
        return data;
    } catch (err) {
        console.error("--- [LIB] FETCH CRASHED ---", err);
        throw err; // Send it back to authorize
    }
}