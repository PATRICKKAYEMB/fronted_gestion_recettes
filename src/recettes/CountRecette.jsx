import { count_recettes } from '@/api/apiRecette'
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const CountRecette = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["count"],
        queryFn: count_recettes
      })


      const count_recette = data ?? 0; // si data est undefined, on affiche 0

      if (isLoading) {
        return <div>Chargement...</div>
      }
  return (
    <>
            <div className='md:w-60 w-[160px] h-[120px] mb-5 rounded-2xl bg-blue-950 flex flex-col items-center justify-center'>
                <span className='text-center text-white text-2xl'>{count_recette?.count}</span>
                <p className='text-center text-lg text-white'>Recettes</p>
            </div>
    </>
  )
}

export default CountRecette