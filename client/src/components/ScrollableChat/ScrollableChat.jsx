// Accepts an array of messages in the following format:
// {
// TimeStamp: Timestamp of when message was sent
// Render: JSX object that should be rendered on the screen
// User: 1 or 0, 0 being self, 1 being the other
// }
// ScrollableChat.jsx
import { useEffect, useRef, useState } from "react";
import { sortMessagesByTimestamp } from "../../Utility/Util";

function ScrollableChat(props) {
    const { messageArray, loading } = props;
    const [animatedMessages, setAnimatedMessages] = useState([]);
    const messages = sortMessagesByTimestamp(messageArray);
    const endOfMessagesRef = useRef(null);

    useEffect(() => {
        setAnimatedMessages(messages);
    }, [messages]);

    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [animatedMessages]);

    return (
        <div className="h-full overflow-y-auto p-2">
            <div className="space-y-2">
                {animatedMessages.map((each, index) => (
                    <div
                        key={index}
                        className={`grid ${each.user === 1 ? 'justify-end' : 'justify-start'} message-enter`}
                    >
                        {each.message}
                    </div>
                ))}
                {loading && (
                    <div>
                        <span className="loading loading-dots loading-xs"></span>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>
        </div>
    );
}

export default ScrollableChat;
