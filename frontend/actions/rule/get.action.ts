"use server"

import axios from "axios";

export default async function getRules() {
    try {
        const api = `${process.env.API_URL}/rule/get`
        const response = await axios.get(api);
        if(response.data.status === "success"){
            return {
                success: true,
                rules: response.data.data.rules
            }
        } 
        return {
            error: true
        }
    } catch (error) {
        console.log(error);
        return {
            error: true
        }
    }
}