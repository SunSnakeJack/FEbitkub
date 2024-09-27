import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Login() {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const [inputs, setInputs] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "userId": inputs.userId, // เปลี่ยนเป็น userId
      "password": inputs.password,
      "expiresIn": 600000
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("http://localhost:3001/login", requestOptions) // เปลี่ยน URL ให้ตรงกับเซิร์ฟเวอร์ของคุณ
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === 'ok') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'success'
          }).then((value) => {
            localStorage.setItem('token', result.accessToken);
            navigate('/profile');
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          });
        }
      })
      .catch((error) => console.error(error));

    console.log(inputs);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>User ID:
          <input
            type="text"
            name="userId" // เปลี่ยนเป็น userId
            value={inputs.userId || ""} // เปลี่ยนเป็น userId
            onChange={handleChange}
          />
        </label>
        <label>Password:
          <input
            type="password"
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
          />
        </label>
        <input type="submit" />
      </form>
      <a href="/register">Register</a>
    </div>
  );
}

export default Login;
