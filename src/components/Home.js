import React, {useContext, useEffect, useState} from 'react';
import AddTask from "./AddTask";
import Tasks from "./Tasks";
import TaskContext from "../context/task/TaskContext";


const Home = () => {

    const all_task_context = useContext(TaskContext);
    const {
        task_manager,
        setTask_manager,
        get_tasks,
        delete_task
    } = all_task_context


    useEffect(() => {

        if (task_manager.task_data.length === 0) {
            get_tasks().then(res => {

                setTask_manager(prevState => ({
                        ...prevState,
                        task_data: res?.data?.data
                    })
                )
            });

        }
    }, [task_manager.task_data]);



    const deleteTask = async (id) => {


        delete_task(id).then(res => {
            if (parseInt(res.request.status) === 200) {

                setTask_manager(prevState => ({
                        ...prevState,
                        task_data: res?.data?.data
                    })
                );

            }

        })
    }

    return (
        <>
            {task_manager.show_add_task && <AddTask/>}
            {task_manager.task_data.length > 0 ? (
                <Tasks
                    tasks={task_manager.task_data}
                    onDelete={deleteTask}
                />
            ) : (
                'No Tasks To Show'
            )}
        </>
    )
}

export default Home
