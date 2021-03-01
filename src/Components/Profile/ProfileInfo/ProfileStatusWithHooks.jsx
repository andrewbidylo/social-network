import React, { useEffect, useState } from 'react'


const ProfileStatusWithHooks = (props) => {

    // HOOK useState
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    // HOOK useEffect

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    const activeteEditMode = () => {
        setEditMode(true)
    }
    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
                <div>
                   <b>Status:</b> <span onDoubleClick={activeteEditMode}> {props.status || "_______"}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                        value={status} />
                </div>
            }
        </div>
    )
}

export default ProfileStatusWithHooks