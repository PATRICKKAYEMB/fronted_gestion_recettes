import { create_depenses } from '@/api/apiDepence'
import SpinnerPost from '@/components/SpinnerPost'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from "@/components/ui/textarea"
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import React from 'react'


const AjouterDepense = () => {
  const { handleSubmit, register } = useForm()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: create_depenses,
    onSuccess: () => {
      toast.success("Ajouté avec succès")
      navigate("/voir_depense")
    },
    onError: () => {
      toast.error("Échec de l'ajout")
        
    }
  })

  const onSubmit= (data)=>{
    const form_data = new FormData()
    form_data.append("montant", data.montant)
    form_data.append("date", data.date)
    form_data.append("description", data.description)
    mutation.mutate(form_data)
    console.log(data)
  }


  return (
    <div className="flex justify-center items-center h-[80vh] p-4 ">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg ">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Ajouter une Dépense</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
          
          <div>
            <Label htmlFor="montant" className="text-gray-700">Montant</Label>
            <Input
              id="montant"
              type="number"
              placeholder="Entrez le montant"
              {...register("montant", { required: true })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="date" className="text-gray-700">Date</Label>
            <Input
              id="date"
              type="date"
              {...register("date", { required: true })}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-700">Description</Label>
            <Textarea
              id="description"
              placeholder="Ajoutez une description"
              {...register("description")}
              className="mt-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading? <SpinnerPost /> : "Ajouter"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AjouterDepense
