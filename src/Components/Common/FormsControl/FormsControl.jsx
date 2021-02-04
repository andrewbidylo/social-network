import React from 'react'
import styles from './FormsControl.module.css'


// Created FormControl with error control
export const FormControl = ({input, meta, child, ...props}) => {
    const hasError = meta.touched && meta.error
    return (
       <div className = {(hasError ? styles.formControl :'')}>
        <div>
            {props.children}
        </div>
        {hasError && <span className = {styles.formControlMessage}>
            {meta.error}
        </span>}
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props
    return (
        <FormControl {...props}><textarea {...input}{...restProps}/></FormControl>)}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props
        return (
                <FormControl {...props}><input {...input}{...restProps}/></FormControl>)}