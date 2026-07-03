import { useEffect, useState } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectsForm.module.css';


function ProjectForm({ handlerSubmit, btnText, type, projectData }) {

    const [categories, setCategories] = useState([]);

    const [project, setProject] = useState(projectData || {});

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err))
    }, []);


    const submit = (e) => {
        e.preventDefault();
        //console.log(project);
        handlerSubmit(project);
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
        //console.log(project);
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });

        //console.log(project);
    }

    return (
        <form className={styles.form} onSubmit={submit}>

            <Input
                type="text"
                text="Nome do Projeto"
                name="name"
                placeholder="Insira o nome do projeto" handleOnChange={handleChange}
                value={project.name || ''} />
            <Input
                type="number"
                text="Orçamento do Projeto"
                name="budget"
                placeholder="Insira o orçamento do projeto"
                handleOnChange={handleChange}
                value={project.budget || ''}
            />
            <Select
                name="category_id"
                text="Selecione a categoria"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category?.id || ''} />

            <SubmitButton text={btnText} type={type} handleOnChange={submit} />

        </form>
    )
}

export default ProjectForm;