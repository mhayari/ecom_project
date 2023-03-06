const Layout = ({title,description,className,children}) => {
  return (
  //   <div>
  //     <div className="p-3 mb-4 bg-light">
  //   <h1 className="mb-3 display-6">{title}</h1>
  //   <p className="mb-3">{description}</p>
  // </div>
  //   <div className={className}>{children}</div>
  // </div> 
    <div>
      <div className="jumbotron mt-5 px-5 p-2 mb-1 mb-4 bg-light">
    <h1 className="display-6">{title}</h1>
    <p className="lead">{description}</p>
  </div>
    <div className={className}>{children}</div>
  </div>
  )
}


export default Layout
