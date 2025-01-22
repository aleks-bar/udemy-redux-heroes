import { status } from "../helpers/status"
import { reducerType } from "./reducerTypes"

const initialState = {
    heroes: [],
    heroesLoadingStatus: status.idle,
    filters: [],
    activeFilter: "all"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case reducerType.HEROES_FETCHING:
            return {
                ...state,
                heroesLoadingStatus: status.loading
            }
        case reducerType.HEROES_FETCHED:
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: status.idle
            }
        case reducerType.HEROES_FETCHING_ERROR:
            return {
                ...state,
                heroesLoadingStatus: status.error
            }
        case reducerType.FILTERS_FETCHING:
            return {
                ...state,
                heroesLoadingStatus: status.loading
            }
        case reducerType.FILTERS_FETCHED:
            return {
                ...state,
                filters: action.payload,
                heroesLoadingStatus: status.idle
            }
        case reducerType.FILTERS_FETCHING_ERROR:
            return {
                ...state,
                heroesLoadingStatus: status.error
            }
        case reducerType.FILTERS_SET_ACTIVE:
            return {
                ...state,
                activeFilter: action.payload
            }
        default: return state
    }
}

export default reducer;