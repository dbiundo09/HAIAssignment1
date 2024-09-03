// Message.jsx
function Message({
    image = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    message = "",
    user = 0
}) {
    const containerClass = user === 1 ? 'flex justify-end items-center' : 'flex justify-start items-center';
    const imageContainerClass = user === 1 ? 'ml-2' : 'mr-2';
    const bubbleClass = user === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black';

    const bubbleStyle = {
        maxWidth: '20vw',
        wordBreak: 'break-word', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };


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
                {message}
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
