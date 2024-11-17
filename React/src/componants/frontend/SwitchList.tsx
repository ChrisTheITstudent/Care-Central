import { useEffect, useState } from 'react'
import { Children } from '../../classes'
import { createChildrenList } from '../backend/fetchData'
import Toggle from './Toggle'

interface SwitchListProps {
    username: string
}

function SwitchList({ username }: SwitchListProps) {
    const [childList, setChildList] = useState<Children[] | null>(null)

    useEffect(() => {
        createChildrenList(username)
            .then((dataList) => {
                setChildList(dataList)
            })
    }, [])
  return (
      <div className='switch-container'>
          <p className='switch-header'>My Children</p>
          {
              childList?.map((child: Children) => (
                  <li key={child.getFirstName()}>
                      <p>{child.getFirstName()}</p>
                      <Toggle
                          id={child.getId()}
                          initialIsOn={child.getAttending()} />
                  </li>
              ))
          }
      </div>
  )
}

export default SwitchList