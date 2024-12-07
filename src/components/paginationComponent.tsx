import { PaginationProps } from '../types/pagination'; // Импортируем интерфейс
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {

    const handlePageChange = (page: number) => {
        onPageChange(page);
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5;
        const half = Math.floor(maxButtons / 2);

        let startPage = Math.max(1, currentPage - half);
        let endPage = Math.min(totalPages, currentPage + half);

        if (currentPage <= half) {
            endPage = Math.min(maxButtons, totalPages);
        }
        if (currentPage + half >= totalPages) {
            startPage = Math.max(1, totalPages - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === i ? 'bg-primary text-white' : 'bg-third text-black'}`}
                >
                    {i}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="flex justify-center mt-4">
            {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)} className="mx-1 px-3 py-1 rounded bg-third text-black">
                    Назад
                </button>
            )}
            {getPaginationButtons()}
            {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)} className="mx-1 px-3 py-1 rounded bg-third text-black">
                    Вперед
                </button>
            )}
        </div>
    );
};

export default Pagination;
