import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Zoom, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import soundErr from "/livechat-129007.mp3";
import sound from "/level-up-191997.mp3";
import { useNavigate, useParams } from 'react-router-dom';
import './Styles/ResetPassword.css';

const ResetPassword = () => {
    const [tokenValid, setTokenValid] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate()

    
    const successNotificationSound = () => {
        const audio = new Audio(sound);
        audio.play();
    };
    const errorNotificationSound = () => {
        const audio = new Audio(soundErr);
        audio.play();
    };

    useEffect(() => {
        // validate token
        const validateResetCode = async () => {
            console.log("token checking");
            const decodeToken = decodeURIComponent(token)
            console.log("Decoded Token:",decodeToken);
            try {
                const response = await axios.get(`http://localhost:4000/api/user/validateresettoken/${decodeToken}`);
                if (response.data.valid) {
                    setTokenValid(true);
                } else {
                    toast.error("Invalid token", {
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
                    navigate("/login"); // Redirect to homepage if token is invalid
                }
            } catch (error) {
                console.error("Error validating token:", error);
            }
        };

        validateResetCode();
    }, [token, navigate]);

    // Define initial form values
    const initialValues = {
        email: '',
        newPassword: '',
        confirmPassword: ''
    };

    // Define validation schema using Yup
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Username is required'),
        newPassword: Yup.string().required('New password is required').min(8, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
            .required('Confirm password is required').oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axios.post('http://localhost:4000/api/user/passwordreset', values);
            toast.success('Password Reset Successful', {
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
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-ui">
            <div className='Reset'>
                <div className="reset-1">
                    {/* Formik form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form className="form_main">
                                <p className="r-heading">Reset Password</p>
                                <div className="inputContainer">
                                    <Field type="text" name="email" autoComplete='email' placeholder="Email" className="inputField" />
                                    <ErrorMessage name="email" component="div" className="error-message" />
                                </div>
                                <div className="inputContainer">
                                    <Field type="password" name="newPassword" autoComplete='new-password' placeholder="🔐New Password" className="inputField" />
                                    <ErrorMessage name="newPassword" component="div" className="error-message" />
                                </div>
                                <div className="inputContainer">
                                    <Field type="password" name="confirmPassword" autoComplete='confirm-password' placeholder="🔐Confirm Password" className="inputField" />
                                    <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                                </div>
                                <button id="button" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                                <Link className="forgotLink" to='/login'>Back to login</Link>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
