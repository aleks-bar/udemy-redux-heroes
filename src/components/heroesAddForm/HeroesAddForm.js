

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useCallback, useEffect, useState } from "react";
import { useHttp } from "../../hooks/http.hook";
import { translater } from "../../helpers/translater";
import { v4 as uuidv4 } from 'uuid';
import { url } from "../../helpers/urls";
import { useDispatch, useSelector } from "react-redux";
import { heroesFetched, heroesFetchingError } from "../../actions";

const HeroesAddForm = () => {
    const dispatch = useDispatch()
    const {heroes, filters} = useSelector(store => store)
    const {request} = useHttp();
    const {translateFilter} = translater()
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('');

    const resetData = () => {
        setName('')
        setDescription('')
        setElement('')
    }

    const createJsonHero = useCallback(() => {
        return JSON.stringify({ id: uuidv4(), name, description, element })
    }, [name, description, element])

    const submit = useCallback((e) => {
        e.preventDefault();
        if(!!name && !!description && !!element) {
            request(url.heroes, "POST", createJsonHero() )
                .then(hero => dispatch(heroesFetched([...heroes, hero])))
                .catch(e => dispatch(heroesFetchingError()))
                .finally(() => {
                    resetData()
                })
        }
    }, [name, description, element])

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={submit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={element}
                    onChange={(e) => setElement(e.target.value)}
                    name="element">
                    <option value="">Я владею элементом...</option>
                    {
                        filters.map(filter => (<option value={filter} key={filter}>{translateFilter(filter)}</option>))
                    }
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;