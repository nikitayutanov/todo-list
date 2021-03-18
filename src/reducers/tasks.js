import * as types from '../constants';

const {
  ADD_TASK,
  REMOVE_TASK,
  TOGGLE_TASK_COMPLETION,
  CHANGE_TASK,
  CLEAR_TASKS,
} = types;

const initialState = [
  {
    text: '1',
    id: '0',
    isCompleted: false,
  },
  {
    text: '2',
    id: '1',
    isCompleted: false,
  },
  {
    text: '3',
    id: '2',
    isCompleted: false,
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
        },
      ];
    }

    case REMOVE_TASK:
      return state.filter((task) => task.id !== payload);

    case TOGGLE_TASK_COMPLETION:
      return state.map((task) =>
        task.id === payload ? { ...task, isCompleted: !task.isCompleted } : task
      );

    case CHANGE_TASK: {
      const { text, id } = payload;

      return state.map((task) => (task.id === id ? { ...task, text } : task));
    }

    case CLEAR_TASKS:
      return [];

    default:
      return state;
  }
}

export default tasksReducer;
