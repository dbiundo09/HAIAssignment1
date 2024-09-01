// Accepts an array of messages in the following format:
// {
// TimeStamp: Timestamp of when message was sent
// Render: JSX object that should be rendered on the screen
// User: 1 or 0, 0 being self, 1 being the other
// }
// ScrollableChat.jsx
import { useEffect, useRef } from "react";
import { sortMessagesByTimestamp } from "../../Utility/Util";

function ScrollableChat(props) {
    const { messageArray, loading } = props;
    const messages = sortMessagesByTimestamp(messageArray);
    const endOfMessagesRef = useRef(null);

    // Scroll to the bottom when messages change
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    return (
        <div className="h-full overflow-y-auto p-2">
            <div className="space-y-2">
                {messages.map((each, index) => (
                    <div
                        key={index}
                        className={`grid ${each.user === 1 ? 'justify-end' : 'justify-start'}`}
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
