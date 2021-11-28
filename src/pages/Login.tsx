import axiosInstance from '../axios'
import React, {useState} from "react";
import Auth from '../components/Auth'
import {useNavigate} from 'react-router-dom'
import Private from './Private'

const Login = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const onSubmit = async (formData: FormData) => {
        setError("")
        await axiosInstance.post("jwt", formData)
            .then(res => {
                const token = res.data.access
                navigate(`/private?token=${token}`)
            })
            .catch(err => {
                let message = "Неизвестная ошибка, попробуйте еще раз..."

                if (err.response.status === 400) {
                    message = "Что-то не так с записанным звуком"
                }

                if (err.response.status === 401) {
                    message = "Неправильная почта или голос"
                }

                setError(message)
            })
    }

    return (
        <>
            {error && (
                <div className="alert alert-warning alert-dismissible fade show">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError("")}
                    />
                </div>
            )}
            <Auth
                title={"Please login"}
                whenSubmit={onSubmit}
                totalCount={1}
            />
        </>
    )
}

export default Login
