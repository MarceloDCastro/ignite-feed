import { PencilLine } from '@phosphor-icons/react';

import styles from './Sidebar.module.css';
import Avatar from './Avatar';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <img
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                className={styles.cover}
            />
            
            <div className={styles.profile}>
                <Avatar src="https://github.com/MarceloDCastro.png" />

                <strong>Marcelo de Castro</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#"><PencilLine size={20} /> Editar seu perfil</a>
            </footer>
        </aside>
    )
}