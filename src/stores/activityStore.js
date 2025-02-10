/** @format */

import { defineStore } from "pinia";

export const useActivityStore = defineStore("activityStore", {
  state: () => ({
    activities: [],
    loading: false,
  }),

  getters: {
    // Returns the list of activities
    getActivities: (state) => state.activities,

    // Returns the loading state
    isLoading: (state) => state.loading,
  },

  actions: {
    /**
     * Saves the current activities array to local storage.
     * Ensures data persistence between sessions.
     */
    saveToLocalStorage() {
      localStorage.setItem("activities", JSON.stringify(this.activities));
    },

    /**----------------------------------------------------------------- */

    /**
     * Adds a new activity to the list.
     * Generates an ID based on the length of stored activities.
     * Updates local storage and handles potential errors.
     * @param {Object} newTodo - The new activity object to be added.
     */
    addTodo(newTodo) {
      this.loading = true;
      try {
        const lastTodoIndex =
          JSON.parse(localStorage.getItem("activities"))?.length || 0;
        newTodo.id = lastTodoIndex;

        this.activities.push(newTodo);

        this.saveToLocalStorage();
      } catch (error) {
        console.error("Error adding todo:", error);
      } finally {
        this.loading = false;
      }
    },

    /**----------------------------------------------------------------- */

    /**
     * Fetches activities from local storage and updates the state.
     * If no activities are found, initializes an empty array.
     */
    fetchActivities() {
      this.loading = true;
      try {
        this.activities = JSON.parse(localStorage.getItem("activities")) || [];
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        this.loading = false;
      }
    },

    /**----------------------------------------------------------------- */

    /**
     * Updates the status of an existing activity.
     * Finds the activity by its ID and modifies its status.
     * Saves the updated list to local storage.
     * @param {number} updatedActivityId - The ID of the activity to update.
     * @param {string} updatedActivityStatus - The new status of the activity.
     */
    updateActivity(updatedActivityId, updatedActivityStatus) {
      this.loading = true;
      try {
        const index = this.activities.findIndex(
          (activity) => activity.id === updatedActivityId
        );

        if (index !== -1) {
          this.activities[index].status = updatedActivityStatus;
          this.saveToLocalStorage();
        }
      } catch (error) {
        console.error("Error updating todo:", error);
      } finally {
        this.loading = false;
      }
    },

    /**----------------------------------------------------------------- */

    /**
     * Deletes a specific activity by its ID.
     * Filters out the activity from the list and updates local storage.
     * @param {number} activityId - The ID of the activity to be deleted.
     */
    deleteActivity(activityId) {
      this.loading = true;
      try {
        this.activities = this.activities.filter(
          (activity) => activity.id !== activityId
        );

        this.saveToLocalStorage();
      } catch (error) {
        console.error("Error deleting todo:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
