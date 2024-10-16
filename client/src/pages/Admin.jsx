import React, { useEffect } from 'react'
import { get } from '../services/Api'

export default function Admin() {

  useEffect(()=>{
         const GetUsers=async()=>{
          try {
                const request= await get('/api/admin/getuser')
                const response= request.data
                console.log(response)
          } catch (error) {
              console.log(error)
          }
         }
         GetUsers()
  },[])
  return (
    <>
    </>
  )
}
