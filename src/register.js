import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

function Register() {
    const navigate = useNavigate();
    const MySwal = withReactContent(Swal);

    const [inputs, setInputs] = useState({
        userId: '',
        password: '',
        firstname: '',
        lastname: '',
        disabilitytype: '',
        caregiverId: ''
    });

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
            "userId": inputs.userId,
            "password": inputs.password,
            "firstname": inputs.firstname,
            "lastname": inputs.lastname,
            "disabilitytype": inputs.disabilitytype,
            "caregiverId": inputs.caregiverId,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:3001/register", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 'ok') {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'success'
                    }).then(() => {
                        navigate('/');
                    });
                } else {
                    MySwal.fire({
                        html: <i>{result.message}</i>,
                        icon: 'error'
                    });
                }
            })
            .catch((error) => console.error(error));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>userId:
                    <input
                        type="number"
                        name="userId"
                        value={inputs.userId || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>password:
                    <input
                        type="password"
                        name="password"
                        value={inputs.password || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>firstname:
                    <input
                        type="text"
                        name="firstname"
                        value={inputs.firstname || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>lastname:
                    <input
                        type="text"
                        name="lastname"
                        value={inputs.lastname || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>disabilitytype:
                    <select
                        name="disabilitytype"
                        value={inputs.disabilitytype || ""}
                        onChange={handleChange}
                    >
                        <option value="">Select disability type</option>
                        <option value="mute person">mute person</option>
                        <option value="deaf person">deaf person</option>
                        <option value="blind person">blind person</option>
                    </select>
                </label>
                <br />

                <label>caregiverId:
                    <input
                        type="number"
                        name="caregiverId"
                        value={inputs.caregiverId || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}

export default Register;
