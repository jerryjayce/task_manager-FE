import React, {useState} from 'react'
import taskContext from './TaskContext'
import axios from 'axios'


const TaskState = props => {


    const [task_manager, setTask_manager] = useState({
        show_add_task: false,
        message: {
            msg: "",
            msg_options: ""
        },
        loading: true,
        task_data: [],
        logged_in: localStorage.getItem('al2'),
    })

    const baseUrl = "http://127.0.0.1:3002/api/";

    //Set up axios headers
    const userInfo = JSON.parse(localStorage.getItem('AI'));

    //Token
    let authorization;
    if (userInfo !== null) authorization = userInfo.authorization


    const authAxios = axios.create({
        headers: {
            'Content-Type': 'application/json',
            'authorization': authorization
        },
        validateStatus: () => true
    })

    //job_management not linked to garage
    const get_tasks = async () => {
        try {
            const res = await authAxios.get(baseUrl + `task`)
            setTask_manager(prevState => ({
                    ...prevState,
                    loading: false,
                    task_data: res?.data?.data,
                })
            )
            return res
        } catch (res) {
            return res;
        }
    }

    const add_task = async (data) => {
        try {
            const res = await authAxios.post(baseUrl + 'task/add', data)
            return res;
        } catch (res) {
            return res;
        }
    }

    const delete_task = async (id) => {
        try {
            const res = await authAxios.delete(baseUrl + 'task/delete/' + id)
            return res;
        } catch (res) {
            return res;
        }
    }

    return <taskContext.Provider
        value={{
            task_manager,
            setTask_manager,
            get_tasks,
            add_task,
            delete_task

        }}>
        {props.children}
    </taskContext.Provider>
}

export default TaskState;