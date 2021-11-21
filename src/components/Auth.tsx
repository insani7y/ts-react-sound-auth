import React, {SyntheticEvent, useEffect, useState} from "react"

import RecordView from "./Record";

interface File {
    url: string
    blob: Blob
}

interface LoginProps {
    title: string
    whenSubmit: (formData: FormData) => void
    totalCount: number
}

const Auth = ({title, whenSubmit, totalCount}: LoginProps) => {
    const [files, setFiles] = useState<File[]>([])
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        let nextIsComplete = false
        if (email.trim() && files.length === totalCount) {
            nextIsComplete = true
        }
        setIsComplete(nextIsComplete)
    }, [email, files])

    const handleAdd = (url: string, blob: Blob) => {
        setFiles([...files, {
            url,
            blob,
        }])
    }

    const handleDelete = async (idx: number) => {
        setFiles(files.filter((_, id) => id !== idx))
    }

    const onSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("email", email)

        files.forEach(({blob}, index) => {
            formData.append(`file${index + 1}`, blob)
        })

        setIsLoading(true)
        await whenSubmit(formData)
        setIsLoading(false)
    }

    return (
        <div>
            <h1 className="h2 mb-4 fw-normal text-center">{title}</h1>
            {files.length < totalCount && (
                <>
                    <p className="text-center">
                        After pressing the button, you need to speak for 1.5 seconds
                    </p>
                    <RecordView
                        left={totalCount - files.length}
                        onFileAdd={handleAdd}
                    />
                </>
            )}
            {files.map(({url}, idx) => (
                <div
                    className="card mb-3 mt-3"
                    key={`audio-${url}`}
                >
                    <div className="card-body d-flex align-items-center justify-content-between">
                        <p className="h4 card-title mt-0 mb-0 me-4">№ {idx + 1}</p>
                        <audio src={url as string | undefined} controls/>
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
                    disabled={!isComplete || isLoading}
                >
                    {isLoading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>

    )
}

export default Auth
