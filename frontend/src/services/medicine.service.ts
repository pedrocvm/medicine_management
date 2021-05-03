import { IMedicine } from '@/interfaces/medicine.interface';
import { ApiService } from './api.services';

export const MedicineService = {
  list: async (query: string) => {
    const {
      data: { data },
    } = await ApiService.query(query);
    return data.findAllMedicine;
  },

  get: (id: string) => {},

  post: async (medicine: IMedicine) => {
    const {
      data: { data },
    } = await ApiService.mutation(medicine);
    return data.createMedicine;
  },

  put: (id: string, data: IMedicine) => {},

  delete: (id: string) => {},
};
