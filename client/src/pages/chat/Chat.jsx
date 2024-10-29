import { useEffect, useState } from "react";
import TextBar from "../../components/TextBar/TextBar";
import Message from "../../components/Message/Message";
import ScrollableChat from "../../components/ScrollableChat/ScrollableChat";
import '../../index.css';
import promptGPT, { getDescription } from "../../Utility/API";
import CSVReader from "../../components/CSVReader/CSVReader";
import { VegaLite } from "react-vega";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currData, setCurrData] = useState();

  const clearMessages = () => {
    setMessages([]);
    addMessage("Hi! I am your AI Assistant. Go ahead and ask me anything!", 0, false, false);
  }

  const addMessage = async (t, user = 1, isChart = false, load = true) => {
    const generateMessage = (text, user, isChart = false) => {
      const time = new Date();
      const retMessage = <Message isChart={isChart} message={text} key={time} user={user} timestamp={time} />;
      return ({
        message: retMessage, timestamp: time, user: user
      });
    }

    if (load) {
      setLoading(true);
    }
    if (isChart) {
      setMessages(prevMessages => [
        ...prevMessages,
        generateMessage(t, user, true),
      ]);
    } else {
      setMessages(prevMessages => [
        ...prevMessages,
        generateMessage(t, user),
      ]);
    }

    setLoading(false);
  }

  const getGPTMessage = async (t, currData) => {
    const generateChart = (spec, user) => {
      if (!spec) { 
        return null;
      }
      const time = new Date();
      const retMessage = <VegaLite spec={spec} />;
      return ({
        message: retMessage, timestamp: time, user: user, st: JSON.stringify(spec)
      });
    }

    try {
      console.log("getting GPT Message");
      var response = await promptGPT(t, currData);
      response = JSON.parse(response);
      if (!response) {
        return null;
      }
      setLoading(false);
      console.log("JSON to Parse:", response.chart);
      const returnDict = { "chart": generateChart(response["chart"], 0), 'analysis': response['analysis'] };
      return returnDict

    } catch (error) {
      console.error("Error in getGPTMessage:", error);
      setLoading(false);
      return "error";
    }
  }

  // Function that is called whenever the user clicks enter / submits a message
  const onUpdate = async (t) => {
    if (currData) {
      addMessage(t);
      setLoading(true); // Show typing indicator while AI is responding

      const newMessage = await getGPTMessage(t, currData);
      if (!newMessage) {
        addMessage("That is not relevant to the dataset. Please ask for a data analysis or visualization task!", 0, false, false);
      } else if (newMessage == "error") {
        addMessage("The AI provided an ill-formed response. Please try again.", 0, false, false);
      }
      else {
        console.log("Chart", newMessage.chart)
        if (newMessage.chart && newMessage.chart.st && newMessage.chart.st !== "[]") {
          addMessage(newMessage.chart.message, 0, true, false);
        }

        addMessage(newMessage['analysis'], 0, false, false);
      }
    } else {
      addMessage(t);
      setTimeout(() => {
        addMessage("Please attach a CSV before asking me any questions!", 0, false, false);
      }, 1000);
    }
  }

  useEffect(() => {
    addMessage("Hi! I am your AI Assistant. Go ahead and ask me anything!", 0, false, false);
  }, []);

  return (
    <div className="flex flex-col h-screen p-4 chat-container">
      <div className="flex w-full items-center justify-center mb-4">
        <h1 className="text-3xl">AI Assistant</h1>
      </div>
      <div className="flex w-full items-center justify-center mb-4">
        <CSVReader callback={setCurrData} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl h-full max-h-[600px] overflow-y-auto bg-white shadow-lg rounded-lg p-4" style={{ height: '70%' }}>
          <ScrollableChat messageArray={messages} loading={loading} />
        </div>
        <TextBar disabled={loading} onUpdate={onUpdate} clearMessages={clearMessages} />
      </div>
    </div>
  );
}

export default Chat;
