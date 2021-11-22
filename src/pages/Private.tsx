import React, {useEffect, useState} from "react";
import axiosInstance from "../axios";
import {useLocation} from "react-router-dom";

const Private = () => {
    const [error, setError] = useState("")

    const location = useLocation()

    const [user, setUser] = useState("")

    useEffect(() => {
        const queryString = location.search

        const params = new URLSearchParams(queryString);
        const token = params.get("token")

        const func = async () => {
            try {
                const userData = await axiosInstance.get("api/me", {
                    headers: {
                        Token: token as string
                    }
                })

                setUser(userData.data.email)

                console.log(userData.data.email)

            } catch (e) {
                setError(e as string)
            }
        }
        func()
    }, [])

    return (
        <h1 className="h2 mb-4 fw-normal text-center">Welcome {user} to private page!</h1>
    )
}

export default Private
