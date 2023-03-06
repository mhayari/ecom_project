import React from 'react'
import { isAuthenticate } from '../auth/helpers'
import Layout from './Layout'

function Profile() {
   const {user}=isAuthenticate()
  return (
    <Layout title={user.name}
    description='Profile'
    className='container'>
        <p>Name : {user.name}</p>
    </Layout>
  )
}

export default Profile
