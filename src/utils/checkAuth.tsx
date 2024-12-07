export const checkAuth = () => {
    const token = localStorage.getItem('token');
    return token !== null; // Возвращаем true, если токен существует
};