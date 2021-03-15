import * as types from '../constants';

const {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  EDIT_TASK,
  CHANGE_TASK,
  CLEAR_TASKS,
} = types;

const initialState = [
  {
    text: '1',
    id: '0',
    isCompleted: false,
    isEditing: false,
  },
  {
    text: '2',
    id: '1',
    isCompleted: false,
    isEditing: false,
  },
  {
    text: '3',
    id: '2',
    isCompleted: false,
    isEditing: false,
  },
];

function tasksReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK: {
      const { text, id } = payload;

      return [
        ...state,

        {
          text,
          id,
          isCompleted: false,
          isEditing: false,
        },
      ];
    }

    case REMOVE_TASK:
      return state.filter((task) => task.id !== payload);

    case TOGGLE_TASK_COMPLETION:
      return state.map((task) =>
        task.id === payload ? { ...task, isCompleted: !task.isCompleted } : task
      );

    case EDIT_TASK:
      return state.map((task) =>
        task.id === payload ? { ...task, isEditing: true } : task
      );

    case CHANGE_TASK: {
      const { text, id } = payload;

      return state.map((task) =>
        task.id === id ? { ...task, text, isEditing: false } : task
      );
    }

    case CLEAR_TASKS:
      return [];

    default:
      return state;
  }
}

export default tasksReducer;
