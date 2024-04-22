import Task from '../Task/Task'
import { Todo } from '../../@types/todo.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  todos: Todo[]
  taskListName: string
  changeTodo: (id: string, isDone: boolean) => void
  startEditTodo: (id: string) => void
  deleteTodo: (id: string) => void
}

export default function TaskList(props: TaskListProps) {
  const { todos, taskListName, changeTodo, startEditTodo, deleteTodo } = props
  let tittleOutput
  if (todos.length === 0 && taskListName === 'Your To Do') {
    tittleOutput = <h3 className={styles.greyTittle}>Your Todo goes here</h3>
  }
  if (todos.length > 0) {
    tittleOutput = <h3 className={styles.tittle}>{taskListName}</h3>
  }
  return (
    <div>
      {tittleOutput}
      <ul className={styles.task}>
        {todos.map((todo) => {
          return (
            <Task
              todo={todo}
              key={todo.id}
              changeTodo={changeTodo}
              startEditTodo={startEditTodo}
              deleteTodo={deleteTodo}
            />
          )
        })}
      </ul>
    </div>
  )
}
