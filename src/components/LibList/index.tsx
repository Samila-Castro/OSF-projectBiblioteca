import React, { useState } from "react";

import { ListItem } from "../ListItem";


import api  from '../../services/api';
import './style.css';
import { IconButton, TextField } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';

interface Books {

    objectID: string,
    title: string,
    author: string,
    url: string
}

export function LibList() {
    const [books, setBooks] = useState<Books[]>([]);
    const [input, setInput] = useState('');
    const[showMessage, setShowMessage] = useState(false);
    const[inputMessageError, setInputMessageError] = useState('');


    const handleSearch = () => {
        let value = input.toLowerCase();

        if(!value){
            setInputMessageError("Digite um autor");
            return
        }

        setInputMessageError('');
        
       
        api.get(`search?query=${value}&tags=(story,author)`)
        .then(response => { 
            setBooks(response.data.hits)
            setShowMessage(!(response.data.hits.length > 0))
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
          });
        console.log(input);
        

    }
  
    return(
        <section className="lib-list">
            <h1>Biblioteca OSB</h1>

            <div className="main">
                
                <div>
                    <TextField 
                    id="outlined-basic" 
                    label="Busque por autor ou livro" 
                    variant="outlined"  
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  setInput(event.target.value)}
                    error={!!inputMessageError}
                    helperText={inputMessageError}/>
                </div>

                <div>
                    <IconButton color="primary" aria-label="add an alarm" onClick={handleSearch}>
                    <SearchOutlinedIcon />
                    </IconButton>
                </div>
            </div>

            <ul>{books.map((book) => {
                return <ListItem key={book.objectID} book={book}/>
            })}
            </ul>

            {!!showMessage  && <p>Não há nenhum item correspondente!</p>}
            
        </section>
    );
}