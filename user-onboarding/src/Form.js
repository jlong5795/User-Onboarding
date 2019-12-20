import React from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AppForm = ({values, errors, touched, status}) => {
    return(
        <div className='app-form'>
            <Form>
                <p>
                <label htmlFor='name'>
                Name: 
                    <Field
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Name'
                    />
                    {touched.name && errors.name && <p className='errors'>{errors.name}</p>}
                </label>
                </p>
                <p>
                <label htmlFor='email'>
                E-Mail: 
                    <Field
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Email'
                    />
                    {touched.email && errors.email && <p className='errors'>{errors.email}</p>}
                </label>
                </p>
                <p>
                <label htmlFor='password'>
                Password: 
                    <Field
                        type='password'
                        name='password'
                        id='password'
                    />
                    {touched.password && errors.password && <p className='errors'>{errors.password}</p>}
                </label>
                </p>
                <p>
                <label htmlFor='tosCheckbox'>
                Do you agree to the terms of service?
                    <Field
                        type='checkbox'
                        name='tosCheckbox'
                        id='tosCheckbox'
                    />
                    {touched.checkbox && errors.checkbox && <p className='errors'>{errors.checkbox}</p>}
                </label>
                </p>
                <button type='submit'>Submit</button>
            </Form>
        </div>
    )
}

const FormikAppForm = withFormik({
    mapPropsToValues({name, email, checkbox}){
        return{
        name: name || '',
        email: email || '',
        password: '',
        checkbox: checkbox || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required().min(3),
        email: Yup.string().required().email(),
        password: Yup.string().required().min(8),
        checkbox: Yup.boolean(true, 'Must accept term of service to continue')

    })
})(
    AppForm
);

export default FormikAppForm;