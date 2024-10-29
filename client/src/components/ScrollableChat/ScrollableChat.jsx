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

    // Scrolls the chat container to the bottom when new messages are added
    useEffect(() => {
        // Timeout to ensure the scroll occurs after the DOM updates
        const timeoutId = setTimeout(() => {
            endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);

        return () => clearTimeout(timeoutId);
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
