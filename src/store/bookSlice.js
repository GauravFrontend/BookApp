import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../api/bookService";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async ({ title, sort, page, limit }, { rejectWithValue }) => {
    try {
        return await bookService.searchBooks(title, sort, page, limit);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addBook = createAsyncThunk("books/addBook", async (bookData, { rejectWithValue }) => {
    try {
        return await bookService.addBook(bookData);
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const editBook = createAsyncThunk("books/editBook", async ({ id, bookData }, { rejectWithValue }) => {
    try {
        const response = await bookService.editBook(id, bookData);
        return response;
    } catch (error) {
        console.error("❌ Update failed:", error.message);
        return rejectWithValue(error.message);
    }
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
                state.books = action.payload.data;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.books = [action.payload, ...state.books];
            })
            .addCase(addBook.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(editBook.fulfilled, (state, action) => {
                state.books = state.books.map((book) =>
                    book.id === action.payload.id ? action.payload : book
                );
            })
            .addCase(editBook.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default bookSlice.reducer;
