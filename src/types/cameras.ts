// types/cameras.ts
export interface Camera {
    id: number;
    name: string;
    contamination: number;
    description: string;
    photo_url: string;
    date: string;
}

export interface CamerasResponse {
    page: number;
    cameras: Camera[];
    total_pages: number;
}

export interface CamerasState {
    cameras: Camera[]; // Массив объектов типа Camera
    setCameras: (cameras: Camera[]) => void; // Функция для установки камер
    clearCameras: () => void; // Функция для очистки камер
}
