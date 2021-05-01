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

  post: (data: IMedicine) => {},

  put: (id: string, data: IMedicine) => {},

  delete: (id: string) => {},
};
