import styles from './../Common/FormsControl/FormsControl.module.css'
import loginStyle from './../Login/LoginStyle.module.css'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { required, maxLenghtCreator } from '../../utils/validators/validators'
import { CreateField, Input } from '../Common/FormsControl/FormsControl'
import { Button } from '@material-ui/core'


const maxLenght40 = maxLenghtCreator(40)

type LoginFormOwnProps = {
    captchaUrl: string | null
}

export type LoginFormValueType = {
    email:  string
    password: string
    rememberMe: boolean
    captcha: string
}

export const LoginForm: React.FC<InjectedFormProps<LoginFormValueType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        //e.preventDefault, get all data and put them to an object, props.onSubmit(formData)
        <form onSubmit={handleSubmit}>
            <div >
                <Field placeholder={'Email'} name={'email'}
                    component={Input} validate={[required, maxLenght40]} />
            </div>
            <div>
                <Field className={loginStyle.loginFilds} placeholder={'Password'} name={'password'} type={'password'}
                    component={Input} validate={[required, maxLenght40]} />
            </div>
            <div>
                <Field className={loginStyle.loginFilds} component={'input'} name={'rememberMe'}
                    type={'checkbox'} /> remember me
            </div>
            {captchaUrl && <img src={captchaUrl} alt='' />}
            {captchaUrl && CreateField('Symbols from image', 'captcha', [required], Input)}

            {error && <div className={styles.formSummaryError}>
                {error}
            </div>
            }
            <div className = {loginStyle.button} >
                <Button variant="contained" onClick= {handleSubmit}>Log in</Button>
            </div>
        </form>


    )
}

export const LoginReduxForm = reduxForm<LoginFormValueType, LoginFormOwnProps>({
    // a unique name for the form
    form: 'login'
})(LoginForm)