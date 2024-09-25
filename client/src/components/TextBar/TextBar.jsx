import { useState, useRef, useEffect } from "react";

function TextBar({ onUpdate, disabled }) {
    const [inputValue, setInputValue] = useState("");
    const textareaRef = useRef(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const updateValue = () => {
        
        if (onUpdate) {
            onUpdate(inputValue);
        }
        setInputValue("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault(); // Prevent new lines
            updateValue();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [inputValue]);

    return (
        <div className="flex items-center w-full max-w-xl mx-auto">
            <textarea
                ref={textareaRef}
                value={inputValue}
                placeholder="Type here"
                className={`w-full textarea textarea-bordered m-2 resize-none overflow-hidden ${disabled ? 'bg-gray-200 cursor-not-allowed' : ''}`}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                rows={1}
                disabled={disabled}
            />
            <button
                onClick={updateValue}
                className={`btn btn-outline btn-success m-2 ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''}`}
                disabled={disabled}
            >
                Send
            </button>
        </div>
    );

}

export default TextBar;
