import { useEffect, useState } from "react";
import TextBar from "../../components/TextBar/TextBar";
import Message from "../../components/Message/Message";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";
import '../../index.css'

function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const addMessage = (t, user = 1, defaultResponse = true, load = true) => {

        const generateMessage = (text, user) => {
            const time = new Date();
            const retMessage = <Message message={text} key={time} user={user} timestamp={time} />
            return ({
                message: retMessage, timestamp: time, user: user
            })
        }

        if (load) {
            setLoading(true)
        }

        setMessages(prevMessages => [
            ...prevMessages,
            generateMessage(t, user),
        ]);

        setTimeout(() => {
            setLoading(false)
            if (defaultResponse) {
                setMessages(prevMessages => [
                    ...prevMessages,
                    generateMessage("I am a bot, I have no responses yet!", 0),
                ]);
            }
        }, 1000)
    }

    useEffect(() => {
        setTimeout(() => { 
            addMessage("Hi! I am your AI Assistant. Go ahead and ask me anything!", 0, false, false);
        }, 1500)
    }, [])


    const onUpdate = (t) => {
        addMessage(t)
    }

    return (
        <div className="flex flex-col h-screen p-4 chat-container">  {/* Apply the animation class */}
            <div className="flex w-full items-center justify-center mb-4">
                <h1 className="text-3xl">AI Assistant</h1>
            </div>
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="w-full max-w-3xl h-full max-h-[600px] overflow-y-auto bg-white shadow-lg rounded-lg p-4">
                    <ScrollableChat messageArray={messages} loading={loading} />
                </div>
                <div className="mt-4">
                    <TextBar disabled={loading} onUpdate={onUpdate} />
                </div>
            </div>
        </div>
    )
}

export default Chat;
