import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const { setToken } = useAuth()
    const navigate = useNavigate();

    const Auth = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('api/auth/login', {
                username: username,
                password: password
            });
            setToken(response.data.accessToken);
            navigate('/');
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
        <div className="hero-body">
            <div className="container">
                <div className="columns is-centered">
                    <div className="column is-4-desktop">
                        <form onSubmit={Auth} className="box">
                            <p className="has-text-centered">{msg}</p>
                            <div className="field mt-5">
                                <label className="label">Benutzername</label>
                                <div className="controls">
                                    <input type="text" className="input" placeholder="Benutzername" value={username} onChange={(e) => setUsername(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <label className="label">Passwort</label>
                                <div className="controls">
                                    <input type="password" className="input" placeholder="******" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>
                            <div className="field mt-5">
                                <button className="button is-success is-fullwidth">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login