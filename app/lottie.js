"use client"
import { Component } from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import CodeChange from "../assets/lottie files/code-change.json"

class CodeAnimation extends Component {
    render(){
        return(
            <div className='absolute right-[80px] mt-[40px]'>
                <Player
                    ref={this.player}
                    autoplay={true}
                    loop={true}
                    src={CodeChange}
                    style={{height: '400px', width: '400px'}}
                >
                </Player>
            </div>            
        )
    }
}
export default CodeAnimation