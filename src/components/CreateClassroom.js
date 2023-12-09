import React, { useState } from 'react';
import axios from 'axios';

const CreateClassroom = (props) => {
        const [labname, setLabname] = useState('');
        const [createdBy, setCreatedBy] = useState('');
        const [language, setLanguage] = useState('');
        const [password, setPassword] = useState('');

        const handleFormSubmit = async (e) => {
                e.preventDefault();

                let admincode = Math.random().toString(36).slice(2);
                bcrypt.hash(password, 10, async (err, hash) => {
                        if (err) {
                                console.log(err);
                        }

                        let roomData = {
                                labname: labname,
                                password: hash,
                                createdBy: createdBy,
                                adminCode: admincode,
                                languageId: language,
                        };

                        // windowethereum = windowEth;
                        console.log('=== roomData ===', roomData);

                });
        };

        return (
                <div>
                        <img
                                className="wave"
                                src=""
                                alt=""
                        />
                        <div className="container">
                                <div className="img">
                                        <img src="/images/bg.png" alt="Background" />
                                </div>
                                <div className="login-content">
                                        <form id='createform' onSubmit={handleFormSubmit}>
                                                <img src="/images/avatar.svg" alt="Avatar" />
                                                <h2 className="title">Fill the details</h2>
                                                <div className="input-div one">
                                                        <div className="i"></div>
                                                        <div className="div">
                                                                <input
                                                                        required
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="Lab Name"
                                                                        value={labname}
                                                                        onChange={(e) => setLabname(e.target.value)}
                                                                />
                                                        </div>
                                                </div>
                                                <div className="input-div two">
                                                        <div className="i"></div>
                                                        <div className="div">
                                                                <input
                                                                        required
                                                                        type="text"
                                                                        className="input"
                                                                        placeholder="User name"
                                                                        value={createdBy}
                                                                        onChange={(e) => setCreatedBy(e.target.value)}
                                                                />
                                                        </div>
                                                </div>
                                                <div className="input-div three">
                                                        <div className="i"></div>
                                                        <select
                                                                required
                                                                className="select"
                                                                value={language}
                                                                onChange={(e) => setLanguage(e.target.value)}
                                                        >
                                                                <option disabled selected value="">
                                                                        -- select a language --
                                                                </option>
                                                                <option value='49'>C</option>
                                                                <option value='54'>C++ </option>
                                                                <option value='62'>Java(13.0.1)</option>
                                                                <option value="71">Python(3.8.1)</option>
                                                        </select>
                                                </div>
                                                <div className="input-div pass">
                                                        <div className="i"></div>
                                                        <div className="div">
                                                                <input
                                                                        required
                                                                        type="password"
                                                                        className="input"
                                                                        placeholder="Enter Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                />
                                                        </div>
                                                </div>
                                                <button type="submit" className="btn" id='generatelink'>
                                                        Get Link
                                                </button>
                                        </form>
                                </div>
                        </div>
                        <div className="container-fluid">
                                <div className="row">
                                        <div className="col-8 mx-auto" id='linkmodal'></div>
                                </div>
                        </div>
                </div>
        );
};

export default CreateClassroom;
