import apiClient from "./apiClient";

const bookService = {
    searchBooks: async (title, sort = "ASC", page = 1, limit = 10) => {
        const response = await apiClient.get(`/books`, {
            params: { title, DIR: sort, page, limit },
        });
        return response.data;
    },

    addBook: async (bookData) => {
        const response = await apiClient.post(`/books`, bookData);
        return response.data;
    },

    editBook: async (id, bookData) => {
        const response = await apiClient.put(`/books/${id}`, bookData);
        return response.data;
    },
};

export default bookService;
