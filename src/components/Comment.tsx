import { ThumbsUp, Trash } from '@phosphor-icons/react';
import styles from './Comment.module.css';
import Avatar from './Avatar';
import { useState } from 'react';

interface CommentProps {
    content: string;
    onDeleteComment: (commentToDelete: string) => void;
}

export default function Comment({ content, onDeleteComment }: CommentProps) {
    const [likeCount, setLikeCount] = useState(0);

    function handleDeleteComment() {
        onDeleteComment(content);
    }

    function handleLikeComment() {
        setLikeCount(likeCount + 1)
    }

    return (
        <div className={styles.comment}>
            <Avatar src="https://github.com/MarceloDCastro.png" hasBorder={false} />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Marcelo de Castro</strong>
                            <time dateTime='2023-07-11 20:00' title='11 de Julho às 20:00'>Cerca de 1h atrás</time>
                        </div>

                        <button title="Deletar comentário" onClick={handleDeleteComment}><Trash size={24} /></button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}