<!-- @format -->

<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
    <!-- Title of the form -->
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Add Activity</h2>

    <!-- Form to add a new activity -->
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Input field for activity title -->
      <div>
        <label for="activity" class="block text-gray-700 font-medium mb-1">
          Activity Title
        </label>
        <input
          id="activity"
          v-model="activity"
          type="text"
          placeholder="Enter activity..."
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Dropdown to select activity status -->
      <div>
        <label for="status" class="block text-gray-700 font-medium mb-1">
          Select Status
        </label>
        <select
          id="status"
          v-model="status"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <!-- Submit button to add activity -->
      <button
        type="submit"
        class="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add Activity
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useActivityStore } from "@/stores/activityStore";

// Reactive variables for form inputs
const activity = ref("");
const status = ref("pending"); // Default status is pending

// Initialize the Pinia store
const activityStore = useActivityStore();

/**
 * Handles form submission.
 * Validates the input, creates a new activity object, and adds it to the store.
 */
const handleSubmit = async () => {
  // Check if input is empty
  if (!activity.value.trim()) {
    alert("Please enter an activity.");
    return;
  }

  // Create new activity object with selected status
  const newActivity = {
    title: activity.value,
    status: status.value, // Use selected status
  };

  // Call Pinia function to add the activity
  await activityStore.addTodo(newActivity);

  // Clear input fields after submission
  activity.value = "";
  status.value = "pending"; // Reset status to default
};
</script>
