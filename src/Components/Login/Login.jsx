
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {required, maxLenghtCreator} from './../../utils/validators/validators'
import {Input} from './../Common/FormsControl/FormsControl'
import { connect } from 'react-redux'
import {login} from './../../redux/auth'
import { Redirect } from 'react-router-dom'
import styles from './../Common/FormsControl/FormsControl.module.css'

const maxLenght6 = maxLenghtCreator(40)
const LoginForm =(props)=>
{
    return  (
        
            //e.preventDefault, get all data and put them to an object, props.onSubmit(formData)
            <form onSubmit ={props.handleSubmit}>
            <div>
                <Field placeholder = {'Email'} name ={'email'}
                 component ={Input} validate={[required, maxLenght6]}/>
            </div>
            <div>
                <Field placeholder = {'Password'} name ={'password'} type = {'password'}
                 component ={Input} validate={[required, maxLenght6]}/>
            </div>
            <div>
                <Field component ={'input'} name ={'rememberMe'}
                 type = {'checkbox'}/> remember me
            </div>
            
            {props.erorr && <div className = {styles.formSummaryErorr}>
            {props.error}
            </div>
            }
            <div>
                <button>Log in</button>
            </div>
            </form>
        

    )} 

const LoginReduxForm = reduxForm({
    // a unique name for the form
    form: 'login'
  })(LoginForm)

const Login =(props)=>{
    const onSubmit =(formData) => {
        // HOC Connect return Callback function and we call this function
        props.login(formData.email,formData.password, formData.rememberMe)
    }

// After login redirect to profile
    if (props.isAuth) {
        return <Redirect to = {'/profile'}/>
    }
        return  (
                <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit = {onSubmit}/>
                </div>
        )}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})
// HOC Connect, mapStateToProps, mapDispachToProps = we create object and put links on Thank creators 

export default connect(mapStateToProps, {login} ) (Login)