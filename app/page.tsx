"use client";
import { useEffect, useState } from "react";

const OsName = {
    ANDROID: "Android",
    IOS: "iOS",
    IPADOS: "iPadOS",
};

const getOsType = () => {
    const UA = navigator.userAgent;
    switch (true) {
        case /android/i.test(UA):
            return OsName.ANDROID;
        case /iphone/i.test(UA):
            return OsName.IOS;
        case /macintosh/i.test(UA) && navigator.maxTouchPoints > 0:
            return OsName.IPADOS;
        default:
            return UA;
    }
};

export default function Home() {
    const [isModal, setIsModal] = useState(false);
    let installPromptEvent: any;

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", (event) => {
            // Chrome67以前で自動的にプロンプトを表示しないようにする?
            event.preventDefault();
            // イベントを変数に保存する
            installPromptEvent = event;
        });
    }, []);

    const installApp = () => {
        console.log("install!");
        // ホーム画面に追加のダイアログを表示させる
        installPromptEvent.prompt();

        // ダイアログの結果をプロミスで受け取る
        installPromptEvent.userChoice.then((choice: any) => {
            if (choice.outcome === "accepted") {
                console.log("User accepted the A2HS prompt");
            } else {
                console.log("User dismissed the A2HS prompt");
            }
            // Update the install UI to notify the user app can be installed
            installPromptEvent = null;
        });
    };

    const isPwaMode = () => {
        if (window.matchMedia("(display-mode: standalone)").matches) {
            // ここにPWA環境下でのみ実行するコードを記述
            return true;
        }
        return false;
    };

    return (
        <div>
            <p>検証用コンポーネント</p>
            <div>
                <p>OSの取得</p>
                <span>OS: {getOsType()}</span>
            </div>
            <div>
                <p>PWAであるかどうかの取得</p>
                <span>
                    現在PWAモードで
                    {isPwaMode() ? `動作しています` : `動作していません`}
                </span>
            </div>
            {/* {getOsType() === OsName.ANDROID && (
                <button onClick={installApp}>ホームにインストール</button>
            )} */}
            <button onClick={installApp}>ホームにインストール</button>
        </div>
    );
}
