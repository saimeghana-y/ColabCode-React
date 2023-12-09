import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { HuddleProvider, HuddleClient } from '@huddle01/react';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';

const CreateClassroom = (props) => {
  const huddleClient = new HuddleClient({
    projectId: "si_qdUBQHh3pqVTm2i-doc1Cr2iFMVGr"
  });

  const key = '18371adc6bf78bca7a20';
  const secret = '6cdace2ed18102d7a10e61dd8945bb519ddc08a95e61a96c223732aec7bec78e';

  const huddleApiKey = 'g9540BSl0aG1U5Q3TKyBSJYWlGPxhxoa';

  const createAndJoinHuddleRoom = async () => {
    try {
      const response = await fetch(
        "https://api.huddle01.com/api/v1/create-room",
        {
          method: "POST",
          body: JSON.stringify({
            title: "Testing",
          }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": huddleApiKey,
          },
        }
      );
      const data = await response.json();

      const userToken = await createAccessToken(data.data.roomId);
      return [data.data.roomId, userToken];
    } catch (error) {
      console.error(error);
    }
  };

  async function createAccessToken(userRoomId) {
    var ap = 'g9540BSl0aG1U5Q3TKyBSJYWlGPxhxoa';
    const accessToken = new AccessToken({
      apiKey: ap,
      roomId: userRoomId,
      role: Role.HOST,
      permissions: {
        admin: true,
        canConsume: true,
        canProduce: true,
        canProduceSources: { cam: true, mic: true, screen: true },
        canRecvData: true,
        canSendData: true,
        canUpdateMetadata: true,
      },
    });
    const userToken = await accessToken.toJwt();
    return userToken;
  }

  const uploadJSONToIPFS = async (JSONBody) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;

    return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function (response) {
        return {
          success: true,
          pinataURL: 'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
        };
      })
      .catch(function (error) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
  };

  const [labname, setLabname] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [language, setLanguage] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    let admincode = Math.random().toString(36).slice(2);
    let roomData = {
      labname: labname,
      password: password,
      createdBy: createdBy,
      adminCode: admincode,
      languageId: language,
    };

    var user = await createAndJoinHuddleRoom();
    console.log('=== user ===', user);
    roomData.roomId = user[0];
    roomData.userToken = user[1];

    const ipfsResponse = await uploadJSONToIPFS(JSON.stringify(roomData));
    const pinataUrl = new URL(ipfsResponse.pinataURL);
    const ipfsHash = pinataUrl.pathname.split('/').pop();
    console.log('=== ipfsHash ===', ipfsHash);

    // Display links at the bottom of the modal
    document.getElementById('linkmodal').innerHTML = `
      <div id="modal-div" class="modal-container py-20">
        <div class="modal-wrapper flex flex-col max-w-3xl mx-auto rounded-lg shadow-lg">
          <div class="px-8 pt-10 pb-4">
            <div class="flex flex-col">
              <h4 class="text-primary-dark">The link to your room is</h4>
              <div class="flex w-full">
                <input type="text" name="link" id="link" class="link w-full link-hover py-2 my-3 border px-4 rounded-pill" readonly="" value="http://localhost:3000/classroom/join/${ipfsHash}">
              </div>
              <button class="btn modal-btn" onclick="copy()">Copy Link</button>
            </div>
            <div class="flex flex-col mt-5 py-4 border-t border-gray-300">
              <h4 class="text-primary-dark">The admin link to manage your room is
              </h4>
              <p class="flex items-center warning  py-1 ">
                <svg viewBox="0 0 20 20" fill="currentColor" class="exclamation h-5 w-5 mr-2">
                  <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
                </svg>Don't share this link with your participants</p>
              <div class="flex w-full">
                <a href="http://localhost:3000/classroom/admin/${ipfsHash}"> <button class="btn modal-btn" >Go to Admin Panel</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
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

      <HuddleProvider key="huddle01-provider" client={huddleClient}>
        {/* <App /> */}
      </HuddleProvider>
    </div>
  );
};

export default CreateClassroom;
