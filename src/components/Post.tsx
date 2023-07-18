import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Avatar from './Avatar';
import Comment from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, InvalidEvent, useState } from 'react';

interface PostProps {
    post: PostType;
}

export interface PostType {
    id: number;
    author: Author;
    content: Content[];
    publishedAt: Date;
}

interface Author {
    name: string;
    role: string;
    avatarUrl: string;
}

export interface Content {
    type: 'paragraph' | 'link';
    content: string;
}

export default function Post({ post }: PostProps) {
    const [comments, setComments] = useState([
        'Post bacana!!'
    ]);
    const [newCommentText, setNewCommentText] = useState('');

    const publishedDateFormatted = format(post.publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    });

    const isNewCommentEmpty = !newCommentText.trim();

    const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('O comentário não pode estar vazio!');
    }

    function handleCreateNewComment() {
        event?.preventDefault();

        setComments([...comments, newCommentText]);
        setNewCommentText('');
    }
    
    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => comment !== commentToDelete);

        setComments(commentsWithoutDeletedOne);
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={post.author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{post.author.name}</strong>
                        <span>{post.author.role}</span>
                    </div>
                </div>

                <time dateTime={post.publishedAt.toISOString()} title={publishedDateFormatted}>{publishedDateRelativeToNow}</time>
            </header>

            <div className={styles.content}>
                {post.content.map(line => {
                    switch (line.type) {
                        case 'paragraph':
                            return <p key={line.content}>{line.content}</p>

                        case 'link':
                            return <a key={line.content} href='#'>{line.content}</a>
                    }
                })}
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder='Deixe seu comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    required
                    onInvalid={handleNewCommentInvalid}
                />

                <footer>
                    <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments?.map(comment => (
                    <Comment key={comment} content={comment} onDeleteComment={deleteComment} />
                ))}
            </div>
        </article>
    )
}