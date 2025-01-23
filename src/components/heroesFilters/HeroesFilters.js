
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHttp } from "../../hooks/http.hook";
import { url } from "../../helpers/urls";
import { translater } from "../../helpers/translater";
import { filtersFetched, filtersFetching, filtersFetchingError, filtersSetActive } from "../../actions";
import classNames from "classnames";

const HeroesFilters = () => {
    const {request} = useHttp();
    const {translateFilter} = translater()
    const {filters, activeFilter} = useSelector(store => store)
    const dispatch = useDispatch()
    const defaultFilter = "all"

    useEffect(() => {
        dispatch(filtersFetching())
        request(url.filters)
            .then(filtersFromBack => dispatch(filtersFetched([...filters, ...filtersFromBack])))
            .catch((e) => dispatch(filtersFetchingError()))

        dispatch(filtersSetActive(defaultFilter))
    }, [])

    const getFilterClass = (element) => {
        switch (element) {
            case "fire":
                return "btn-danger";
            case "water":
                return "btn-primary";
            case "wind":
                return "btn-success";
            case "earth":
                return "btn-secondary";
            default:
                return "btn-outline-dark";
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {
                        filters.map(filter => {
                            return <button 
                                        onClick={() => dispatch(filtersSetActive(activeFilter === filter ? null : filter))}
                                        key={filter}
                                        className={
                                            classNames("btn", getFilterClass(filter), activeFilter === filter && "active")
                                        }
                                    >
                                            {translateFilter(filter)}
                                    </button>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;