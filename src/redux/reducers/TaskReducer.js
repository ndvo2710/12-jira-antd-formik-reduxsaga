
const initialState = {
    taskDetailModal:  {
        "priorityTask": {
          "priorityId": 1,
          "priority": "High"
        },
        "taskTypeDetail": {
          "id": 1,
          "taskType": "bug"
        },
        "assigness": [
          {
            "id": 40,
            "avatar": "https://ui-avatars.com/api/?name=crystal",
            "name": "crystal",
            "alias": "crystal"
          },
          {
            "id": 41,
            "avatar": "https://ui-avatars.com/api/?name=kevin",
            "name": "kevin",
            "alias": "kevin"
          }
        ],
        "lstComment": [],
        "taskId": 41,
        "taskName": "task 1",
        "alias": "task-1",
        "description": "<p>task 1</p>",
        "statusId": "3",
        "originalEstimate": 10,
        "timeTrackingSpent": 10,
        "timeTrackingRemaining": 10
      }
}




const TaskReducer = (state = initialState,action) => {
    switch (action.type) {



    default:
        return state
    }
}

export default TaskReducer;