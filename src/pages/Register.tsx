import React, {SyntheticEvent, useState} from "react";
import axiosInstance from "../axios";

import RecordView from "../components/Record";


const Register = () => {
    const [email, setEmail] = useState("")
    const [fileState, setFileState] = useState<(string | null)[]>([])

    const onFileAdd = (url: string | null) => {
        setFileState([...fileState, url])
    }

    // const onFileChange = async (e: SyntheticEvent) => {
    //     const target = e.target as HTMLInputElement
    //     const files = target.files
    //
    //     if (files && files.length) {
    //         filesState[target.name] = files[0]
    //         return
    //     }
    //
    //     console.error("no file")
    // }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("email", email)
        // for (const [key, value] of Object.entries(filesState)) {
        //     formData.append(key, value, value.name)
        // }

        await axiosInstance.post("register", formData)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onDeleteFile = async (idx: number) => {
        setFileState(fileState.filter((_, id) => id !== idx))
    }

    return (
        <div>
            {fileState.map((url, idx) => (
                <>
                    <p>audio record {idx + 1} &#10003;</p>
                    <p onClick={() => onDeleteFile(idx)}>&#10008;</p>
                    <audio src={url as string | undefined} controls />
                </>
            ))}
            <RecordView
                onFileAdd={onFileAdd}
            />
            <form onSubmit={submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>

                <input type="email" className="form-control" placeholder="name@example.com" required
                       onChange={e => setEmail(e.target.value)}
                />
                {/*<input type="file" name="file1" className="form-control" onChange={onFileChange} required/>*/}
                {/*<input type="file" name="file2" className="form-control" onChange={onFileChange} required/>*/}
                {/*<input type="file" name="file3" className="form-control" onChange={onFileChange} required/>*/}
                {/*<input type="file" name="file4" className="form-control" onChange={onFileChange} required/>*/}
                {/*<input type="file" name="file5" className="form-control" onChange={onFileChange} required/>*/}

                <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
            </form>
        </div>

    )
}

export default Register
