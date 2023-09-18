import {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import TaskContext from "./context/task/TaskContext";

const App = () => {

    const all_task_context = useContext(TaskContext);
    const {
        task_manager,
        setTask_manager,
    } = all_task_context


    return (
        <Router>
            <div className='container'>
                <Header
                    onAdd={() => setTask_manager(prevState => ({
                            ...prevState,
                            show_add_task: !task_manager.show_add_task,
                        })
                    )}
                    showAdd={task_manager.show_add_task}
                />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Home></Home>
                        }
                    />
                    <Route path='/about' element={<About/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
