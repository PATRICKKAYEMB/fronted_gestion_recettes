import { count_depenses } from '@/api/apiDepence';
import React from 'react'
import { useQuery } from '@tanstack/react-query'

const CountDepense = () => {

    const { data, isLoading } = useQuery({
        queryKey: ["count_depense"],
        queryFn: count_depenses
      })

    const count_depense = data ?? 0; // si data est undefined, on affiche

    if (isLoading) {
      return <div>Chargement...</div>
    }
  return (
    <>
            <div className='md:w-60 w-[160px] h-[120px] rounded-2xl bg-blue-950 flex flex-col items-center justify-center'>
                <span className='text-center text-white text-2xl'>{count_depense?.count}</span>
                <p className='text-center text-lg text-white'>Depenses</p>
            </div>
    </>
  )
}

export default CountDepense