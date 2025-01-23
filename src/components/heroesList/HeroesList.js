import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { url } from '../../helpers/urls';
import { status } from '../../helpers/status';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, activeFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    //
    const removeHero = useCallback((id) => {
        dispatch(heroesFetching())
        request(`${url.heroes}/${id}`, "DELETE")
            .then(() => dispatch(heroesFetched(heroes.filter(hero => hero.id !== id))))
            .catch(() => dispatch(heroesFetchingError()))
    }, [heroes])

    useEffect(() => {
        dispatch(heroesFetching());
        request(`${url.heroes}${!!activeFilter ? "?element=" + activeFilter : ""}`)
            .then(heroes => dispatch(heroesFetched(heroes)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, [activeFilter]);

    if (heroesLoadingStatus === status.loading) {
        return <Spinner/>;
    } else if (heroesLoadingStatus === status.error) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onRemove={() => removeHero(id)}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;