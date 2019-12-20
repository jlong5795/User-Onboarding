import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const AppForm = ({values, errors, touched, status}) => {
    const [user, setUser] = useState([]);
    useEffect(() => {
        console.log('Status has changed', status);
        status && setUser( user => [...user, status]);
    },[status]);
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
                        check={values.tosCheckbox}
                    />
                    {touched.checkbox && errors.checkbox && <p className='errors'>{errors.checkbox}</p>}
                </label>
                </p>
                <button type='submit'>Submit</button>
            </Form>
            {user.map(item => (
                <ul key={item.id}>
                    <li>Name: {item.name}</li>
                    <li>Email: {item.email}</li>
                </ul>
            ))}
        </div>
    )
}

const FormikAppForm = withFormik({
    mapPropsToValues({name, email, tosCheckbox}){
        return{
        name: name || '',
        email: email || '',
        password: '',
        tosCheckbox: tosCheckbox || false
        }
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required().min(3, 'Name must be longer than 3 characters'),
        email: Yup.string().required().email('Please enter a VALID email address'),
        password: Yup.string().required().min(8, 'Passwords must be at least 8 characters'),
        tosCheckbox: Yup.boolean().oneOf([true], 'Must accept term of service to continue')

    }),
    handleSubmit(values, {setStatus, resetForm}) {
        console.log('Submitting', values);
        axios.post('https://reqres.in/api/users', values)
        .then(response => {
            console.log('Success!', response);
            setStatus(response.data);
            resetForm();
        })
        .catch(error => {
            console.log('There was an error', error.response);
        })
    }
})(
    AppForm
);

export default FormikAppForm;