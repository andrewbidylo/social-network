
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { FilterFormType } from '../../redux/usersPageReducer';
import { getUsersFilter } from '../../redux/usersSelectors';


const usersSearchFormValidate =(values: any) => {
    const errors = {};
    return errors;

}

type FriendFormType = 'true' | 'false' | 'null'
export type FormType = {
  term: string,
  friend: FriendFormType}

export type UsersSearchFormType = {
  onFilterChanged: (filter: FilterFormType)  => void
}

export const UsersSearchForm: React.FC <UsersSearchFormType> = React.memo( (props) => {
    const submit =(values: FormType , {setSubmitting}:{setSubmitting: (isSubmitting: boolean)=> void }) => {
      const filter: FilterFormType = {
        term: values.term,
        friend: values.friend === 'null' ? null : values.friend === 'true' ? true: false
      }

    props.onFilterChanged(filter)
    setSubmitting(false)
    }

    const filter = useSelector(getUsersFilter)
return <div>
 <Formik
      enableReinitialize
       initialValues={{ term: filter.term, friend: String (filter.friend) as FriendFormType}}
       validate={usersSearchFormValidate}
       onSubmit={submit}
     >
       {({ isSubmitting }) => (
         <Form>
           <Field type="text" name="term"/>
           <Field name='friend' as='select'>
             <option value="null">All</option>
             <option value="true">Only followed</option>
             <option value="false">Only unfollowed</option>
           </Field>
           <button type="submit" disabled={isSubmitting}>
             Find
           </button>
         </Form>
       )}
     </Formik>

</div>
})