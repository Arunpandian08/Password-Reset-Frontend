import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import sound from '/level-up-191997.mp3';
import SoundErr from '/livechat-129007.mp3';
import './Styles/Login.css';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const successNotificationSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };

    const errorNotificationSound = () => {
        const audio = new Audio(SoundErr);
        audio.play();
    };
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:4000/api/user/login', values);
            const { token } = response.data; // Extract token from response
            localStorage.setItem('token', token); // Store token in localStorage
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onOpen: successNotificationSound,
                transition: Zoom,
            });
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            if (error.response && error.response.status === 409) {
                toast.error('User already exists. Please give an alternate email id', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onOpen: errorNotificationSound,
                    transition: Zoom,
                });
            } else {
                toast.error('Please Check Your Email and Password', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    onOpen: errorNotificationSound,
                    transition: Zoom,
                });
            }
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    }
    return (
        <div id="form-ui">
            {/* Formik form */}
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <div className="login">
                        <div className="login-1">
                            <Form id="form" className='mt-5'>
                                <div id="form-body">
                                    <div id="welcome-lines">
                                        <div id="welcome-line-1"><i className="fa-solid fa-user-lock"></i> Log in</div>
                                        <div id="welcome-line-2">Welcome Back</div>
                                        <hr style={{ background: 'black', height: '0.2rem' }} />
                                    </div>
                                    <div id="input-area">
                                        <div className="form-inp">
                                            <Field type="text" name="email" placeholder="Email Address" />
                                            <ErrorMessage name="email" component="div" className="error-message text-danger" />
                                        </div>
                                        <div className="form-inp">
                                            <Field type="password" name="password" autoComplete='password' placeholder="Password" />
                                            <ErrorMessage name="password" component="div" className="error-message text-danger" />
                                        </div>
                                    </div>
                                    <div id="submit-button-cvr">
                                        <button id="submit-button" type="submit" disabled={isSubmitting}>
                                            <span>{loading ? <div className="loader"></div> : 'Log in'}</span>
                                        </button>
                                    </div>
                                    <div id="forgot-pass">
                                        <Link to='/forgetpassword' className="text-dark" >Forgot password?</Link>
                                    </div>
                                    <div id="forgot-pass">
                                        <span className="bottom_text">Don't have an account?  <Link className="swtich1" to='/register'>Sign Up</Link></span>
                                    </div>
                                </div>
                            </Form>
                        </div>

                    </div>
                )}
            </Formik>
        </div>
    );
};

export default Login;
