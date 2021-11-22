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
        try {
            const res = await axiosInstance.post("jwt", formData)
            const token = res.data.access
            navigate(`/private?token=${token}`)
        } catch (e) {
            setError(e as string)
        }
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
