import { useState, useEffect } from 'react'
import axios from 'axios'
import './styles.css'

import { Card } from '../../Components/Card'

export function AttendanceList() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("en-US", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios('https://api.github.com/users/mpachecoc')

      const { name, avatar_url } = response.data

      setUser({
        name,
        avatar: avatar_url
      })
    }
     
    fetchData()
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Attendance List</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile pic" />
        </div>
      </header>

      <input 
        type="text" 
        placeholder="Type your name..." 
        onChange={e => setStudentName(e.target.value)}
      />

      <button type="button" onClick={handleAddStudent}>Save</button>

      {
        students.map(student => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))
      }
    </div>
  )
}
