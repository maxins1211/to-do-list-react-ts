import { useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '../../@types/todo.type'

interface TaskInputProps {
  addTodo: (tittle: string) => void
  editTodo: (tittle: string) => void
  currentTodo: Todo | null
  completeEditTodo: () => void
}

export default function TaskInput(props: TaskInputProps) {
  const [tittle, setTittle] = useState<string>('')
  const { addTodo, currentTodo, editTodo, completeEditTodo } = props

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      completeEditTodo()
      if (tittle) {
        setTittle('')
      }
    } else {
      addTodo(tittle)
      setTittle('')
    }
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setTittle(value)
    }
  }
  console.log(tittle)
  return (
    <div>
      <h2 className={styles.tittle}>To do list</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          value={currentTodo ? currentTodo.tittle : tittle}
          onChange={handleInput}
          placeholder='Add your todo'
          required
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}
