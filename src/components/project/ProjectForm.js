import { useEffect, useState } from 'react';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectsForm.module.css';


function ProjectForm({ btnText, type }) {

    const [categories, setCategories] = useState([]);

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


    return (
        <form className={styles.form}>

            <Input type="text" text="Nome do Projeto" name="name" placeholder="Insira o nome do projeto" />
            <Input type="number" text="Orçamento do Projeto" name="budget" placeholder="Insira o orçamento do projeto" />
            <Select name="category_id" text="Selecione a categoria" options={categories} />
            <SubmitButton text={btnText} type={type} />

        </form>
    )
}

export default ProjectForm;