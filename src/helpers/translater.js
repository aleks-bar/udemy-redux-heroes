export const translater = () => {
    const filters = {
        all: "Все",
        fire: "Огонь",
        water: "Вода",
        wind: "Ветер",
        earth: "Земля"
    }

    const translateFilter = (filterValue) => {
        return filters[filterValue] ?? 'Нет перевода'
    }

    return {
        translateFilter
    }
}