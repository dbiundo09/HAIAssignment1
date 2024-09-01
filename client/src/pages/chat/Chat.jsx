// Chat.jsx
import { useState } from "react";
import TextBar from "../../components/TextBar/TextBar";
import Message from "../../components/Message/Message";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";

function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const generateMessage = (text, user) => {
        const time = new Date();
        const retMessage = <Message message={text} key={time} user={user} />
        return ({
            message: retMessage, timestamp: time, user: user
        })
    }


    const onUpdate = (t) => {
        
        setLoading(true)
        setMessages(prevMessages => [
            ...prevMessages,
            generateMessage(t, 1),
        ]);
        setTimeout(() => { 
            setLoading(false)
            setMessages(prevMessages => [
                ...prevMessages,
                generateMessage("I am a bot, I have no responses yet!", 0),
            ]);
        }, 1000)
    }

    return (
        <div className="flex flex-col h-screen p-4">
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-full max-w-3xl h-full max-h-[600px] overflow-y-auto bg-white shadow-lg rounded-lg p-4">
                    <ScrollableChat messageArray={messages} loading={loading} />
                </div>
                <div className="mt-4">
                    <TextBar onUpdate={onUpdate} />
                </div>
            </div>
        </div>
    )
}

export default Chat;
