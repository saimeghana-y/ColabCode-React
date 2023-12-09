import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { HuddleProvider, HuddleClient } from '@huddle01/react';
import { AccessToken, Role } from '@huddle01/server-sdk/auth';
import { useLocation, useParams } from 'react-router-dom';
import { useRoom } from '@huddle01/react/hooks';

const Adminpanal = async (props) => {
  const params = useParams();
  const roomId = params.roomId;

  console.log('roomId : ', roomId);

  // const { joinRoom } = useRoom({
  //   onJoin: () => {
  //     console.log('Joined room');
  //   }
  // });

  const fetchRoomDataFromIPFSWithRoomId = async (roomId) => {
    const ipfsURL = `https://gateway.pinata.cloud/ipfs/${roomId}`;
    try {
      const response = await axios.get(ipfsURL);
      return response.data;
    } catch (error) {
      console.error('AxiosError:', error);
      console.error('Error Response:', error.response); // This may contain more details
      return null;
    }
  };  

  // Fetch room data from IPFS
  const roomDataString = await fetchRoomDataFromIPFSWithRoomId(roomId);
  console.log('roomDataString : ', roomDataString);

  // Parse roomDataString as JSON
  const room = JSON.parse(Object.keys(roomDataString)[0]);
  console.log('room : ', room);
  // join room 
  // joinRoom({
  //   roomId: "YOUR_ROOM_ID",
  //   token: "YOUR_TOKEN"
  // });

  const huddleClient = new HuddleClient({
    projectId: "si_qdUBQHh3pqVTm2i-doc1Cr2iFMVGr"
  });

  const key = '18371adc6bf78bca7a20';
  const secret = '6cdace2ed18102d7a10e61dd8945bb519ddc08a95e61a96c223732aec7bec78e';

  const huddleApiKey = 'g9540BSl0aG1U5Q3TKyBSJYWlGPxhxoa';

  return (
    <div>

      <HuddleProvider key="huddle01-provider" client={huddleClient}>
        {/* <App /> */}
      </HuddleProvider>
    </div>
  );
};

export default Adminpanal;
