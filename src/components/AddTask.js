import {useContext} from 'react'
import TaskContext from "../context/task/TaskContext";

const AddTask = () => {
    const all_task_context = useContext(TaskContext);
    const {
        add_task,
        setTask_manager,
        task_manager
    } = all_task_context

    const onSubmit = e => {
        e.preventDefault();

        let add_task_form = document.getElementById("add_task");
        let form = new FormData(add_task_form);


        add_task(form).then(res => {
            if (parseInt(res.request.status) === 201) {

                let all_task = [...task_manager.task_data, res.data.data];

                setTask_manager(prevState => ({
                        ...prevState,
                        task_data: [...all_task]
                    })
                );

                add_task_form.reset();

            }

        })
    }


    return (
        <form className='add-form' onSubmit={onSubmit} id='add_task'>
            <div className='form-control'>
                <label>Tittle</label>
                <input
                    type='text'
                    placeholder='Task Name'
                    name='tittle'
                    required={true}
                />
            </div>
            <div className='form-control'>
                <label>Description</label>
                <input
                    type='text'
                    placeholder='Task Description'
                    name='description'
                    required={true}
                />
            </div>
            <div className='form-control'>
                <label>Day & Time</label>
                <input
                    type='date'
                    placeholder='Add Day & Time'
                    name='due_date'
                    required={true}
                />
            </div>
            <input hidden={true} name='status' defaultValue='to-do'/>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
