export const selectCurrentFilter = (state) => state.currentFilter;
export const selectSearchQuery = (state) => state.searchQuery;

export const selectFilteredTasks = (state) => {
  const { tasks, currentFilter } = state;

  switch (currentFilter) {
    case 'active':
      return tasks.filter((task) => !task.isCompleted);
    case 'done':
      return tasks.filter((task) => task.isCompleted);
    default:
      return tasks;
  }
};
