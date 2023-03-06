import { Link } from "react-router-dom"
import { isAuthenticate } from "../auth/helpers"
import Layout from "../core/Layout"

const AdminDashboard = () => {
  const adminInfo=()=>{
    return(
      <div className="card">
      <div className="card-body">
      <h5 className=" card-header">Admin Information</h5>
      <ul className=" list-group-flush">
        <li className="list-group-item">{name}</li>
        <li className="list-group-item">{email}</li>
        <li className="list-group-item">{role?'Admin':'user'}</li>
      </ul>
    </div>
    </div>
    )
  }

  const adminLinks=()=>{
    return(
      <div className="card">
      <div className="card-body">
      <h5 className="card-header">User Links</h5>
      <ul className="list-group-flush">
        <li className="list-group-item"><Link className="nav-link text-primary" to='/category/create'>Create Category</Link></li>
        <li className="list-group-item"><Link className="nav-link text-primary" to='/product/create'>Add Product</Link></li>
        <li className="list-group-item"><Link className="nav-link text-primary" to='/admin/orders'>List Orders</Link></li>
        <li className="list-group-item"></li>
      </ul>
    </div>
    </div>
    )
  }
  const {user:{name,email,role}}=isAuthenticate()
  return (
    <Layout title='dashboard' description={`welcome ${name}`} className='container'>
      <div className="row justify-content-center">
        <div className="col-md-3">
          {adminLinks()}
        </div>
        <div className="col-md-6">
          {adminInfo()}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
