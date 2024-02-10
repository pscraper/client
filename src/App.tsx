import React, { useState, useReducer, useContext, useEffect, useRef, useCallback } from "react"


interface StateType {
  name: string | undefined,
  age: number | undefined
}

interface ActionType {
  type: Action,
  name: string | undefined,
  age: number | undefined
}

enum Action {
  SetName = 'setName',
  SetAge = 'setAge'
}

const INITIAL_STATE: StateType = { name: 'empty', age: 0 };
function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case Action.SetName:
      return { ...state, name: action.name };

    case Action.SetAge:
      return { ...state, age: action.age };

    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <div>
      <p>{`name is ${state.name}`}</p>
      <p>{`age is ${state.age}`}</p>
      <input
        type="text"
        value={state.name === undefined ? '' : state.name}
        onChange={e => dispatch({ ...state, type: Action.SetName, name: e.target.value })}
      />

      <input 
        type="number"
        value={state.age === undefined ? 0 : state.age}
        onChange={e => dispatch({ ...state, type: Action.SetAge, age: Number(e.target.value) })}
      />
    </div>
  )
}



export default App