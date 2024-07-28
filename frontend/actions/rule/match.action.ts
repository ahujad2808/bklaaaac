"use server"

import axios from "axios";

export const matchRule = async (values: any) => {
    try {
        const { rule, age, department, salary, experience } = values;
        const data = { 
                age: parseInt(age, 10), 
                department, 
                salary: parseInt(salary, 10) , 
                experience: parseInt(experience, 10) 
            };
        const reqData = { rule, data}

        const api = `${process.env.API_URL}/rule/evaluate`;

        const response = await axios.post(api, { rule, data });
        console.log(response)
        if(response.data.status === "success"){
            if(response.data.data.passed === true){
                return {
                    matched: true,
                }
            }
            else if(response.data.data.passed === false){
                return {
                    notMatched: true,
                }
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