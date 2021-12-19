import './style.css'
import PersonIcon from '@material-ui/icons/Person';
import BookIcon from '@material-ui/icons/Book';
import LinkIcon from '@material-ui/icons/Link';
interface BooksItemProps {
    book : {
        objectID: string,
        title: string,
        author: string,
        url: string
    }
}

export function ListItem(props: BooksItemProps) {
    return(
        <li>
            <label>
            <PersonIcon/>
            <strong>{props.book.author}</strong>
            </label>
            <label>
                <BookIcon/>
            <p>{props.book.title}</p>
            </label>
            <label>
            <LinkIcon/>
            <a href={props.book.url}>
             Acessar conteúdo
            </a>     
            </label>       
        </li>
    );
}