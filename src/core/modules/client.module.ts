import axios from 'axios';
import { useAuthentication } from '@/cookies/auth.cookie.ts';
import environment from '../environment.js';


const {ENGINE_URL} = environment

export class apiClient  {
    private url : string;
    private axiosInstance : any

    constructor(url:string){
        this.url = ENGINE_URL+"/"+url
        this.axiosInstance = axios.create()
    }

    public get = async  (parameters:Array<any>|any = undefined) =>{
        let parameters_url = ""
        if(typeof parameters!='string')
        {
            parameters.forEach((key:any,value:any) => {parameters_url+=key+'='+value+"&"});
        }
        else {
            parameters_url = parameters
        }
        try {
            const response = await this.axiosInstance.get(`${this.url}${parameters_url}`,{
                headers:{
                    Authorization:`Bearer ${useAuthentication().value}`
                }
            })
            return response.data
        }
        catch(error){
            console.log("🛑 , Erreur lors de la recherche des données")
            throw error
        }
    }

    public find = async (id:number|string|string[]) =>{
        try {
            const response = await this.axiosInstance.get(`${this.url}/${id}`,{
                headers:{
                    Authorization:`Bearer ${useAuthentication().value}`
                }
            })
            return response.data
        }
        catch(error){
            throw "Error";
            console.log("🛑 , Erreur lors de la recherche de l'élement")
        }
    }

    public destroy = async (id:any)=>{
        try {
            const response = await this.axiosInstance.delete(`${this.url}/${id}`,{
                headers:{
                    Authorization:`Bearer ${useAuthentication().value}`
                }
            })
            return response.data
        }
        catch(error){
            console.log("🛑 , Erreur lors de la suppression de l'element")
        }
    }

    public post = async (request:any,custom_message:string = "'Erreur lors de l'ajout de l'element",sec_url:string='',req_headers:any = {}) =>{
        try {
            const response = await this.axiosInstance.post(this.url+sec_url,request,{
                headers:{
                    Authorization:`Bearer ${useAuthentication().value}`,
                    ...req_headers
                }
            })
            return response.data
        }
        catch(error){
            console.log("🛑 ,"+custom_message)
            throw custom_message
        }
    }

    public update = async (id:any , request:any)=>{
        try {
            const response = await this.axiosInstance.patch(`${this.url}/${id}`,request,{
                headers:{
                    Authorization:`Bearer ${useAuthentication().value}`
                }
            })
            return response.data
        }
        catch(error){
            console.log("🛑 , Erreur lors de la modification de l'element")
        }
    }
}