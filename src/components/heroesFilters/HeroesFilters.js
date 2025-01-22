
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
import { filtersFetched } from "../../actions";

const HeroesFilters = () => {
    const {request} = useHttp();
    const {filters} = useSelector(store => store)
    const dispatch = useDispatch()

    useEffect(() => {
        request(url.filters)
            .then(filtersFromBack => dispatch(filtersFetched([...filters, ...filtersFromBack])))
            .catch((e) => console.log(e))
    }, [])

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">Все</button>
                    <button className="btn btn-danger">Огонь</button>
                    <button className="btn btn-primary">Вода</button>
                    <button className="btn btn-success">Ветер</button>
                    <button className="btn btn-secondary">Земля</button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;