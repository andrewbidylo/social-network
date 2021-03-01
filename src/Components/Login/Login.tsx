
import React from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLenghtCreator } from '../../utils/validators/validators'
import {CreateField,  Input } from '../Common/FormsControl/FormsControl'
import { connect } from 'react-redux'
import { login } from '../../redux/auth'
import { Redirect } from 'react-router-dom'
import styles from './../Common/FormsControl/FormsControl.module.css'
import { AppStateType } from '../../redux/redaxStore'


const maxLenght40 = maxLenghtCreator(40)

type LoginFormOwnProps= {
    captchaUrl:string | null
}

const LoginForm: React.FC <InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl}) => {
    return (
        //e.preventDefault, get all data and put them to an object, props.onSubmit(formData)
        <form onSubmit={handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={'email'}
                    component={Input} validate={[required, maxLenght40]} />
            </div>
            <div>
                <Field placeholder={'Password'} name={'password'} type={'password'}
                    component={Input} validate={[required, maxLenght40]} />
            </div>
            <div>
                <Field component={'input'} name={'rememberMe'}
                    type={'checkbox'} /> remember me
            </div>
        {captchaUrl && <img src = {captchaUrl} alt=''/>}
        {captchaUrl && CreateField('Symbols from image', 'captcha', [required], Input)}
        
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Log in</button>
            </div>
        </form>


    )
}

const LoginReduxForm = reduxForm<LoginFormValueType,LoginFormOwnProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)


type MapDispatchToPropsType= {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
   
}

type LoginFormValueType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string

}
type LoginFormValueTypeKets =  Extract <keyof LoginFormValueType, string>

const Login: React.FC <MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    const onSubmit = (formData: LoginFormValueType) => {
        // HOC Connect return Callback function and we call this function
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    // After login redirect to profile
    if (props.isAuth) {
        return <Redirect to={'/profile'} />
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
        </div>
    )
}

type MapStateToPropsType= {
    isAuth: boolean
    captchaUrl: string | null
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
})
// HOC Connect, mapStateToProps, mapDispachToProps = we create object and put links on Thank creators 

export default connect(mapStateToProps, { login })(Login)