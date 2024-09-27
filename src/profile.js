import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function Profile() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token')
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch("http://localhost:3001/profile", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/')
          })
        }
        console.log(result)
      })
      .catch((error) => console.error(error));
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  if (isLoaded) {
    return (<div>Loading</div>)
  }
  else {
    console.log(user)
    return (
      <div>
        <div>{user.firstname}</div>
        <div>{user.lastname}</div>
        <div>{user.message}</div>
        <div><button onClick={logout}>logout</button></div>
      </div>
    )
  }

}

export default Profile
