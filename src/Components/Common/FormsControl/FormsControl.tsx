import React from 'react'
import { Field, WrappedFieldMetaProps, WrappedFieldProps } from 'redux-form'
import { FieldValidatorsType } from '../../../utils/validators/validators'
import styles from './FormsControl.module.css'


// Created FormControl with error control

type FormControlPropsType = {
    meta: WrappedFieldMetaProps
    children: React.ReactNode
}

export const FormControl: React.FC<FormControlPropsType> = ({ meta: { touched, error }, children }) => {
    const hasError = touched && error
    return (
        <div className={(hasError ? styles.formControl : '')}>
            <div>
                {children}
            </div>
            {hasError && <span className={styles.formControlMessage}>
                {error}
            </span>}
        </div>
    )
}
export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return (
        <FormControl {...props}><textarea {...input}{...restProps} /></FormControl>)
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const { input, meta, child, ...restProps } = props
    const { input, meta, ...restProps } = props
    return <FormControl {...props}> <input {...input} {...restProps} /> </FormControl>
}


export function CreateField <FormsKeysType extends string> (placeholder: string | undefined, 
    name: FormsKeysType, validators: Array<FieldValidatorsType>,
    component: React.FC<WrappedFieldProps>, props = {}, text = ''){
        return <div>
        <Field placeholder={placeholder}
            name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div> 
    }
