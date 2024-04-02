import React, { useState } from 'react';
import axios from 'axios';
import './chatbot.css'


function ChatBotComponent() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('user_response', message);
            const res = await axios.post('http://localhost:8000/chatbot/chatbot/', formData);
            setResponse(res.data.message);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
       
        <div className="chatbot-box">
            <h2 className="chatbot-heading">Chat Bot</h2>
            <div className="input-container">
                <input
                    className="input-field"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here"
                />
                <button className="send-button" onClick={handleSubmit}>Send</button>
            </div>
            <div className="response-container">{response}</div>
        </div>
    );
}


export default ChatBotComponent;
