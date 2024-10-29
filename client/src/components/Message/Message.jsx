import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function Message({
    image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    message = "",
    user = 0,
    isChart = true 
}) {
    const containerClass = user === 1 ? 'flex justify-end items-center py-2' : 'flex justify-start items-center py-2';
    const imageContainerClass = user === 1 ? 'ml-2' : 'mr-2';
    const bubbleClass = isChart ? '' : (user === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black');


    const bubbleStyle = {
        maxWidth: '30vw',
        wordBreak: 'break-word',
        boxShadow: isChart ? 'none' : '0 4px 8px rgba(0, 0, 0, 0.1)', 
    };
    console.log("Rendering message=", message);
    return (
        <div className={`flex ${containerClass}`}>
            {user === 0 && (
                <div className={`flex-shrink-0 ${imageContainerClass}`}>
                    <div className="w-10 rounded-full overflow-hidden">
                        <img
                            alt="Profile"
                            src={image}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
            <div className={`p-2 ${bubbleClass} rounded-lg`} style={bubbleStyle}>
                {!isChart ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{message}</ReactMarkdown> : message}
            </div>
            {user === 1 && (
                <div className={`flex-shrink-0 ${imageContainerClass}`}>
                    <div className="w-10 rounded-full overflow-hidden">
                        <img
                            alt="Profile"
                            src={image}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Message;
