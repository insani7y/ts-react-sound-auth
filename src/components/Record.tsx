import {ReactMediaRecorder} from "react-media-recorder";
import React, {useEffect, useState} from "react";

interface RecordViewProps {
    onFileAdd: (url: string) => void
    left: number
}

const RecordView = ({ onFileAdd, left }: RecordViewProps) => {
    const [isStop, setIsStop] = useState(false)
    const [url, setUrl] = useState<string | undefined>()

    useEffect(() => {
        if (isStop) {
            onFileAdd(url as string)
            setIsStop(false)
        }
    }, [isStop, onFileAdd, url])

    const startWithTimeout = (start: Function, stop: Function) => {
        start()
        setTimeout(() => {
            stop()

            setTimeout(() => {
                setIsStop(true)
            }, 0)

        }, 1500)
    }

    const getFileBlob = (url: string | undefined) => {
        if (url) {
            setUrl(url)
        }
        return url
    }

    return (
        <div>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <>
                        <button
                            className="form-control btn btn-primary"
                            onClick={() => startWithTimeout(startRecording, stopRecording)}
                            disabled={status === "recording"}
                        >
                            Start Recording (left to record: {left} files)
                        </button>
                        <audio src={getFileBlob(mediaBlobUrl as string | undefined)} hidden controls />
                    </>
                )}
            />
        </div>
    )
};
export default RecordView
