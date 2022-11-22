import { useState } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { dracula } from '@uiw/codemirror-theme-dracula';

export default function CodeUi(){

    const [codeActivity, setCodeActivity] = useState("");
    const [codeActivityResult, setCodeActivityResult] = useState([]);

    const submitCodeActivity = async () => {
        try{
            await axios
            .post('http://localhost:3000/api/rce/submit', {codeActivity}, {timeout: 5000})
            // .then(({ data }) => {
            //     setCodeActivityResult(data.codeActivityResult);
            // })
        }catch (error){
            alert(error.message)
        }
    };
    
    return (
        <div className="pt-[30px] h-[]">
            <h1 className="text-red-500 font-bold">hello world</h1>
            <div className='absolute top-20 mt-10 bottom-40 w-[70%] left-20 right-20 text-left'>
                <CodeMirror
                    value={codeActivity}
                    placeholder="enter your code here"
                    theme={dracula}
                    height="545px"
                    extensions={[langs.python()]}
                    // options={{            
                    //     keyMap: 'sublime',
                    //     mode: "python",
                    // }}
                    onChange={(value) => {
                        setCodeActivity(value)
                        //console.log(codeActivity)
                    }}
                    className="border border-black p-1"
                />
                <div className='mt-3'>
                    <button
                        onClick={() => submitCodeActivity()} 
                        className='border border-green-700 rounded-md p-2 bg-green-500'
                    >
                    submit
                    </button>
                </div>
            </div>
        </div>
    )
}