import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../css-modules/childrenList.module.css'
import { getChildren, getAllChildren, calculateAge } from '../backend/backendFunctions'
import Loading from './Loading'

function ChildrenList() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [userChildren, setUserChildren] = React.useState([])
    const [childrenLoaded, setChildrenLoaded] = useState(true)

    useEffect(() => {
        const fetchChildren = async () => {
            if (user.role === "family") {
                setChildrenLoaded(true)
                let children = await getChildren(user.user)
                setUserChildren(children)
            } else {
                setChildrenLoaded(true)
                let children = await getAllChildren()
                setUserChildren(children)
            }
        }
        fetchChildren()
            .catch((error) => {
                console.log(error)
            })
    }, [user.user, user.role])

    useEffect(() => {
        if (userChildren.length > 0) {
            setChildrenLoaded(false)
            dispatch({ type: "user/SetChildren", payload: userChildren })
        }
    }, [userChildren, dispatch])

    const handleChildClick = (child) => {
        dispatch({type: "user/SetSelection", payload: child})
    }

    return (
        <>
        {childrenLoaded ? <Loading /> :
                <div data-testid="childrenList" className={styles.childrenList}>
                    <h2 data-testid="title" className={styles.h2}>Children</h2>
                    <div data-testid="children" className={styles.children}>
                        {userChildren.length > 3 ? <div className={styles.spacer}></div> : null
                        }
                        {userChildren.map((child) => (
                            <div data-testid="child" key={child.id} className={styles.child } onClick={()=>handleChildClick(child)}>
                                
                                {/* DEBUG: isSelected is not returning the sected class style */}
                                <div data-testid="childName" className={styles.childName}>{child.name}</div>
                                <div data-testid="childDOB" className={styles.childDOB}>{calculateAge(child.DOB)}</div>
                                <div data-testid="childRoom" className={styles.room}>{child.room !== null ? child.room : "Not allocated"}</div>
                                
                            </div>
                        ))}
                    </div>
                </div>   
        }
        </>
  )
}

export default ChildrenList