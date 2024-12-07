"use client";
import { useParams } from 'next/navigation'; // Импортируем useParams
import { useEffect, useState } from 'react';
import camerasStore from '../../../stores/camerasStore'; // Импортируем магазин
import { Camera } from '../../../types/cameras'; // Импортируем интерфейс Camera
import Navigation from '../../../components/navigationComponent';

const CameraDetailPage = () => {
    const { id } = useParams(); // Получаем id из параметров маршрута
    const { cameras } = camerasStore.getState(); // Получаем камеры из Zustand
    console.log(cameras);
    const [camera, setCamera] = useState<Camera | null>(null);

    useEffect(() => {
        if (id) {
            // Находим камеру по id
            const foundCamera = cameras.find((cam: Camera) => cam.id === Number(id));
            setCamera(foundCamera || null);
        }
    }, [id, cameras]);

    if (!camera) {
        return <p>Камера не найдена</p>;
    }

    return (
        <>
            <header>
                <Navigation />
            </header>
            <main className="grid grid-cols-3 gap-4 p-4">
                <div className="col-span-2 border border-third rounded-lg">
                    <img src={camera.photo_url} alt={camera.name} className="w-full h-auto" />
                </div>
                <div className="col-span-1 border border-third rounded-lg flex flex-col justify-center">
                    <h1 className="text-2xl font-bold mb-2">Камера: {camera.name}</h1>
                    <p className="mb-1">Степень загрязнения: {camera.contamination}</p>
                    <p className="mb-1">Описание: {camera.description}</p>
                    <p className="mb-1">Дата: {camera.date}</p>
                </div>
            </main>
        </>
    );
};

export default CameraDetailPage;
