"use server"

import axios from 'axios';

export const createRule = async(values: any) =>  {
    try {
        console.log(values);
        const { rule } = values;
        const ruleString = rule;
        const api = `${process.env.API_URL}/rule/create`;

        const response = await axios.post(api, { ruleString });
        if(response.data.status === "success"){
            return {
                success: true,
            }
        }
        return {
            error: true,
        }
    } catch (error) {
        console.error('Error creating rule:', error);
        return {
            error: true
        }
    }
}
