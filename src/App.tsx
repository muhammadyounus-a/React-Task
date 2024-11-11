import './App.css'
import DynamicForm from './Component/DynamicForm'
import FileUpload from './Component/FileUploead'
import FilterData from './Component/FilterData'
import Home from './Component/Home'
import TodoList from './Component/TodoList'

function App() {

  return (
    <>
      <DynamicForm/>
      <FilterData />
      <TodoList />
      <FileUpload/>
      <Home/>
    </>
  )
}

export default App
