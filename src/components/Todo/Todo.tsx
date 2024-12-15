import { useMemo, useState } from "react";
import "./Todo.css";

type ListItem = {
    title: string;
    completed: boolean;
};

enum Filter {
    default = "default",
    complated = "complated",
    active = "activ",
}

export const Todo = () => {
    //Инпут ввода текста новой задачи
    const [inputAdd, setInputAdd] = useState<string>("");
    //Список задач
    const [listItems, setListItems] = useState<ListItem[]>([]);
    //Состояние фильтра
    const [filter, setFilter] = useState<Filter>(Filter.default);

    //Добавление задачи
    const addItem = (itemTitle: string) => {
        if (itemTitle.length) {
            const newItem: ListItem = {
                title: itemTitle,
                completed: false,
            };
            setListItems([...listItems, newItem]);
            setInputAdd("");
        }
    };

    //Удаление задачи
    const deleteTask = (taskTitle: string) => {
        setListItems(listItems.filter((task) => task.title !== taskTitle));
    };

    //Обработка нажатия enter при фокусе на инпуте
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addItem(inputAdd);
        }
    };

    //Обработка нажатия на задачу
    const handleClickTask = (itemTitle: string) => {
        setListItems(
            listItems.map((item) => {
                if (item.title === itemTitle) {
                    return { ...item, completed: !item.completed };
                }
                return item;
            })
        );
    };

    /**
     * Возвращает список задач в зависимости от выбранного фильтра
     */
    const taskList = useMemo(() => {
        switch (filter) {
            case Filter.default:
                return listItems;
            case Filter.active:
                return listItems.filter((item) => !item.completed);
            case Filter.complated:
                return listItems.filter((item) => item.completed);
        }
    }, [listItems, filter]);

    return (
        <div className="todo-box">
            <div className="add-task-box">
                <input
                    className="add-input"
                    placeholder="Введите текст задачи"
                    type="text"
                    value={inputAdd}
                    onChange={(e) => setInputAdd(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="add-btn-box">
                    <button className="btn" onClick={() => addItem(inputAdd)}>
                        Добавить
                    </button>
                </div>
            </div>
            <div className="task-list">
                {taskList.length ? (
                    <ol>
                        {taskList.map((item, index) => {
                            return (
                                <li
                                    key={`${index}${item.title}`}
                                    className={
                                        item.completed ? "complited" : ""
                                    }
                                    onClick={() => handleClickTask(item.title)}
                                >
                                    <div className="task-title">
                                        {item.title}
                                    </div>
                                    <button
                                        className="btn delete-btn"
                                        onClickCapture={() =>
                                            deleteTask(item.title)
                                        }
                                    >
                                        Удалить
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                ) : (
                    <div className="list-empty">Список пуст</div>
                )}
            </div>
            <div className="filter-box">
                <button
                    className={`btn ${
                        filter === Filter.default ? "active-btn" : ""
                    }`}
                    onClick={() => setFilter(Filter.default)}
                >
                    Все
                </button>
                <button
                    className={`btn ${
                        filter === Filter.active ? "active-btn" : ""
                    }`}
                    onClick={() => setFilter(Filter.active)}
                >
                    Активно
                </button>
                <button
                    className={`btn ${
                        filter === Filter.complated ? "active-btn" : ""
                    }`}
                    onClick={() => setFilter(Filter.complated)}
                >
                    Сделано
                </button>
            </div>
        </div>
    );
};
