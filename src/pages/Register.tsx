import React, { SyntheticEvent, useEffect, useState } from "react"
import axiosInstance from "../axios";

import RecordView from "../components/Record";

const Register = () => {
    const [files, setFiles] = useState<(string)[]>([])
    const [email, setEmail] = useState("")

    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let nextIsComplete = false
        if (email.trim() && files.length === 5) {
            nextIsComplete = true
        }
        setIsComplete(nextIsComplete)
    }, [email, files])

    const handleAdd = (url: string) => {
        setFiles([...files, url])
    }

    const handleDelete = async (idx: number) => {
        setFiles(files.filter((_, id) => id !== idx))
    }

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("email", email)

        files.forEach((file, idx) => {
            // TODO сделать нормальную конвертацию блоба
            formData.append(`audio-file-${idx}`, file)
        })

        console.log(formData)

        await axiosInstance.post("register", formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h1 className="h2 mb-4 fw-normal text-center">Please register</h1>
            {files.map((url, idx) => (
                <div className="card mb-3">
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <p className="h4 card-title mt-0 mb-0 me-4" >№ {idx + 1}</p>
                        <audio src={url as string | undefined} controls />
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(idx)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
            {files.length < 5 && (
                <RecordView
                    left={5 - files.length}
                    onFileAdd={handleAdd}
                />
            )}
            <form onSubmit={onSubmit}>
                <input
                    type="email"
                    className="form-control mb-3 mt-3"
                    placeholder="name@example.com"
                    required
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    className="w-100 btn btn-success"
                    type="submit"
                    disabled={!isComplete}
                >
                    Submit
                </button>
            </form>
        </div>

    )
}

export default Register
