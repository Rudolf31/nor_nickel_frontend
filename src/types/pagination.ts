// types/pagination.ts
export interface PaginationProps {
    totalPages: number; // Общее количество страниц
    currentPage: number; // Текущая страница
    onPageChange: (page: number) => void; // Функция для изменения страницы
}
