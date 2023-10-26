import React from 'react'
import { useParams } from 'react-router-dom'

export default function ChatRoom() {
  const {id} = useParams();
  return (
    <div>ChatRoom</div>
  )
}
