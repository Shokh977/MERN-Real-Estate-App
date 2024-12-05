import {create} from "zustand";

export const useUserStore = create((set) => ({
  currentUser: null,
  loading: false,
  error: null,
  userListings: [],

  // Set User Data
  setUser: (user) => set({ currentUser: user }),

  // Loading state
  setLoading: (loading) => set({ loading }),

  // Set error
  setError: (error) => set({ error }),

  // Set user listings
  setUserListings: (listings) => set({ userListings: listings }),

  // Update user data
  updateUser: async (userId, formData) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/user/update/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        set({ error: data.message });
        return;
      }
      set({ currentUser: data.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
