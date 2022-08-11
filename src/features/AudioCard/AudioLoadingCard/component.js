import { memo } from "react";
import "./style.scss";

export default memo(function AudioLoadingCard() {
    return (
        <div className="audioLoadingCard">
            <div className="audioLoadingCard-name animated-background"/>
            <div className="audioLoadingCard-tools flex-row align-c">
                <div className="audioLoadingCard_left flex-column align-c">
                    <div className="audioLoadingCard-timeline">
                        <div className="animated-background"/>
                    </div>
                    <div className="audioLoadingCard-play flex-row justify-c align-c">
                        <div className="audioLoadingCard-time flex-column align-c">
                            <div className="animated-background"/>
                        </div>
                        <div className="audioLoadingCard-play-button flex-column align-c">
                            <div className="animated-background"/>
                        </div>
                        <div className="audioLoadingCard-time flex-column align-c">
                            <div className="animated-background"/>
                        </div>
                    </div>
                </div>
                <div className="audioLoadingCard_right flex-column align-end">
                    <div className="audioLoadingCard-pluggins ">
                        <div className="animated-background"/>
                        <div className="animated-background"/>
                        <div className="animated-background"/>
                        <div className="animated-background"/>
                        <div className="animated-background"/>
                        <div className="animated-background"/>
                    </div>
                </div>
            </div>
        </div>
    );
}); 
