import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { langs } from '@uiw/codemirror-extensions-langs';
import { dracula } from '@uiw/codemirror-theme-dracula';

export default function CodeUi(){

    const [codeActivity, setCodeActivity] = useState("");
    
    return (
        <div className="pt-[30px] h-[]">
            <h1 className="text-red-500 font-bold">hello world</h1>
            <div className='absolute border border-blue-700 top-20 mt-10 bottom-40 w-[70%] left-20 right-20 text-left'>
            <CodeMirror
                value={codeActivity}
                placeholder="enter code here"
                theme={dracula}
                height="545px"
                extensions={[langs.python()]}
                options={{            
                    keyMap: 'sublime',
                    mode: "python",
                }}
                onChange={(value) => {
                    setCodeActivity(value)
                    //console.log(codeActivity)
                }}
            />
            </div>
        </div>
    )
}