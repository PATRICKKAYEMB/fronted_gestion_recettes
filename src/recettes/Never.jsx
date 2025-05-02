import { voir_recette_user } from '@/api/apiRecette'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ListesRecettes = () => {
  const { data, isPending } = useQuery({
    queryKey: ['recettes_user'],
    queryFn: voir_recette_user,
  })

  const recettes = data || []

  return (
    <div className="overflow-x-auto p-4">
      {isPending ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-2xl overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Montant</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recettes.map((recette, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{recette.nom_service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{recette.montant} Fc</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{recette.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-right">
                  <button className="text-blue-600 hover:underline">Voir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListesRecettes
