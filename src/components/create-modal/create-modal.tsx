import {  useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { FoodData } from '../../interface/FoodData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: unknown): void
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = useFoodDataMutate();

    const submit = async () => {
        setIsLoading(true); 
        const foodData: FoodData = {
            title, 
            price,
            image
        }
        try {
            await mutate(foodData);
            closeModal();
        } catch (error) {
            console.error('Error submitting data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label="Nome do produto" value={title} updateValue={setTitle}/>
                    <Input label="Preço" value={price} updateValue={setPrice}/>
                    <Input label="Imagem (Link ou caminho)" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isLoading ? 'postando...' : 'Adicionar'}
                </button>
            </div>
        </div>
    )
}