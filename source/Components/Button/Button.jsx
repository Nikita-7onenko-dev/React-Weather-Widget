import { act } from 'react'
import * as styles from './Button.module.scss'


export function Button({onClick, onMouseDown, children, className=''}) {

    return (
        <button 
            className={`${styles.Button} ${className}`}
            type="button" 
            onClick={onClick}
            onMouseDown={onMouseDown}
        >
            {children}
        </button>
    )
}