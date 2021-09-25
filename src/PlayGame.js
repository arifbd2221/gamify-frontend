/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import './App.css';
import { useRef, useEffect, createContext, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

export const PlayGame = () => {
    const history = useHistory ();
    const iframeRef = useRef(null);
    const defaultSize = {
      breakpoint: 1022,
      width: window.innerWidth,
      height: window.innerHeight
    };
  
    const WindowSizeContext = createContext(defaultSize);
    const size = useContext(WindowSizeContext);
  
    const handleIframeMessage = useCallback((e) => {
      let iframeData;
      if (typeof e.data === "string"){
        try{
          iframeData = JSON.parse(e.data);
          console.log("iframeData", iframeData);
        }
        catch(e){
          console.log("Invalid JSON string");
        }
      }
  
      if (iframeData?.event_type === "game_over"){
        console.log("game_over", iframeData.score, iframeRef);
        if(localStorage){
            const token = localStorage.getItem("token");
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              }
            axios.post("https://gamee-backend.herokuapp.com/api/v2/leaderboard/score", {
                score: iframeData.score,
                game: "amigoes"
            }, {headers: headers})
            .then(resp => {
                console.log(resp.data);
                history.push("/leaderboard");
            })
            .catch(error => {
                console.log("Score push error", error);
            })
        }
        
      }
  
      if (e.data?.event_type === "GG_GET_GAME_DATA") {
        const { defaultData } = e.data?.payload;
        console.log("GG_GET_GAME_DATA", defaultData);
        // iframeRef.current?.contentWindow &&
        //     iframeRef.current.contentWindow.postMessage(
        //       {
        //         payload: { gameData },
        //         event_type: "GG_SET_GAME_DATA"
        //       },
        //       "*"
        //     );
      }
    }, [history])
  
  
  
  
    useEffect(() => {
      window.addEventListener("message", handleIframeMessage, false);
      return () => {
        window.removeEventListener("message", handleIframeMessage, false);
      };
    }, [handleIframeMessage]);
  
    const focusFrame = useCallback(() => {
      if (
        iframeRef.current &&
        document.activeElement !== iframeRef.current
      ) {
        iframeRef.current.focus();
      }
    }, []);
  
    useEffect(() => {
      document.addEventListener("click", focusFrame, {
        capture: true
      });
  
      return () => {
        document.removeEventListener("click", focusFrame, false);
      };
    }, [focusFrame]);


    return(
    <div className="App">
    <div
    css={pageStyle}
    className="d-flex justify-content-center"
    style={{ width: size.width, height: size.height }}
    >
        <iframe
            id="iframe"
            ref={iframeRef}
            className={`frame-style`}
            title={"Play Game"}
            src={"https://testing-a6960.web.app/"}
            frameBorder="none"
            >
            </iframe>
        
    </div>
    
    </div>
    );
}

const pageStyle = css`
  width: 100vw !important;
  height: 100vh !important;
  background: #000 !important;
  touch-action: none !important;
  -ms-touch-action: none !important;

  .frame-style {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    border: none;
    position: absolute;
    background-color: #000;
    &.mobile {
      position: fixed !important;
      height: 100% !important;
      overflow: hidden !important;
    }
  }
`;
