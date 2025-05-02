
import { useQuery } from '@tanstack/react-query'

import React, { useEffect, useState } from "react";
import PagePagination from "@/components/PagePagination";
import { get_depenses } from '@/api/apiDepence';
import { CalendarDays, Filter } from 'lucide-react';


const VoirDepense = () => {
  const [date_debut, setDate_debut] = useState("");
  const [date_fin, setDate_fin] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const depensesPerPage = 10;

  const { data, isPending } = useQuery({
    queryKey: ["depenser_agence", date_debut, date_fin, sort, page],
    queryFn: () =>
    get_depenses({
       
        date_debut: date_debut,
        date_fin: date_fin,
        sort,
        page,
      }),
    keepPreviousData: true,
  });

  const depenses = data?.results || [];
  const count = data?.count || 0;
  const numOfPages = Math.ceil(count / depensesPerPage);

  // Remise à zéro de la page lors du changement des filtres
  useEffect(() => {
    setPage(1);
  }, [ date_debut, date_fin, sort]);

  const decreasePageValue = () => setPage((prev) => Math.max(prev - 1, 1));
  const increasePageValue = () => setPage((prev) => Math.min(prev + 1, numOfPages));
  const handleSetPage = (pageNumber) => setPage(pageNumber);
  return (
    <div className="p-6 space-y-4  h-[80vh]">
        <p className="text-center text-2xl font-bold capitalize mb-6">mes recettes</p>
    {/* 🔽 Filtres */}
    <div className="flex gap-4 flex-wrap items-center justify-between ">
     {/* Tri */}
     <div className='flex items-center'>
      <Filter className='mr-2'/>
        <label>Tri:</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="recent">Date (récent)</option>
          <option value="ancien">Date (ancien)</option>
          <option value="montant_desc">Montant décroissant</option>
          <option value="montant_asc">Montant croissant</option>
        </select>
      </div>

      <div className='flex gap-4 items-center'>


     <CalendarDays/>
     

          {/* Dates */}
          <div>
            <label>Du:</label>
            <input
              type="date"
              value={date_debut}
              onChange={(e) => setDate_debut(e.target.value)}
              className="border p-2 rounded bg-white ml-3"
            />
          </div>

          <div>
            <label>Au:</label>
            <input
              type="date"
              value={date_fin}
              onChange={(e) => setDate_fin(e.target.value)}
              className="border p-2 rounded bg-white ml-3"
            />
          </div>

      </div>

     
    </div>

    {/* 🔽 Tableau des recettes */}
    <div className="overflow-x-auto">
      <table className="w-full border mt-4 bg-white">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border bg-blue-500  text-white">Montant</th>
            <th className="p-2 border bg-blue-500  text-white">Description</th>
            <th className="p-2 border bg-blue-500  text-white">Date</th>
          </tr>
        </thead>
        <tbody>
          {depenses.map((depense, idx) => (
            <tr key={idx}>
               <td className="p-2 border">{depense.montant} FC</td>
              <td className="p-2 border">{depense.description}</td>
              <td className="p-2 border">{depense.date}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* 🔽 Pagination */}
    {numOfPages > 1 && (
      <PagePagination
        numOfPages={numOfPages}
        page={page}
        handleSetPage={handleSetPage}
        decreasePageValue={decreasePageValue}
        increasePageValue={increasePageValue}
        
      />
    )}
  </div>
  )
}

export default VoirDepense
