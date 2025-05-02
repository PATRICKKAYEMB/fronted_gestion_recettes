import { count_depenses } from '@/api/apiDepence'
import { count_recettes } from '@/api/apiRecette'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CountRecette from './CountRecette'
import CountDepense from '@/Depense/CountDepense'

const DashBord = () => {
 
 

  return (
    <div className='w-full h-[80vh] md:flex items-center flex justify-center gap-5'>
        <div>
           <CountRecette/>
          <CountDepense/>
      </div>
    </div>
  )
}

export default DashBord;
