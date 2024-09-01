import { useState } from "react";

function TextBar({ onUpdate }) {
    const [inputValue, setInputValue] = useState("");
    
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
        if (event.key === "Enter") {
            updateValue();
        }
    };

    return (
        <div className="flex w-full max-w-xl mx-auto">
            <input
                type="text"
                value={inputValue}
                placeholder="Type here"
                className="input input-bordered flex-1 m-2"
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            <button onClick={updateValue} className="btn btn-outline btn-success m-2">
                Success
            </button>
        </div>
    );
}

export default TextBar;
