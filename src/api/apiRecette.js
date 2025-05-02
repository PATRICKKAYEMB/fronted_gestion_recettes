import { data } from "react-router-dom"
import { BASE_URL, api } from "./axios"



export async function get_recette () {
      try {
        const response= await api.get("recette")
        return response.data
        
      } catch (error) {
        throw new Error (error.message)
        
      }
}


export async function ajoutrecette(data) {
  try {
    const response =await api.post("ajouter_recette/",data)
        return response.data
    
  } catch (error) {
    throw new Error (error.message)
    
  }
  
}


export async function login(data) {
  try {
    const url = "token/";
    const fullUrl = BASE_URL + url;
    console.log("➡️ Requête envoyée vers :", fullUrl);

    const response = await api.post(fullUrl, data);
    console.log("Réponse de l'API :", response);

    return response.data;
  } catch (error) {
    console.error("Erreur dans login :", error);

    if (error.response) {
      // Si une réponse est renvoyée par l'API
      console.error("Détails de l'erreur :", error.response.data);
      console.error("Statut de la réponse :", error.response.status);
    }

    throw new Error("Erreur lors du login : " + (error.message || "Erreur inconnue"));
  }
}

export async function get_user() {
  try {
    const response=await api.get("get_user/")
    return response.data
    
  } catch (error) {
    if (error.status===401) {
        throw new Error("imposible d'avoir")
    }
  }
  
}



export async function get_services() {
  try {
    const response =await api.get("get_services/")
    return response.data
    
  } catch (error) {
    if (error.status===401)
    throw new Error("impossible d'avoir le service")    
  }
  
}

export async function creer_recette(data) {
  try {
    const response =await api.post("creer_recette/",data)
    return response.data
    
  } catch (error) {
    if (error.status===4001) {
        throw new Error("imposible de creer")
    }
    
  }
}


// api/apiRecette.js


// api/apiRecette.js

export const voir_recette_user = async ({ service, start_date, end_date, sort, page } = {}) => {
  const params = {}

  if (service) params.service = service
  if (start_date && end_date) {
    params.start_date = start_date
    params.end_date = end_date
  }
  if (sort) params.sort = sort
  if (page) params.page = page

  const response = await api.get('voir_recette/', { params })
  return response.data
}


export const fetchTotalCategorie = async ({ date_debut, date_fin, service }) => {
  const response = await api.get('get_total_categorie/', {
    params: { date_debut, date_fin, service },
  });
  return response.data;
};

export const fetchTotalGeneral = async ({ date_debut, date_fin }) => {
  const response = await api.get('get_total_general/', {
    params: { date_debut, date_fin },
  });
  return response.data;
};

export const count_recettes= async()=>{

  try {
    const response = await api.get("count_recettes/")
      return response.data
}
    
  catch (error) {
    
    if (error.status=== 400){
        throw new Error ("impossible d'avoir le nombre de recettes")
    }
  }
  
}


