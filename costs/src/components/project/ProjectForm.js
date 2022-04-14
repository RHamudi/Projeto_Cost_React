import { useEffect, useState } from 'react'

import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'
import style from './ProjectForm.module.css'

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(()=> {
        fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'content-type': 'application/json'
        }
    }).then((resp) => resp.json())
        .then((data) => {
            setCategories(data)
        })
        .catch((err) => console.log(err))
    }, [])

    const submit = (e)=> {
        e.preventDefault()
        //console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({...project, category: {
            id: e.target.value,
            nome: e.target.options[e.target.selectedIndex].text,
        } })
        console.log(project)
    }

    return (
        <form onSubmit={submit} className={style.form}>
            <Input
                type="text"
                text="Nome Do Projeto"
                name="name"
                placeholder="insira o nome do projeto" 
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
                />
            <Input
                type="number"
                text="Orçamento do projeto"
                name="budget"
                placeholder="insira o orçamento total" 
                handleOnChange={handleChange}
                value={project.budget ? project.budget : ''}
                />
            <Select 
            name="category_id" 
            text="Selecione a categoria" 
            options={categories} 
            handleOnChange={handleCategory}
            value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText} />
        </form>
    )
}

export default ProjectForm