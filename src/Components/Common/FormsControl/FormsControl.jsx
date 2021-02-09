import React from 'react'
import styles from './FormsControl.module.css'


// Created FormControl with error control
export const FormControl = ({ meta: {touched,error}, children}) => {
    const hasError = touched && error
    return (
       <div className = {(hasError ? styles.formControl :'')}>
        <div>
            {children}
        </div>
        {hasError && <span className = {styles.formControlMessage}>
            {error}
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