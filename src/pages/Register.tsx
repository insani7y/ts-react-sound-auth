import axiosInstance from '../axios'
import React, {useState} from "react"
import Auth from '../components/Auth'
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const onSubmit = async (formData: FormData) => {
        setError("")
        await axiosInstance.post("register", formData)
            .then(res => {
                navigate(`/login`)
            })
            .catch(err => {
                let message = "Неизвестная ошибка, попробуйте еще раз..."

                if (err.response.status === 400) {
                    message = "Данные для регистрации некорректны"
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
                title={"Please register"}
                whenSubmit={onSubmit}
                totalCount={5}
            />
        </>
    )
}

export default Register
