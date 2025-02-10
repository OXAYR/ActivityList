<!-- @format -->

<template>
  <div class="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
    <!-- Title of the activity list -->
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Activity List</h2>

    <!-- List of activities -->
    <ul v-if="activities.length">
      <li
        v-for="(activity, index) in activities"
        :key="index"
        class="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-2"
      >
        <div class="flex items-center gap-3">
          <span>
            {{ activity.title }} -
            <strong v-if="editingIndex !== activity.id"
              >{{ activity.status }}
            </strong>
            <select
              v-else
              v-model="editedStatus"
              class="px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </span>

          <!-- Dropdown for editing status -->
        </div>

        <!-- Action buttons (Edit & Delete) -->
        <div class="flex gap-2" v-if="editingIndex !== activity.id">
          <button
            @click="startEditing(activity.id, activity.status)"
            class="px-2 py-1 bg-yellow-500 text-white rounded-md"
          >
            Edit
          </button>

          <button
            @click="deleteActivity(activity.id)"
            class="px-2 py-1 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
        <button
          v-else
          @click="saveEdit(activity.id)"
          class="px-2 py-1 bg-green-500 text-white rounded-md"
        >
          Save
        </button>
      </li>
    </ul>

    <!-- Message when no activities are found -->
    <p v-else class="text-gray-500">No activities found.</p>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useActivityStore } from "@/stores/activityStore"; // Import Pinia store

const activityStore = useActivityStore();

// Reactive variables for editing
const editingIndex = ref(null);
const editedStatus = ref("");

// Computed property to retrieve activities from the store
const activities = computed(() => activityStore.getActivities);

// Fetches activities from local storage when the component is mounted
onMounted(() => {
  activityStore.fetchActivities();
});

/**
 * Deletes an activity based on its ID.
 * @param {number} id - The ID of the activity to be deleted.
 */
const deleteActivity = (id) => {
  activityStore.deleteActivity(id);
};

/**
 * Starts editing an activity's status.
 * @param {number} id - The ID of the activity to edit.
 * @param {string} currentStatus - The current status of the activity.
 */
const startEditing = (id, currentStatus) => {
  editingIndex.value = id;
  editedStatus.value = currentStatus;
};

/**
 * Saves the updated status of an activity.
 * @param {number} id - The ID of the activity to update.
 */
const saveEdit = (id) => {
  activityStore.updateActivity(id, editedStatus.value);
  editingIndex.value = null; // Exit edit mode
};
</script>
