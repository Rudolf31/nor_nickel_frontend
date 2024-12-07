"use client";
import { useState, useEffect } from "react";
import Pagination from "./paginationComponent"; // Импортируйте ваш компонент пагинации
import camerasStore from "../stores/camerasStore"; // Импортируем магазин
import { CamerasResponse, Camera } from '../types/cameras'; // Импортируем интерфейс
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { checkAuth } from "@/utils/checkAuth";

export default function PagesComponent() {
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [cameras, setCameras] = useState<Camera[]>([]); // Локальное состояние для камер
    const router = useRouter();

    // Проверка аутентификации
    useEffect(() => {
        if (!checkAuth()) {
            router.push('/auntification'); // Перенаправляем на страницу входа, если токен отсутствует
        }
    }, [router]);

    // Функция для получения данных о камерах
    const fetchExperiences = async (page: number) => {
        try {
            setLoading(true);
            setError(""); // Сбрасываем ошибку перед загрузкой данных
            const response = await fetch(`/jsons/${page}_photo.json`);
            const camerasData: CamerasResponse = await response.json(); // Указываем тип данных
            setCameras(camerasData.cameras);
            camerasStore.getState().setCameras(camerasData.cameras); // Сохраняем в Zustand
            setTotalPages(camerasData.total_pages); // Устанавливаем общее количество страниц
        } catch (error) {
            setError("Ошибка при загрузке данных");
        } finally {
            setLoading(false);
        }
    };
    

    // Эффект для загрузки данных при изменении текущей страницы
    useEffect(() => {
        fetchExperiences(currentPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Эффект для подписки на изменения в магазине
    useEffect(() => {
        const unsubscribe = camerasStore.subscribe(() => {
            const { cameras } = camerasStore.getState();
            setCameras(cameras);
        });

        return () => unsubscribe(); // Очистка подписки при размонтировании
    }, []);

    // Обработчик изменения страницы
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <>
                <p>Загрузка...</p>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </>
        );
    }

    if (error) {
        return (
            <>
                <p>Ошибка: {error}</p>
                <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
            </>
        );
    }

    return (
        <>
            <div>
                {cameras.map((camera) => (
                    <Link href={`/cameras/${camera.id}`} className="border text-xl p-4 mb-4 flex justify-between rounded-lg" key={camera.id}>
                        <h3 className="">Камера: {camera.name}</h3>
                        <p>Степень загрязнения: {camera.contamination}</p>
                        <p>{camera.date}</p>
                    </Link>
                ))}
            </div>
            <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </>
    );
}
