"use server"

import axios from "axios";

export default async function combineRules(values: any) {
    try {
        const { rule1, rule2 } = values;
        const rules = [rule1, rule2];
        const api = `${process.env.API_URL}/rule/combine`

        const response = await axios.post(api, { rules });
        if(response.data.status === "success"){
            return {
                success: true,
            }
        }
        return {
            error: true,
        }
    } catch (error) {
        console.log(error);
        return {
            error: true
        }
    }
    
    
}