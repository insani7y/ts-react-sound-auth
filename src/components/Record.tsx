import { ReactMediaRecorder } from "react-media-recorder";
import React from "react";

interface RecordViewProps {
    onFileAdd: (url: string, blob: Blob) => void
    left: number
}

const RecordView = ({ onFileAdd, left }: RecordViewProps) => {
    const startWithTimeout = (start: Function, stop: Function) => {
        start()
        setTimeout(() => {
            stop()
        }, 1500)
    }

    return (
        <div>
            <ReactMediaRecorder
                audio={true}
                onStop={onFileAdd}
                render={({ status, startRecording, stopRecording, mediaBlobUrl}) => (
                    <>
                        <button
                            className="form-control btn btn-primary"
                            onClick={() => startWithTimeout(startRecording, stopRecording)}
                            disabled={status === "recording"}
                        >
                            {status === "recording" ? (
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                <span>Start Recording (left to record: {left} files)</span>
                            )}

                        </button>
                        <audio src={mediaBlobUrl as string | undefined} hidden controls />
                    </>
                )}
            />
        </div>
    )
};
export default RecordView
