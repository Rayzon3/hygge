import { createContext, useContext, useReducer } from "react";
import { User } from "../types";

interface State{
    authenticated: boolean
    user: User | null
}

interface Action{
    type: string
    payload: any
}

const StateContext = createContext<State>({
    //default value
    authenticated: false,
    user: null
})

const DispatchContext = createContext(null)

const reducer = (state: State, { type, payload }: Action) => {
    switch(type){
        case 'LOGIN':
            return {
                ...state,
                authenticated: true,
                user: payload
            }
        case 'LOGOUT':
            return {
                ...state,
                authenticated: false,
                user: null
            }
        default: throw new Error(`Unknown Action Type: ${type}`)
    }
}

export const AuthProvider = ({ children } : { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, {
        user: null,
        authenticated: false
    })

    return(
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                { children }
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const userAuthState = () => useContext(StateContext)
export const userAuthDispatch = () => useContext(DispatchContext)
