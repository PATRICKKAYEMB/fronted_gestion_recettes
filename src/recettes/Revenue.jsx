import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { fetchTotalCategorie, fetchTotalGeneral } from '@/api/apiRecette';



const Revenue = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const [change, setChange] = useState(false);

  const date_debut = watch('date_debut');
  const date_fin = watch('date_fin');
  const service = watch('service');

  

  const enabled = date_debut && date_fin && (change || service);

  const queryKey = change
    ? ['total-general', date_debut, date_fin]
    : ['total-categorie', date_debut, date_fin, service];

  const queryFn = () =>
    change
      ? fetchTotalGeneral({ date_debut, date_fin })
      : fetchTotalCategorie({ date_debut, date_fin, service });

  const { data, isLoading, refetch } = useQuery({
    queryKey,
    queryFn,
    enabled: false, // déclenché manuellement
  });

 
    const onSubmit = () => {
        refetch(); // Lance manuellement la requête a
      };

  return (
    <div className="w-full h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-96 bg-white px-4 py-4 max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <div className="text-center">
          <h3 className="text-xl font-semibold">
            {change ? 'Voir le total général' : 'Voir le total par service'}
          </h3>
          <button
            type="button"
            onClick={() => setChange(!change)}
            className="text-sm text-blue-500 underline"
          >
            {change ? 'Changer vers total par service' : 'Changer vers total général'}
          </button>
        </div>

        <div>
          <Label htmlFor="date_debut">Date début</Label>
          <Input type="date" id="date_debut" {...register('date_debut', { required: true })} />
        </div>

        <div>
          <Label htmlFor="date_fin">Date fin</Label>
          <Input type="date" id="date_fin" {...register('date_fin', { required: true })} />
        </div>

        {!change && (
          <div>
            <Label>Service</Label>
            <Select onValueChange={(value) => setValue('service', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir un service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="music">Music</SelectItem>
                <SelectItem value="salle de jeux">Salle de Jeux</SelectItem>
                <SelectItem value="bureautique">Bureautique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Valider
        </button>

        {isLoading && <p className="text-center text-gray-500">Chargement...</p>}
        {data && (
          <p className="text-center font-bold text-lg mt-4">
            {change ? `Total Général: ${data.total_general} Fc` : `Total : ${data.total_service} Fc`}
          </p>
        )}
      </form>
    </div>
  );
};

export default Revenue;