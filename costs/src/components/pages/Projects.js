import { useLocation } from 'react-router-dom'

import {useState, useEffect} from 'react'

import Message from "../layout/Message"
import styles from './Projects.module.css'
import LinkButton from '../layout/LinkButton'

import Container from '../layout/Container'
import Loading from '../layout/Loading'
import ProjectCard from '../project/ProjectCard'

function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }

    useEffect(()=> {

        setTimeout(()=>(
            fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp) => resp.json())
        .then((data) => {
            setProjects(data)
            setRemoveLoading(true)
        })
        .catch(err => console.log(err))
        ), 300)

    }, [])

    function removeProject(id){

        fetch(`http://localhost:5000/projects/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((resp)=> resp.json())
        .then((data) => {
            setProjects(projects.filter((project)=> project.id !== id))
            // message
        })
        .catch((err)=> console.log(err))

    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
                {message && <Message type="success" msg={message} />}
                <Container customClass="start">
                    {projects.length > 0 &&
                        projects.map((project) => (
                            <ProjectCard 
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.nome}
                            key={project.id}
                            />
                        ))}
                        {!removeLoading && <Loading/>}
                        {removeLoading && projects.length === 0 && (
                            <p>Não Há projetos cadastrados!</p>
                        )}
                </Container>
        </div>
    )
}

export default Projects