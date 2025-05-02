import { voir_recette_user } from "@/api/apiRecette";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import PagePagination from "@/components/PagePagination";
import { Filter, ListFilter, TimerIcon } from "lucide-react";

// Simule une liste de services (remplace par ton appel API si besoin)
const servicesMock = ["music", "salle de jeux", "bureautique"];

const ListesRecettes = () => {
  const [service, setService] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sort, setSort] = useState("recent");
  const [page, setPage] = useState(1);

  const recettesPerPage = 10;

  const { data, isPending } = useQuery({
    queryKey: ["recettes_user", service, startDate, endDate, sort, page],
    queryFn: () =>
      voir_recette_user({
        service,
        start_date: startDate,
        end_date: endDate,
        sort,
        page,
      }),
    keepPreviousData: true,
  });

  const recettes = data?.results || [];
  const count = data?.count || 0;
  const numOfPages = Math.ceil(count / recettesPerPage);

  // Remise à zéro de la page lors du changement des filtres
  useEffect(() => {
    setPage(1);
  }, [service, startDate, endDate, sort]);

  const decreasePageValue = () => setPage((prev) => Math.max(prev - 1, 1));
  const increasePageValue = () => setPage((prev) => Math.min(prev + 1, numOfPages));
  const handleSetPage = (pageNumber) => setPage(pageNumber);

  return (
    <div className="p-6 space-y-4  h-[80vh]">

      <p className="text-center text-2xl font-bold capitalize mb-6">mes recettes</p>
      {/* 🔽 Filtres */}
      <div className="flex w-full items-center justify-between gap-4 flex-wrap items-end">
        {/* Liste déroulante des services */}
        <div className="flex items-center">
          <ListFilter className="mr-2"/>
          <label>Service:</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="border p-2 rounded bg-white ml-3"
          >
            <option value="">Tous</option>
            {servicesMock.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Dates */}
        <div className="flex gap-5 items-center">

        <TimerIcon/>
        
            <div >
              <label>Du:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border p-2 rounded bg-white ml-3"
              />
            </div>

            <div>
              <label>Au:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border p-2 rounded bg-white ml-3"
              />
            </div>
            

        </div>

     
      </div>
         {/* Tri */}
         <div className="flex items-center">
         <Filter className="mr-2"/>
          <label>Tri:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border p-2 rounded bg-white ml-3"
          >
            <option value="recent">Date (récent)</option>
            <option value="ancien">Date (ancien)</option>
            <option value="montant_desc">Montant décroissant</option>
            <option value="montant_asc">Montant croissant</option>
          </select>
        </div>

      {/* 🔽 Tableau des recettes */}
      <div className="overflow-x-auto">
        <table className="w-full border mt-4 bg-white">
          <thead>
            <tr className="bg-gray-200 bg-blue-500">
              <th className="p-2 border bg-blue-500  text-white ">Service</th>
              <th className="p-2 border bg-blue-500  text-white">Date</th>
              <th className="p-2 border bg-blue-500  text-white">Montant</th>
            </tr>
          </thead>
          <tbody>
            {recettes.map((recette, idx) => (
              <tr key={idx}>
                <td className="p-2 border">{recette.nom_service}</td>
                <td className="p-2 border">{recette.date}</td>
                <td className="p-2 border">{recette.montant} FC</td>
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
  );
};

export default ListesRecettes;
