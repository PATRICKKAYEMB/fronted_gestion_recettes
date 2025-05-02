import { creer_recette, get_services } from '@/api/apiRecette'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import SpinnerPost from '@/components/SpinnerPost'

const AjouterRecette = () => {
  const { register, handleSubmit, setValue, watch } = useForm()
  const navigate = useNavigate()

  // 🔁 Récupération des services pour la sélection
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: get_services,
  })

  // ✅ Mutation pour créer une recette
  const mutation = useMutation({
    mutationFn: creer_recette,
    onSuccess: () => {
      toast.success("Recette ajoutée avec succès !")
      navigate("/voir_recettes")
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de la recette.")
    }
  })

  // 📤 Soumission du formulaire
  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append("service", data.service)
    formData.append("montant", data.montant)
    formData.append("date", data.date)
    mutation.mutate(formData)
    console.log(formData)
  }

  return (
    <div className=" p-6 shadow rounded w-full h-[80vh] items-center justify-center flex">
     <div className='w-full max-w-md bg-white p-6 rounded-2xl shadow-lg '>

     <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Ajouter une Recette</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
         

            <div>
              <Label htmlFor="montant">Montant</Label>
              <Input
                id="montant"
                type="number"
                step="0.01"
                {...register("montant", { required: true })}
                className="mt-2 mb-4"
              />
            </div>

            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                {...register("date", { required: true })}
                className="mt-2 mb-4"
              />
            </div>

            <div>
              <Label htmlFor="service " className="mb-2">Service:</Label>
              <Select className="mb-4"
                onValueChange={(value) => setValue("service", value)}
              >
                <SelectTrigger >
                  <SelectValue placeholder="Choisir un service"  />
                </SelectTrigger>
                <SelectContent className="mb-4">
                  {services?.map((service) => (
                    <SelectItem
                      key={service.id}
                      value={String(service.id)}
                    >
                      {service.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
                  {mutation.isLoading?<SpinnerPost/>:""} Ajouter
            </button>
          </form>
    </div>
    </div>
  )
}

export default AjouterRecette
