import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../api/bookService";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async ({ title, sort, page, limit }) => {
    return await bookService.searchBooks(title, sort, page, limit);
});

export const addBook = createAsyncThunk("books/addBook", async (bookData) => {
    return await bookService.addBook(bookData);
});

export const editBook = createAsyncThunk("books/editBook", async ({ id, bookData }) => {
    return await bookService.editBook(id, bookData);
});

const bookSlice = createSlice({
    name: "books",
    initialState: { books: [], status: "idle", error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books.push(action.payload);
            })
            .addCase(editBook.fulfilled, (state, action) => {
                const index = state.books.findIndex(book => book.id === action.payload.id);
                if (index !== -1) state.books[index] = action.payload;
            });
    },
});

export default bookSlice.reducer;
