import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,

  // Google Sign-In
  googleSignin: async (googleData) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(googleData),
      });
      const data = await response.json();
      set({
        user: data,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      return data;
    } catch (err) {
      set({
        loading: false,
        error: err.message,
      });
    }
  },

  // Sign Up
  signup: async (formData) => {
    set({ loading: true, error: null });
    try {
      await axios.post("/api/auth/signup", formData);
      set({ loading: false, error: null });
      return "User is created!";
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data || err.message,
      });
    }
  },

  // Sign In
  signin: async (formData) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post("/api/auth/signin", formData);
      set({
        user: res.data.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        err,
      });
    }
  },

  // Check Authentication
  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/auth/checkauth", {
        withCredentials: true,
      });
      set({
        user: res.data.user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: err.message,
      });
    }
  },

  // Sign Out
  signout: async () => {
    set({ loading: true, error: null });
    try {
      await axios.get("/api/auth/signout");
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    } catch (err) {
      set({
        loading: false,
        error: err.response?.data || err.message,
      });
    }
  },
  deleteProfile: async () => {
    set({ loading: true, error: null });
  try {
    await axios.delete('/api/auth/delete');
    alert("Your profile has been deleted.");
  } catch (err) {
    setError(err.response?.data || err.message);
  } finally {
    setLoading(false);
  }
},

  updateUser: async (userId, formData) => {
    set({ loading: true });

    try {
      const response = await axios.post(`/api/user/update/${userId}`, formData);

      if (response.ok) {
        const updatedUser = await response.json();
        set({ user: updatedUser, loading: false });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Update failed:", error);
      set({ loading: false });
    }
  },
}));
