import { KeyboardEvent, useState } from "react";
import { TTodoRestItem } from "./App";

type TProps = {
        todolist: TTodoRestItem[],
        setTodolist: (todolist: TTodoRestItem[]) => void,
        setSyncStateIcon: (syncStateIcon: string) => void
}

export function Input (props: TProps) {
        const { setTodolist, setSyncStateIcon } = props;
        const [currentId, setCurrentId] = useState(1);

        async function updateTodoList() {
            const response = await fetch("http://localhost:3000/item");
            const data = await response.json();
            setTodolist(data);
            setSyncStateIcon('synced');
        }

        async function createTodoItem(value: string) {
            await fetch("http://localhost:3000/item", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ todo: value })
                });
                updateTodoList();
        }

        const onKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter' && event.currentTarget.value !== '') {
                        const value = event.currentTarget.value;
                        event.currentTarget.value = '';
                        setCurrentId(currentId + 1);
                        setSyncStateIcon('pending');
                        createTodoItem(value);
                }
        };

        return (
            <input className="input-action" type="text" placeholder="Adicione tarefas" onKeyDown={onKeyDown} />
        );
}

export default Input;