import { Link } from "react-router-dom"
import { isAuthenticate } from "../auth/helpers"
import Layout from "../core/Layout"

const Dashboard = () => {
  const {user:{name,email,role}}=isAuthenticate()
  const userInfo=()=>{
    return(
      <div className="card">
      <div className="card-body">
      <h5 className=" card-header">User Information</h5>
      <ul className=" list-group-flush">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role?'admin':'user'}</li>
      </ul>
    </div>
    </div>
    )
  }
  const userPerchase=()=>{
    return(
      <div className="card">
      <div className="card-body">
      <h5 className="card-header">Purchase History</h5>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">History</li>
      </ul>
    </div>
    </div>
    )
  }
  const userLinks=()=>{
    return(
      <div className="card">
      <div className="card-body">
      <h5 className="card-header">User Links</h5>
      <ul className="list-group-flush">
        <li className="list-group-item"><Link className="nav-link text-primary" to='/cart'>My Cart</Link></li>
        <li className="list-group-item"><Link className="nav-link text-primary" to='/profile'>My Profile</Link></li>
        <li className="list-group-item"></li>
      </ul>
    </div>
    </div>
    )
  }
  return (
    <Layout title='dashboard' description={`welcome ${name}`} className='container'>
      <div className="row justify-content-center">
        <div className="col-md-3">
          {userLinks()}
        </div>
        <div className="col-md-6">
          {userInfo()}
          <hr/>
          {userPerchase()}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
