// CamerasStore.ts
import { create } from 'zustand';
import { CamerasState } from '../types/cameras'; // Импортируем интерфейс

const camerasStore = create<CamerasState>((set) => ({
    cameras: [],
    setCameras: (cameras) => set({ cameras }),
    clearCameras: () => set({ cameras: [] }),
}));

export default camerasStore;
