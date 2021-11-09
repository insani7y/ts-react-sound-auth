import {ReactMediaRecorder} from "react-media-recorder";
import React, {useEffect, useState} from "react";

interface RecordViewProps {
    onFileAdd: (url: string | null) => void
}

const RecordView = ({ onFileAdd }: RecordViewProps) => {

    const [isStop, setIsStop] = useState(false)
    const [url, setUrl] = useState<string | null>(null)

    useEffect(() => {
        if (isStop) {
            onFileAdd(url)
            setIsStop(false)
        }
    }, [isStop, onFileAdd, url])

    const startWithTimeout = (start: Function, stop: Function) => {
        start()
        setTimeout(() => {
            stop()

            setTimeout(() => setIsStop(true), 0)

        }, 1500)
    }

    const getFileBlob = (url: string | undefined) => {
        setUrl(url as string | null)
        return url
    }

    return (
        <div>
            <ReactMediaRecorder
                audio
                render={({status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <div>
                        <p>{status}</p>
                        <button className="form-control" onClick={() => {
                            return startWithTimeout(startRecording, stopRecording)
                        }}>Start Recording
                        </button>
                        <audio src={getFileBlob(mediaBlobUrl as string | undefined)} hidden controls />
                    </div>
                )}
            />
        </div>
    )
};
export default RecordView
