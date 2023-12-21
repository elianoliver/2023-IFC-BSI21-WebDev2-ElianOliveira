import { KeyboardEvent, MouseEvent } from "react"
import { TTodoRestItem } from "./App"
import { format } from 'date-fns';

// define as propriedades que o componente List aceita
type TProps = {
    todolist: TTodoRestItem[],
    setTodolist: (todolist: TTodoRestItem[]) => void
}

export default function (props: TProps) {
    const { todolist, setTodolist } = props

    //remove um item da lista de tarefas enviando uma requisição DELETE para o servidor e atualizando o estado local.
    const removeItem = async (event: MouseEvent<HTMLButtonElement>) => {
        const id = Number(event.currentTarget.dataset.id) as number
        const li = event.currentTarget.closest('li') as HTMLLIElement
        li.className = 'pending'
        await fetch(`http://localhost:3000/item/${id}`, { method: 'DELETE' })
        const newTodolist = todolist.filter((val, _key) => val.id !== id)
        setTodolist(newTodolist)
    }

    // Quando a tecla Enter é pressionada, ela envia uma requisição PUT para o servidor para atualizar o item e atualiza o estado local.
    const keyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            const li = event.currentTarget.closest('li') as HTMLLIElement
            li.className = 'pending'
            const value = event.currentTarget.value
            const id = event.currentTarget.dataset.id
            const request = await fetch(`http://localhost:3000/item/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ todo: value })
            })
            const response = await request.json()
            console.log(response)
            li.className = 'synced'
        }
    }

    // retorna uma lista de itens de tarefa. Cada item tem um botão para remover o item e um campo de entrada para atualizar o texto do item.
    return (
        <ul>
            {todolist.map((todo, _key) => {
                const todoData = new Date(todo.date);
                const dataFormatada = isNaN(todoData.getTime()) ? todo.date : format(todoData, 'dd/MM - HH:mm');

                return (
                    <li key={todo.id} data-id={todo.id} className={todo.id < 0 ? "pending" : "synced"}>
                        <button data-id={todo.id} onClick={removeItem}>remove</button>
                        <input data-id={todo.id} defaultValue={todo.text} onKeyDown={keyDown} />
                        <span>{dataFormatada}</span>
                    </li>
                );
            })}
        </ul>
    );
}