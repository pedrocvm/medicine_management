import { IMedicine } from '@/interfaces/medicine.interface';
import { ApiService } from './api.services';

export const MedicineService = {
  list: async (query: string) => {
    const {
      data: { data },
    } = await ApiService.query(query);
    return data.findAllMedicine;
  },

  get: async (query: string) => {
    const {
      data: { data },
    } = await ApiService.query(query);

    return data.findMedicine;
  },

  post: async (medicine: IMedicine) => {
    const {
      data: { data },
    } = await ApiService.mutation(medicine);
    return data.createMedicine;
  },

  update: async (medicine: IMedicine) => {
    const {
      data: { data },
    } = await ApiService.mutation(medicine);
    return data.updateMedicine;
  },

  delete: async (query: string) => {
    const {
      data: { data },
    } = await ApiService.mutation(query);
    return data.deleteMedicine;
  },
};
