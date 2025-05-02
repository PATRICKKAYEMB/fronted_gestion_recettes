import { api } from "./axios"


export const create_depenses = async (data)=>{
    try {
        
        const response = await api.post("create_depenses/",data)
        console.log(response.data)
        return response.data
        
        
    } catch (error) {
       if (error?.status==400){
            throw new Error ("veiller bien verifier vos donnees")
       } 
    }
}

export const get_depenses = async ({ date_debut, date_fin, sort, page } = {}) => {
    try {
      const params = {};
  
      if (date_debut) params.date_debut = date_debut;
      if (date_fin) params.date_fin = date_fin;
      if (sort) params.sort = sort;
      if (page) params.page = page;
  
      const response = await api.get("get_depenses/", { params });
      return response.data;
      
    } catch (error) {
      console.error('Erreur lors de la récupération des dépenses:', error);
      throw error;
    }
  }
  

export const count_depenses = async ()=>{
    try {
        const response = await api.get("count_depenses/")
        return response.data
        
    } catch (error) {
        if (error?.status=== 401){
            throw new Error ("impossible de voir les nombres des depenses")
        }
        
    }
}
