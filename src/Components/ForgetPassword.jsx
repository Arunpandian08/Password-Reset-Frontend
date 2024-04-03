import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Zoom, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import soundErr from "/livechat-129007.mp3";
import sound from "/level-up-191997.mp3";
import { Link , useNavigate } from "react-router-dom";
import './Styles/Login.css';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate()
    const successNotificationSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };
    const errorNotificationSound = () => {
        const audio = new Audio(soundErr);
        audio.play();
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true); // Set loading to true when form is submitted
        try {
            const response = await axios.post("https://password-reset-backend-ytao.onrender.com/api/user/forgetpassword",values);
            toast.success(response.data.message, {
                // Update to use response.data.message
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onOpen: successNotificationSound,
                transition: Zoom,
            });
            // Reset form fields after successful submission
            resetForm();
            navigate('/login')
        } catch (error) {
            console.error("Error submitting form:", error);
            // Display toast message for error
            toast.error(error.response.data.message, {
                // Update to use error.response.data.message
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                onOpen: errorNotificationSound,
                transition: Zoom,
            });
        } finally {
            setLoading(false); // Reset loading state after request is completed
            setSubmitting(false); // Reset submitting state
        }
    };

    return (
        <div className="forget">
            <div className="form-ui">
                <Formik
                    initialValues={{ email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <div className="login">
                            <div className="login-1">
                                <Form id="form">
                                    <div id="form-body">
                                        <div id="welcome-lines">
                                            <div><i className="fa-solid fa-face-grin-beam-sweat fa-3x"></i></div>
                                            <div id="welcome-line-2">Forget Password</div>
                                            <hr style={{ background: 'black', height: '0.2rem' }} />
                                        </div>
                                        <div id="input-area">
                                            <div className="form-inp">
                                                <Field type="text" name="email" placeholder="Email Address" />
                                                <ErrorMessage name="email" component="div" className="error-message text-danger" />
                                            </div>
                                        </div>
                                        <div id="submit-button-cvr">
                                            <button id="submit-button" type="submit" disabled={isSubmitting}>
                                                <span>{loading ? <div className="loader"></div> : 'send'}</span>
                                            </button>
                                        </div>
                                        <div id="forgot-pass">
                                            <Link className="bottom_text" to='/login'>Back to login</Link>
                                        </div>
                                        <div id="bar"></div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgetPassword;